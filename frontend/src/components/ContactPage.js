import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

function ContactPage() {
  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4">📞 Contact Us</h2>

      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <Card.Text className="mb-3">
                <FaPhoneAlt className="text-success me-2" />
                <strong>Phone:</strong> +91-9852634252
              </Card.Text>

              <Card.Text className="mb-3">
                <FaEnvelope className="text-primary me-2" />
                <strong>Email:</strong> <a href="mailto:sohit6362@gmail.com">sohit6362@gmail.com</a>
              </Card.Text>

              <Card.Text className="mb-3">
                <FaEnvelope className="text-primary me-2" />
                <strong>Alternate Gmail:</strong> <a href="mailto:furniture.kaam.wallah@gmail.com">furniture.kaam.wallah@gmail.com</a>
              </Card.Text>

              <Card.Text className="mb-3">
                <FaMapMarkerAlt className="text-danger me-2" />
                <strong>Address:</strong> Baba Chowk, Patna North, Keshari Nagar, Patna 800024
              </Card.Text>

              <hr />
              <p className="text-muted">
                We're available 24/7 for carpenter job inquiries, feedback, or support. Feel free to reach out!
              </p>

              <div className="d-flex justify-content-center mt-3">
                <a href="https://www.facebook.com/share/1PfNycY3cG/" target="_blank" rel="noopener noreferrer" className="me-3 text-decoration-none">
                  <FaFacebookF size={22} className="text-primary" />
                </a>

                <a href="https://www.instagram.com/furniture_kaam_wallah?igsh=OG9lOGJ1MTgydXlz&igsi=OG9lOGJ1MTgydXlz" target="_blank" rel="noopener noreferrer" className="me-3 text-decoration-none">
                  <FaInstagram size={22} className="text-danger" />
                </a>

                <a href="https://youtube.com/@furniturekaamwallah?si=cpXoac0K9IUvw63R" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <FaYoutube size={22} className="text-danger" />
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <footer className="text-center mt-5 text-muted">
        &copy; {new Date().getFullYear()} Carpenter Portal | Designed by Sohit Kumar
      </footer>
    </Container>
  );
}

export default ContactPage;
