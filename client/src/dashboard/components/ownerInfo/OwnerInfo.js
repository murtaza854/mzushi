import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import api from '../../../api';
import { DescriptionText, Heading2 } from '../../../components';
import UserContext from '../../../contexts/userContext';
import './OwnerInfo.scss';

function OwnerInfo(props) {
    const user = useContext(UserContext);

    const [firstName, setFirstName] = useState({ name: props.ownerFirstName, errorText: '', error: false });
    const [lastName, setLastName] = useState({ name: props.ownerLastName, errorText: '', error: false });
    const [contactNumber, setContactNumber] = useState({ name: props.contactNumber, errorText: '', error: false });

    const [disable, setDisable] = useState(false);

    const [message, setMessage] = useState({ display: false, text: '' });
    const [edit, setEdit] = useState(false);

    const changeFirstName = event => {
        if (event.target.value === '') setFirstName({ name: event.target.value, errorText: 'First name is required!', error: true });
        else setFirstName({ name: event.target.value, errorText: '', error: false });
    }
    const changeLastName = event => {
        if (event.target.value === '') setLastName({ name: event.target.value, errorText: 'Last name is required!', error: true });
        else setLastName({ name: event.target.value, errorText: '', error: false });
    }
    const changeContactNumber = event => {
        const phoneno = /^\(?92 ([0-9]{3})\)?[ ]?([0-9]{7})$/;
        if (event.target.value === '') setContactNumber({ name: event.target.value, errorText: 'Contact number is required!', error: true });
        else if (!event.target.value.match(phoneno)) setContactNumber({ name: event.target.value, errorText: "Correct format for contact number is '92 XXX XXXXXXX'!", error: true });
        else setContactNumber({ name: event.target.value, errorText: '', error: false });
    }

    const onSubmit = async e => {
        e.preventDefault();
        setDisable(true);
        try {
            const response = await fetch(`${api}/startup/change-owner-info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
                body: JSON.stringify({ firstName: firstName.name, lastName: lastName.name, contactNumber: contactNumber.name }),
                credentials: 'include',
                withCredentials: true,
            });
            const content = await response.json();
            if (content.check) {
                const { displayName, email, emailVerified, accountSetup, admin } = content.data;
                user.setUserState({ displayName, email, emailVerified, accountSetup, admin });
                setEdit(false);
                setMessage({ display: true, text: 'Owner information changed successfully.' })
                setTimeout(() => {
                    setMessage({ display: false, text: '' });
                }, 5000);
            } else throw new Error("Error");
        } catch (error) {
            setMessage({ display: true, text: 'Error editing owner information. Please try again later.' })
            setTimeout(() => {
                setMessage({ display: false, text: '' });
            }, 5000);
        }
    };

    const startCancelEdit = e => {
        e.preventDefault();
        setEdit(!edit);
    }

    useEffect(() => {
        let flag = true;
        if (firstName.error === true) flag = true;
        else if (firstName.name.length === 0) flag = true;
        else if (lastName.error === true) flag = true;
        else if (lastName.name.length === 0) flag = true;
        else if (contactNumber.error === true) flag = true;
        else if (contactNumber.name.length === 0) flag = true;
        else flag = false;
        setDisable(flag);
    }, [firstName, lastName, contactNumber]);

    return (
        <Container className="dashboard-about box-shadow-dashboard" fluid>
            <Row>
                <Col>
                    <Heading2
                        text="Owner Information"
                        classes="text-left"
                    />
                </Col>
            </Row>
            {
                edit ? (
                    <Row>
                        <Form onSubmit={onSubmit} className="form-style margin-global-top-1">
                            <Row className="justify-content-between">
                                <Form.Group as={Col} md={6} controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={changeFirstName}
                                        onBlur={changeFirstName}
                                        value={firstName.name}
                                    />
                                    <div className="error-text">{firstName.errorText}</div>
                                </Form.Group>
                                <Form.Group as={Col} md={6} controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={changeLastName}
                                        onBlur={changeLastName}
                                        value={lastName.name}
                                    />
                                    <div className="error-text">{lastName.errorText}</div>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-2" />
                            <Row className="justify-content-between">
                                <Form.Group as={Col} md={6} controlId="contactNumber">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={changeContactNumber}
                                        onBlur={changeContactNumber}
                                        value={contactNumber.name}
                                    />
                                    <div className="error-text">{contactNumber.errorText}</div>
                                </Form.Group>
                            </Row>
                            <div className="margin-global-top-1" />
                            <Row className="justify-content-center">
                                <Button disabled={disable} type="submit">
                                    Submit
                                </Button>
                                <Button onClick={startCancelEdit} type="text">
                                    Cancel
                                </Button>
                            </Row>
                        </Form>
                    </Row>
                ) : (
                    <>
                        <Row>
                            <Form.Group as={Col} md={6}>
                                <Form.Label className="bold-600">First Name</Form.Label>
                                <p className="content-read">{props.ownerFirstName}</p>
                            </Form.Group>
                            <Form.Group as={Col} md={6}>
                                <Form.Label className="bold-600">Last Name</Form.Label>
                                <p className="content-read">{props.ownerLastName}</p>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md={6}>
                                <Form.Label className="bold-600">Contact Number</Form.Label>
                                <p className="content-read">+{props.contactNumber}</p>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form onSubmit={startCancelEdit} className="form-style margin-global-top-1">
                                <Row className="justify-content-center">
                                    <Button type="text">
                                        Edit
                                    </Button>
                                </Row>
                                {
                                    message.display ? (
                                        <Row className="margin-global-top-1">
                                            <Col>
                                                <DescriptionText
                                                    text={message.text}
                                                    link=""
                                                    to="/"
                                                    classes="text-center"
                                                />
                                            </Col>
                                        </Row>
                                    ) : null
                                }
                            </Form>
                        </Row>
                    </>
                )
            }
        </Container>
    );
}

export default OwnerInfo;