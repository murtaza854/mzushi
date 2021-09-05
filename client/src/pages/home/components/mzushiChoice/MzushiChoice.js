import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BusinessCard, Heading2, YellowButton } from '../../../../components';

function MzushiChoice(props) {
    return (
        <Container fluid>
            <Container>
                <Heading2
                    text=""
                    blue="mzushi's"
                    classes="text-center"
                    text2="Choice"
                />
                <div className="margin-global-top-2" />
                <Row>
                    <Col>
                        <YellowButton
                            to="/"
                            text="Karachi"
                            classes="text-uppercase width-high horizontal-center-relative"
                        />
                    </Col>
                    <Col>
                        <YellowButton
                            to="/"
                            text="Lahore"
                            classes="text-uppercase width-high horizontal-center-relative"
                        />
                    </Col>
                    <Col>
                        <YellowButton
                            to="/"
                            text="Islamabad"
                            classes="text-uppercase width-high horizontal-center-relative"
                        />
                    </Col>
                    <Col>
                        <YellowButton
                            to="/"
                            text="Quetta"
                            classes="text-uppercase width-high horizontal-center-relative"
                        />
                    </Col>
                    <Col>
                        <YellowButton
                            to="/"
                            text="Peshawer"
                            classes="text-uppercase width-high horizontal-center-relative"
                        />
                    </Col>
                </Row>
            </Container>
            <div className="margin-global-top-4" />
            <Row className="justify-content-center">
                <BusinessCard classes="" />
                <BusinessCard classes="" />
                <BusinessCard classes="" />
                <BusinessCard classes="" />
            </Row>
            <div className="margin-global-top-4" />
            <Row>
                <YellowButton
                    to="/"
                    text="Show More"
                    classes="text-uppercase width-full horizontal-center-relative"
                />
            </Row>
        </Container>
    );
}

export default MzushiChoice;