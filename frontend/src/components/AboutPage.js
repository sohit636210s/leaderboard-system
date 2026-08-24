import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaTools, FaUserTie, FaHandshake, FaPhoneAlt, FaStar, FaCheckCircle } from 'react-icons/fa';

function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="p-5 mb-4 bg-primary text-white text-center rounded-3">
        <Container>
          <h1 className="display-4">🪚 हमारे बारे में / About Us</h1>
          <p className="lead">
            पेशेवर कारपेंटर सेवाएं – गुणवत्ता, विश्वसनीयता और ग्राहक संतुष्टि का वादा
          </p>
          <p className="lead">
            Professional Carpentry Services – Committed to Quality, Reliability, and Customer Satisfaction
          </p>
        </Container>
      </div>

      <Container className="mt-5 mb-5">
        {/* Main Content */}
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <Card className="shadow-lg p-4 border-0">
              <Card.Body>
                <h3 className="text-center mb-4 text-primary">हमारी कहानी / Our Story</h3>
                <Row>
                  <Col md={6}>
                    <img src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=400&h=300&fit=crop" alt="Carpenter at Work" className="img-fluid rounded mb-3" />
                    <h5 className="mb-3">🔹 हिंदी में:</h5>
                    <p>
                      मैं एक अनुभवी <strong>कारपेंटर</strong> हूँ जो फर्नीचर से जुड़ा हर छोटा-बड़ा काम सही रेट पर करता हूँ। अगर जरूरत हो तो मैं अपने अनुभव के अनुसार काम को मैनेज करता हूँ ताकि ग्राहक पूरी तरह संतुष्ट हो सके।
                    </p>
                    <p>
                      मैं अपने <strong>मिस्त्री और कारपेंटर</strong> को भेजकर काम करवाता हूँ। आप बस <strong>बुकिंग</strong> करें — मेरी टीम अपने टूल्स के साथ पहुँचने से पहले आपसे संपर्क करेगी और आपकी जरूरत समझेगी। अगर बात पक्की हो जाती है, तो हमारी टीम आपके काम को पूरा करेगी।
                    </p>
                    <p>
                      हमारा उद्देश्य है — <strong>सही रेट, सही टीम, और समय पर काम</strong> देना। ग्राहक और वर्कर दोनों के लिए यह प्लेटफॉर्म भरोसेमंद है।
                    </p>
                  </Col>
                  <Col md={6}>
                    <h5 className="mb-3">🔹 English:</h5>
                    <p>
                      I am a skilled <strong>carpenter</strong> who handles all types of furniture work — from small repairs to large installations — at fair and transparent rates. If needed, I personally manage the job to ensure customer satisfaction.
                    </p>
                    <p>
                      I assign trusted <strong>workers and carpenters</strong> from my team. You just need to <strong>book</strong> — my team will contact you before arriving, understand your requirements, and if everything is confirmed, they will reach your location with tools and complete the work professionally.
                    </p>
                    <p>
                      Our goal is to deliver <strong>quality service, fair pricing, and reliable execution</strong>. This platform is built for both customers and workers to connect with trust.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Mission and Vision */}
        <Row className="mb-5">
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <FaStar size={50} className="text-warning mb-3" />
                <h4>हमारा मिशन / Our Mission</h4>
                <p>
                  ग्राहकों को उच्च गुणवत्ता वाली, समय पर और लागत प्रभावी कारपेंट्री सेवाएं प्रदान करना, जिससे उनके घर और कार्यस्थल अधिक सुंदर और कार्यात्मक बनें।
                </p>
                <p>
                  To provide high-quality, timely, and cost-effective carpentry services to customers, making their homes and workplaces more beautiful and functional.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <FaCheckCircle size={50} className="text-success mb-3" />
                <h4>हमारा विजन / Our Vision</h4>
                <p>
                  भारत में कारपेंट्री सेवाओं का प्रमुख प्लेटफॉर्म बनना, जहाँ ग्राहक और कुशल श्रमिक आसानी से जुड़ सकें और विश्वसनीय सेवाओं का लाभ उठा सकें।
                </p>
                <p>
                  To become India's leading carpentry services platform, where customers and skilled workers can easily connect and benefit from reliable services.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Services Offered */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-center mb-4 text-primary">हमारी सेवाएं / Our Services</h3>
            <Row>
              <Col md={4} className="mb-3">
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" alt="Furniture Repair" className="img-fluid rounded mb-3" />
                    <FaTools size={40} className="text-primary mb-3" />
                    <h5>फर्नीचर रिपेयर / Furniture Repair</h5>
                    <p>टूटे हुए फर्नीचर को मरम्मत करना और उसे नया जैसा बनाना।</p>
                    <p>Repair broken furniture and restore it to like-new condition.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop" alt="Custom Furniture" className="img-fluid rounded mb-3" />
                    <FaUserTie size={40} className="text-primary mb-3" />
                    <h5>कस्टम फर्नीचर / Custom Furniture</h5>
                    <p>आपकी आवश्यकताओं के अनुसार कस्टम फर्नीचर डिजाइन और निर्माण।</p>
                    <p>Design and build custom furniture according to your needs.</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" alt="Installation" className="img-fluid rounded mb-3" />
                    <FaHandshake size={40} className="text-primary mb-3" />
                    <h5>इंस्टॉलेशन / Installation</h5>
                    <p>नए फर्नीचर का पेशेवर तरीके से इंस्टॉलेशन।</p>
                    <p>Professional installation of new furniture.</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Our Work Gallery */}
        <Row className="mb-5">
          <Col>
            <h3 className="text-center mb-4 text-primary">हमारा काम / Our Work</h3>
            <Row className="text-center">
              <Col md={3} className="mb-3">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=250&h=200&fit=crop" alt="Wooden Table" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col md={3} className="mb-3">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=250&h=200&fit=crop" alt="Chair Repair" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col md={3} className="mb-3">
                <img src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=250&h=200&fit=crop" alt="Carpenter Tools" className="img-fluid rounded shadow-sm" />
              </Col>
              <Col md={3} className="mb-3">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=250&h=200&fit=crop" alt="Custom Cabinet" className="img-fluid rounded shadow-sm" />
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row className="text-center mb-5">
          <Col>
            <Card className="bg-light p-4">
              <h4>अभी बुक करें / Book Now</h4>
              <p>हमारी सेवाओं का लाभ उठाने के लिए आज ही संपर्क करें।</p>
              <p>Contact us today to avail our services.</p>
              <Button variant="primary" size="lg">बुकिंग करें / Book Appointment</Button>
            </Card>
          </Col>
        </Row>

        {/* Footer */}
        <footer className="text-center mt-5 text-muted">
          &copy; {new Date().getFullYear()} Carpenter Portal | Built with ❤️ by Sohit Kumar
        </footer>
      </Container>
    </div>
  );
}

export default AboutPage;
