import React, { useContext, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { FiCheck } from 'react-icons/fi'
import { useHistory } from 'react-router';
import { Heading2 } from '../../../components';
import UserContext from '../../../contexts/userContext';
import './DashboardPremium.scss';

function DashboardPremium(props) {
    const user = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (user.userState) {
            // if (user.userState.accountSetup) history.push('/');
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

    return (
        <Container className="dashboard-premium dashboard-about box-shadow-dashboard gallery">
            <Row>
                <Col>
                    <Heading2
                        text="Premium"
                        classes="text-left"
                    />
                </Col>
            </Row>
            <Row>
                    <Form.Label className="bold-600">Status: <FiCheck className="status-icon" /></Form.Label>
                    {/* <p className="content-read">s</p> */}
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
        </Container>
    );
}

export default DashboardPremium;