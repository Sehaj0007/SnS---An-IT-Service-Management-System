import React from 'react';
import { Container, Card } from 'react-bootstrap';

const TermsPage = () => {
    return (
        <Container className="my-5">
            <Card>
                <Card.Body>
                    <Card.Title as="h2" className="mb-4">Terms and Conditions</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">Effective date: September 12, 2025</Card.Subtitle>

                    <p><strong>1. Agreement to Terms</strong></p>
                    <p>By using our services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the services. We may modify the Terms at any time, in our sole discretion.</p>

                    <p><strong>2. Services</strong></p>
                    <p>SnS Solutions provides IT services, custom PC building, and consultancy appointments. All services are provided "as is" without warranty of any kind. We reserve the right to refuse service to anyone for any reason at any time.</p>

                    <p><strong>3. Orders and Payments</strong></p>
                    <p>When you place an order for a custom PC, you agree to provide current, complete, and accurate purchase and account information. You agree to promptly update your account and other information, including your email address and payment method details, so that we can complete your transactions and contact you as needed. All payments are final and non-refundable except as required by law.</p>

                    {/* <p><em>(Note: This is template text and not legal advice. A real terms and conditions document would need to be much more comprehensive.)</em></p> */}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TermsPage;
