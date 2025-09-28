import React from 'react';
import { Container, Card } from 'react-bootstrap';

const PrivacyPolicyPage = () => {
    return (
        <Container className="my-5">
            <Card>
                <Card.Body>
                    <Card.Title as="h2" className="mb-4">Privacy Policy</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">Last updated: September 12, 2025</Card.Subtitle>
                    
                    <p><strong>1. Introduction</strong></p>
                    <p>Welcome to SnS Solutions. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>

                    <p><strong>2. Information We Collect</strong></p>
                    <p>We collect personal information that you voluntarily provide to us when you register on the website, place an order for a custom PC, or book a consultancy appointment. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect can include the following: Name, Email Address, Phone Number, and Shipping Address.</p>

                    <p><strong>3. How We Use Your Information</strong></p>
                    <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. These purposes include: to facilitate account creation and logon process, to send you marketing and promotional communications, and to fulfill and manage your orders.</p>

                    {/* <p><em>(Note: This is template text and not legal advice. A real privacy policy would need to be much more detailed.)</em></p> */}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PrivacyPolicyPage;
