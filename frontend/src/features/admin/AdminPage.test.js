import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import AdminPage from './AdminPage';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  Link: ({ children, ...props }) => require('react').createElement('a', props, children)
}), { virtual: true });

const bookings = [
  {
    _id: 'older-booking',
    customerName: 'Older customer',
    contact: '9876543210',
    address: 'Old address',
    pincode: '800024',
    jobDescription: 'Old work',
    createdAt: '2026-01-01T10:00:00.000Z',
    updatedAt: '2026-01-01T10:00:00.000Z',
    matchedWorker: null
  },
  {
    _id: 'newer-booking',
    customerName: 'Newer customer',
    contact: '9876543211',
    address: 'New address',
    pincode: '800025',
    jobDescription: 'New work',
    createdAt: '2026-02-01T10:00:00.000Z',
    updatedAt: '2026-02-01T10:00:00.000Z',
    matchedWorker: {
      _id: 'worker-id',
      name: 'Assigned carpenter',
      contact: '9876543212',
      city: 'Patna',
      pincode: '800025'
    }
  }
];

describe('Work Booking Admin', () => {
  let originalCreateObjectURL;
  let originalRevokeObjectURL;
  let originalConfirm;
  let originalBlob;
  let downloadedFileName;
  let downloadedCsv;

  const renderAdmin = async () => {
    let result;
    await act(async () => {
      result = render(<AdminPage />);
      await Promise.resolve();
      await Promise.resolve();
    });
    return result;
  };

  beforeEach(() => {
    sessionStorage.setItem('kaamwallah_admin_session', 'true');
    sessionStorage.setItem('kaamwallah_admin_module', 'bookings');
    axios.get.mockImplementation(url => url.includes('/api/products')
      ? Promise.resolve({ data: [{ _id: 'product-1', id: 'product-1', name: 'Bed', price: 100, stock: 1 }] })
      : Promise.resolve({ data: bookings }));
    axios.delete.mockResolvedValue({ data: { message: 'Booking deleted successfully.' } });
    originalCreateObjectURL = URL.createObjectURL;
    originalRevokeObjectURL = URL.revokeObjectURL;
    originalConfirm = window.confirm;
    originalBlob = global.Blob;
    Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: jest.fn(() => 'blob:booking-history') });
    Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: jest.fn() });
    global.Blob = jest.fn((parts, options) => {
      downloadedCsv = parts.join('');
      return new originalBlob(parts, options);
    });
    window.confirm = jest.fn(() => true);
    downloadedFileName = '';
    downloadedCsv = '';
    jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
      downloadedFileName = this.download;
    });
  });

  afterEach(() => {
    sessionStorage.clear();
    window.confirm = originalConfirm;
    global.Blob = originalBlob;
    if (originalCreateObjectURL) {
      Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: originalCreateObjectURL });
    } else {
      delete URL.createObjectURL;
    }
    if (originalRevokeObjectURL) {
      Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: originalRevokeObjectURL });
    } else {
      delete URL.revokeObjectURL;
    }
    HTMLAnchorElement.prototype.click.mockRestore();
    jest.clearAllMocks();
  });

  test('shows newest booking first and deletes the selected database record', async () => {
    await renderAdmin();
    fireEvent.click(screen.getByRole('button', { name: /refresh bookings/i }));

    await screen.findByText('Newer customer');
    const rows = document.querySelectorAll('.admin-history-row');
    expect(rows[0]).toHaveTextContent('Newer customer');
    expect(rows[1]).toHaveTextContent('Older customer');

    fireEvent.click(screen.getByRole('button', { name: 'Delete booking for Newer customer' }));
    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith(expect.stringMatching(/\/api\/bookings\/newer-booking$/)));
    await waitFor(() => expect(screen.queryByText('Newer customer')).not.toBeInTheDocument());
    expect(screen.getByText('Older customer')).toBeInTheDocument();
  });

  test('downloads booking history as a CSV file', async () => {
    await renderAdmin();
    fireEvent.click(screen.getByRole('button', { name: /refresh bookings/i }));
    await screen.findByText('Newer customer');

    fireEvent.click(screen.getByRole('button', { name: /download history/i }));

    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(originalBlob));
    expect(downloadedFileName).toMatch(/^booking-history-\d{4}-\d{2}-\d{2}\.csv$/);
    expect(downloadedCsv).toContain('"Booking ID","Booked At","Last Updated","Customer Name"');
    expect(downloadedCsv).toContain('"Newer customer"');
    expect(downloadedCsv).toContain('"Older customer"');
    expect(downloadedCsv).toContain('"Assigned carpenter"');
  });

  test('keeps booking history actions inside the Work Booking Admin workspace', async () => {
    sessionStorage.setItem('kaamwallah_admin_module', 'shopping');
    await renderAdmin();

    expect(screen.queryByRole('button', { name: /download history/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /delete booking/i })).not.toBeInTheDocument();
  });
});
