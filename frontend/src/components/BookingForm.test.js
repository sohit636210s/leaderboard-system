import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import BookingForm from './BookingForm';
import API_BASE_URL from '../api';

jest.mock('axios', () => ({ post: jest.fn() }));
jest.mock('react-router-dom', () => ({
  Link: ({ children, ...props }) => require('react').createElement('a', props, children),
  useLocation: () => ({ state: null })
}), { virtual: true });

describe('BookingForm current location', () => {
  let originalFetch;
  let originalGeolocation;

  beforeEach(() => {
    originalFetch = global.fetch;
    originalGeolocation = Object.getOwnPropertyDescriptor(navigator, 'geolocation');
    axios.post.mockResolvedValue({
      data: {
        availableWorkers: [{
          _id: 'worker-1',
          name: 'Nearby Carpenter',
          contact: '9876543210',
          city: 'Patna',
          pincode: '800024',
          verified: true
        }]
      }
    });
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: {
        getCurrentPosition: callback => callback({
          coords: { latitude: 25.6, longitude: 85.1 }
        })
      }
    });
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        display_name: 'Baba Chowk, Patna, Bihar, 800024, India',
        address: { postcode: '800024' }
      })
    });
  });

  afterEach(() => {
    if (originalGeolocation) {
      Object.defineProperty(navigator, 'geolocation', originalGeolocation);
    } else {
      delete navigator.geolocation;
    }
    if (originalFetch) {
      global.fetch = originalFetch;
    } else {
      delete global.fetch;
    }
    jest.clearAllMocks();
  });

  test('uses the fetched address and pincode for booking and worker matching', async () => {
    render(<BookingForm />);

    fireEvent.change(screen.getByPlaceholderText('Your full name'), { target: { value: 'Test Customer' } });
    fireEvent.change(screen.getByPlaceholderText('10-digit mobile number'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByPlaceholderText('Wardrobe, kitchen, bedroom, hall or UPVC work'), { target: { value: 'Kitchen work' } });
    const locationInput = screen.getByLabelText('Address and pincode');
    fireEvent.click(locationInput);

    await screen.findByText('Current location detected.');
    expect(locationInput).toHaveValue('Baba Chowk, Patna, Bihar, 800024, India\nPincode: 800024');
    fireEvent.change(locationInput, {
      target: { value: 'Edited street, Patna, Bihar\nPincode: 800025' }
    });

    fireEvent.click(screen.getByRole('button', { name: /submit booking request/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`${API_BASE_URL}/api/bookings/book`, {
        customerName: 'Test Customer',
        contact: '9876543210',
        address: 'Edited street, Patna, Bihar',
        pincode: '800025',
        jobDescription: 'Kitchen work'
      });
    });
    expect(await screen.findByText('Nearby Carpenter')).toBeInTheDocument();
  });
});
