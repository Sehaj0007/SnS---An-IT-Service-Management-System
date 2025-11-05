import React from 'react';
import { Card } from 'react-bootstrap';
import './StaticPage.css'; // Import the new styles

const TermsPage = () => {
    return (
        <div className="static-page-container">
            <Card className="static-page-card">
                <Card.Body>
                    <Card.Title as="h1">Terms and Conditions</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                        Effective date: October 12, 2025
                    </Card.Subtitle>
                    
                    <div className="static-page-content">
                        <h3>1. Agreement to Terms</h3>
                        <p>
                            By accessing or using our services, you agree to be bound by these Terms and Conditions. 
                            If you do not agree to all the terms and conditions of this agreement, then you may not 
                            access the website or use any services. We reserve the right to update, change or replace 
                            any part of these Terms by posting updates and/or changes to our website.
                        </p>

                        <h3>2. Services Provided</h3>
                        <p>
                            System & Solutions provides a range of IT services, including but not limited to hardware repair, 
                            custom PC building, software solutions, and consultancy appointments. All services are provided "as is" 
                            without warranty of any kind, express or implied. We reserve the right to refuse service to anyone 
                            for any reason at any time.
                        </p>

                        <h3>3. Orders and Payments</h3>
                        <p>
                            When you place an order for a custom PC or any other service, you agree to provide current, complete, 
                            and accurate purchase and account information. You agree to promptly update your account and other 
                            information so that we can complete your transactions and contact you as needed. All payments are 
                            considered final and non-refundable except as required by applicable law or as explicitly stated 
                            in a separate service agreement.
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TermsPage;

