import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaTools, FaUserTie, FaHandshake, FaPhoneAlt } from 'react-icons/fa';

function AboutPage() {
  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4">🪚 हमारे बारे में / About Us</h2>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h5 className="mb-3">🔹 हिंदी में जानकारी:</h5>
              <p>
                मैं एक अनुभवी <strong>कारपेंटर</strong> हूँ जो फर्नीचर से जुड़ा हर छोटा-बड़ा काम सही रेट पर करता हूँ। अगर जरूरत हो तो मैं अपने अनुभव के अनुसार काम को मैनेज करता हूँ ताकि ग्राहक पूरी तरह संतुष्ट हो सके।
              </p>
              <p>
                मैं अपने <strong>मिस्त्री और कारपेंटर</strong> को भेजकर काम करवाता हूँ। आप बस <strong>बुकिंग</strong> करें — मेरी टीम अपने टूल्स के साथ पहुँचने से पहले आपसे संपर्क करेगी और आपकी जरूरत समझेगी। अगर बात पक्की हो जाती है, तो हमारी टीम आपके काम को पूरा करेगी।
              </p>
              <p>
                हमारा उद्देश्य है — <strong>सही रेट, सही टीम, और समय पर काम</strong> देना। ग्राहक और वर्कर दोनों के लिए यह प्लेटफॉर्म भरोसेमंद है।
              </p>

              <hr />

              <h5 className="mb-3">🔹 English Overview:</h5>
              <p>
                I am a skilled <strong>carpenter</strong> who handles all types of furniture work — from small repairs to large installations — at fair and transparent rates. If needed, I personally manage the job to ensure customer satisfaction.
              </p>
              <p>
                I assign trusted <strong>workers and carpenters</strong> from my team. You just need to <strong>book</strong> — my team will contact you before arriving, understand your requirements, and if everything is confirmed, they will reach your location with tools and complete the work professionally.
              </p>
              <p>
                Our goal is to deliver <strong>quality service, fair pricing, and reliable execution</strong>. This platform is built for both customers and workers to connect with trust.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5 text-center">
        <Col md={3}>
          <FaTools size={40} className="text-warning mb-2" />
          <h6>Skilled Team</h6>
        </Col>
        <Col md={3}>
          <FaUserTie size={40} className="text-primary mb-2" />
          <h6>Professional Management</h6>
        </Col>
        <Col md={3}>
          <FaHandshake size={40} className="text-success mb-2" />
          <h6>Customer Satisfaction</h6>
        </Col>
        <Col md={3}>
          <FaPhoneAlt size={40} className="text-danger mb-2" />
          <h6>Easy Booking</h6>
        </Col>
      </Row>

      <footer className="text-center mt-5 text-muted">
        &copy; {new Date().getFullYear()} Carpenter Portal | Built with ❤️ by Sohit Kumar
      </footer>
    </Container>
  );
}

export default AboutPage;
