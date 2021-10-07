import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './EmailVerified.scss';

function EmailVerified(props) {
    return (
        <Container className="email-verified">
            <Row className="margin-global-top-2">
                <h1>Email Verified</h1>
                <p>Your email has been successfully verified.</p>
                <p className="text-uppercase">Please click <Link to="/login">here</Link> to login.</p>
            </Row>
        </Container>
    );
}

export default EmailVerified;