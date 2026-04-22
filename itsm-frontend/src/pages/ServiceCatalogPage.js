import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, ListGroup, Button, Modal, Form, ProgressBar } from 'react-bootstrap';

const ServiceCatalogPage = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);

  const questions = [
    {
      id: 'problemType',
      question: 'What type of problem are you facing?',
      options: ['Hardware', 'Software', 'Networking', 'Security', 'OS']
    },
    {
      id: 'urgency',
      question: 'How urgent is this issue?',
      options: ['Emergency (Same day)', 'High (1-2 days)', 'Medium (3-5 days)', 'Low (1 week+)']
    },
    {
      id: 'complexity',
      question: 'What\'s the complexity level of the issue?',
      options: ['Simple (Basic troubleshooting)', 'Moderate (Configuration/setup)', 'Complex (Advanced repair/development)']
    },
    {
      id: 'details',
      question: 'Please provide any additional details about your issue:',
      type: 'textarea'
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateRecommendation();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRecommendation = () => {
    const { problemType, urgency, complexity } = answers;
    
    // Find the service
    const service = services.find(s => s.name === problemType);
    
    // Determine tier based on urgency and complexity
    let tierIndex = 0;
    if (urgency.includes('Emergency') || complexity.includes('Complex')) {
      tierIndex = 2; // Premium
    } else if (urgency.includes('High') || complexity.includes('Moderate')) {
      tierIndex = 1; // Standard
    }
    
    const recommendedTier = service.tiers[tierIndex];
    
    setRecommendation({
      service: service.name,
      tier: recommendedTier,
      details: answers.details || 'No additional details provided'
    });
  };

  const resetWizard = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
    setShowWizard(false);
  };
  const services = [
    {
      name: 'Software',
      tiers: [
        { name: 'Basic', price: '$50', turnaround: '1-2 days' },
        { name: 'Standard', price: '$100', turnaround: '3-5 days' },
        { name: 'Premium', price: '$200', turnaround: '1 week' }
      ],
      faqs: [
        { q: 'What software services do you offer?', a: 'We offer installation, configuration, and troubleshooting for various software applications.' },
        { q: 'Do you provide custom software development?', a: 'Yes, we offer custom software development services.' }
      ]
    },
    {
      name: 'Hardware',
      tiers: [
        { name: 'Basic', price: '$75', turnaround: '1-3 days' },
        { name: 'Standard', price: '$150', turnaround: '3-7 days' },
        { name: 'Premium', price: '$300', turnaround: '1-2 weeks' }
      ],
      faqs: [
        { q: 'What hardware repairs do you handle?', a: 'We repair desktops, laptops, printers, and other peripherals.' },
        { q: 'Do you sell hardware components?', a: 'Yes, we provide hardware sales and recommendations.' }
      ]
    },
    {
      name: 'Networking',
      tiers: [
        { name: 'Basic', price: '$60', turnaround: '1-2 days' },
        { name: 'Standard', price: '$120', turnaround: '2-4 days' },
        { name: 'Premium', price: '$250', turnaround: '1 week' }
      ],
      faqs: [
        { q: 'What networking services do you provide?', a: 'We offer network setup, troubleshooting, and security enhancements.' },
        { q: 'Do you support wireless networking?', a: 'Yes, we handle Wi-Fi setup and optimization.' }
      ]
    },
    {
      name: 'Security',
      tiers: [
        { name: 'Basic', price: '$80', turnaround: '2-3 days' },
        { name: 'Standard', price: '$160', turnaround: '4-6 days' },
        { name: 'Premium', price: '$320', turnaround: '1-2 weeks' }
      ],
      faqs: [
        { q: 'What security services are available?', a: 'We provide antivirus installation, firewall setup, and security audits.' },
        { q: 'Do you offer data recovery services?', a: 'Yes, we specialize in data recovery from various devices.' }
      ]
    },
    {
      name: 'OS',
      tiers: [
        { name: 'Basic', price: '$40', turnaround: '1 day' },
        { name: 'Standard', price: '$80', turnaround: '2-3 days' },
        { name: 'Premium', price: '$160', turnaround: '3-5 days' }
      ],
      faqs: [
        { q: 'Which operating systems do you support?', a: 'We support Windows, macOS, and Linux installations and upgrades.' },
        { q: 'Do you provide OS migration services?', a: 'Yes, we assist with migrating from one OS to another.' }
      ]
    }
  ];

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Service Catalog</h1>
          <p className="text-center">Explore our range of IT services with detailed pricing, turnaround times, and FAQs.</p>
          <div className="text-center mb-4">
            <Button variant="primary" size="lg" onClick={() => setShowWizard(true)}>
              What problem are you facing? Get a Quote
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        {services.map((service, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card>
              <Card.Header>
                <h5>{service.name}</h5>
              </Card.Header>
              <Card.Body>
                <h6>Pricing Tiers:</h6>
                <ListGroup variant="flush">
                  {service.tiers.map((tier, idx) => (
                    <ListGroup.Item key={idx}>
                      <strong>{tier.name}:</strong> {tier.price} - Turnaround: {tier.turnaround}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>FAQs</Accordion.Header>
                    <Accordion.Body>
                      {service.faqs.map((faq, idx) => (
                        <div key={idx} className="mb-3">
                          <strong>Q: {faq.q}</strong>
                          <p>A: {faq.a}</p>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Service Recommendation Wizard Modal */}
      <Modal show={showWizard} onHide={resetWizard} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Service Recommendation Wizard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!recommendation ? (
            <>
              <ProgressBar now={(currentStep + 1) / questions.length * 100} className="mb-4" />
              <h5 className="mb-4">{questions[currentStep].question}</h5>
              {questions[currentStep].type === 'textarea' ? (
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Describe your issue..."
                  value={answers[questions[currentStep].id] || ''}
                  onChange={(e) => handleAnswer(questions[currentStep].id, e.target.value)}
                />
              ) : (
                <div>
                  {questions[currentStep].options.map((option, index) => (
                    <Form.Check
                      key={index}
                      type="radio"
                      name={questions[currentStep].id}
                      label={option}
                      checked={answers[questions[currentStep].id] === option}
                      onChange={() => handleAnswer(questions[currentStep].id, option)}
                      className="mb-2"
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <h4 className="mb-4">Recommended Service</h4>
              <Card className="mb-4">
                <Card.Body>
                  <h5>{recommendation.service} - {recommendation.tier.name} Tier</h5>
                  <p><strong>Price:</strong> {recommendation.tier.price}</p>
                  <p><strong>Turnaround:</strong> {recommendation.tier.turnaround}</p>
                  <p><strong>Details:</strong> {recommendation.details}</p>
                </Card.Body>
              </Card>
              <p>This is an approximate quote based on your responses. Contact us for a detailed assessment.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!recommendation ? (
            <>
              <Button variant="secondary" onClick={prevStep} disabled={currentStep === 0}>
                Previous
              </Button>
              <Button 
                variant="primary" 
                onClick={nextStep}
                disabled={!answers[questions[currentStep].id]}
              >
                {currentStep === questions.length - 1 ? 'Get Recommendation' : 'Next'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={resetWizard}>
                Start Over
              </Button>
              <Button variant="success" onClick={resetWizard}>
                Contact Us
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ServiceCatalogPage;