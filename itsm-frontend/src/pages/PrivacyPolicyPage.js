import React from 'react';
import { Card } from 'react-bootstrap';
import './StaticPage.css'; // Import the new styles

const PrivacyPolicyPage = () => {
    return (
        <div className="static-page-container">
            <Card className="static-page-card">
                <Card.Body>
                    <Card.Title as="h1">Privacy Policy</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                        Last updated: October 12, 2025
                    </Card.Subtitle>
                    
                    <div className="static-page-content">
                        <h3>1. Introduction</h3>
                        <p>
                            Welcome to System & Solutions. We are committed to protecting your personal information and your 
                            right to privacy. If you have any questions or concerns about our policy, or our practices with 
                            regards to your personal information, please contact us.
                        </p>

                        <h3>2. Information We Collect</h3>
                        <p>
                            We collect personal information that you voluntarily provide to us when you register on the website, 
                            place an order for a custom PC, or book a consultancy appointment. The personal information we collect 
                            can include the following: Full Name, Email Address, Phone Number, and Shipping Address for order fulfillment.
                        </p>

                        <h3>3. How We Use Your Information</h3>
                        <p>
                            We use personal information collected via our website for a variety of business purposes described below. 
                            We process your personal information for these purposes in reliance on our legitimate business interests, 
                            in order to enter into or perform a contract with you, with your consent, and/or for compliance with 
                            our legal obligations. These purposes include: facilitating account creation and logon process, sending 
                            you marketing and promotional communications, and to fulfill and manage your orders.
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PrivacyPolicyPage;

