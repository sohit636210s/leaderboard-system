import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

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
                <strong>Phone:</strong> +91-6362107408
              </Card.Text>

              <Card.Text className="mb-3">
                <FaEnvelope className="text-primary me-2" />
                <strong>Email:</strong> <a href="mailto:sohit6362@gmail.com">sohit6362@gmail.com</a>
              </Card.Text>

              <Card.Text className="mb-3">
                <FaMapMarkerAlt className="text-danger me-2" />
                <strong>Address:</strong> Baba Chowk, Patna North, Keshari Nagar, Patna 800024
              </Card.Text>

              <hr />
              <p className="text-muted">
                We're available 24/7 for carpenter job inquiries, feedback, or support. Feel free to reach out!
              </p>
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
