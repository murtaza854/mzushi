import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './Business.scss';
import { Details, Poster, SmallGallery, BusinessDynamic } from './components';

function Business(props) {
    return (
        <div>
            <Container>
                <div className="margin-global-top-4" />
                <Row className="justify-content-center">
                    <Poster />
                </Row>
                <div className="margin-global-top-4" />
                <Row>
                    <Details />
                </Row>
                <div className="margin-global-top-4" />
                <Row>
                    <SmallGallery />
                </Row>
                <div className="margin-global-top-4" />
                <Row>
                    <BusinessDynamic />
                </Row>
            </Container>
        </div>
    );
}

export default Business;