import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FiCheck } from 'react-icons/fi'
import { useHistory } from 'react-router';
// import api from '../../api';
import { Heading1 } from '../../components';
import UserContext from '../../contexts/userContext';
import './Premium.scss';

function Premium(props) {
    const user = useContext(UserContext);
    const history = useHistory();
    const [check, setCheck] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (user.userState) {
            if (user.userState.accountSetup) history.push('/');
        } else history.push('/login');
    }, [history, user.userState]);
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

    const changeCheck = _ => {
        setCheck(!check);
    }

    const onSubmit = async e => {
        e.preventDefault();
        setCheck(true);
        try {
            // const response = await fetch(`${api}/startup/mark-premium`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     credentials: 'include',
            //     withCredentials: true,
            //     body: JSON.stringify({ user: user.userState, mark: true })
            // });
            // const content = await response.json();
            history.push('/setup');
        } catch (error) {
            alert("Error confirming premium. Please contact support if issue persists.");
            setCheck(false);
        }
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
            <div className="feature-list margin-global-top-1">
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
                    <Form style={{ padding: 0 }} onSubmit={onSubmit} className="form-style margin-global-top-1">
                        <Row>
                            <Col>
                                <Form.Check
                                    type='checkbox'
                                    id="service"
                                    label="Click here to acknowledge that the images you upload may be edited and used for marketing purposes."
                                    checked={check}
                                    // onClick={changeCheck}
                                    onChange={changeCheck}
                                />
                            </Col>
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