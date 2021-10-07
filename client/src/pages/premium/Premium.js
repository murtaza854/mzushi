import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FiCheck } from 'react-icons/fi'
import { Heading1 } from '../../components';
import './Premium.scss';

function Premium(props) {
    const features = [
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
    ];
    return (
        <Container className="premium">
            <div className="margin-global-top-5" />
            <Row>
                <Col>
                    <Heading1
                        text="Premium Account"
                        classes="text-center"
                    />
                </Col>
            </Row>
                <div className="feature-list">
                    {
                        features.map((value, index) => {
                            return (
                                <Row className="Justify-content-between icon-text" key={index}>
                                    <Col xs={10}><p>{value.text}</p></Col>
                                    <Col className="icon-cont" xs={2}>{value.icon}</Col>
                                </Row>
                            )
                        })
                    }
                </div>
        </Container>
    );
}

export default Premium;