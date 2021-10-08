import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
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
    const [check, setCheck] = useState(false);

    const changeCheck = _ => {
        setCheck(!check);
    }

    const onSubmit = event => {
        event.preventDefault();
    }

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
            <Row>
                <Col>
                    <Form onSubmit={onSubmit} className="form-style margin-global-top-1">
                        <Row>
                            <Form.Check
                                className="center-relative-vertical"
                                type='checkbox'
                                id="service"
                                label="Click here to acknowledge that the images you upload may be edited and used for marketing purposes."
                                checked={check}
                                onClick={changeCheck}
                            />
                        </Row>
                        <Row className="justify-content-center margin-global-top-2">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="admin-login-button"
                                disabled={!check}
                            >
                                Confirm
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Premium;