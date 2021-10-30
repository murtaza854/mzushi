import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import api from '../../../api';
import { DescriptionText, Heading2, YellowButton } from '../../../components';
import './DashboardHome.scss';

function DashboardHome(props) {

    const logout = async (e, id) => {
        e.preventDefault();
        try {
            await fetch(`${api}/startup/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // history.push('/');
        } catch (error) {
            alert("Error logging out. Please contact support.")
        }
    }

    return (
        <Container style={{ boxShadow: 'none' }} className="dashboard-about box-shadow-dashboard" fluid>
            <Row>
                <Col>
                    <Heading2
                        text={`Hello ${props.ownerFirstName}!`}
                        classes="text-left"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DescriptionText
                        text={`We hope your business, ${props.startupName} is booming today!`}
                        link=""
                        to="/"
                        classes="text-left"
                    />
                </Col>
            </Row>
            <Row className="margin-global-top-2">
                <YellowButton
                    to="/"
                    text="Sign Out"
                    classes="text-uppercase width-high horizontal-center-relative"
                    onClick={logout}
                    id=""
                />
            </Row>
        </Container>
    );
}

export default DashboardHome;