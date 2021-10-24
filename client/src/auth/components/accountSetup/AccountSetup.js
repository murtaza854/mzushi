import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AccountSetup.scss';

function AccountSetup(props) {
    return (
        <Container className="account-setup">
            <Row className="margin-global-top-2">
                <h1>Account Setup</h1>
                <p>Your account has been setup Successfully!</p>
                <p className="text-uppercase">Please click <Link to="/">here</Link> to go to your dashboard.</p>
            </Row>
        </Container>
    );
}

export default AccountSetup;