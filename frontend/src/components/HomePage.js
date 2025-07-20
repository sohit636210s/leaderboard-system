import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HomePage.css'; // Custom CSS for background image

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section text-white d-flex align-items-center">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-5 fw-bold">Welcome to Carpenter Portal 🪚</h1>
              <p className="lead mt-3">
                Furniture ka har chhota-bada kaam — sahi rate, sahi team, aur time par delivery.  
                Book kariye aur humari team apke ghar tak tools ke saath pahunchti hai!
              </p>
              <Button variant="success" href="/booking" className="mt-3">Book Now</Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3">
        &copy; {new Date().getFullYear()} Carpenter Portal | Designed by Sohit Kumar
      </footer>
    </>
  );
}

export default HomePage;
