import { FormControl, InputLabel, Typography, Input, FormHelperText, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import api from '../../../../api';

function checkIfObjExistsByEmail(rows, email, id) {
    return rows.find(o => o.email.toLowerCase() === email.toLowerCase());
}

function AdminUserForm(props) {
    const {
        rows,
    } = props;

    const [firstName, setFirstName] = useState({ value: '', error: false, helperText: 'Enter a first name Ex. John' });
    const [lastName, setLastName] = useState({ value: '', error: false, helperText: 'Enter a last name Ex. Smith' });
    const [email, setEmail] = useState({ value: '', error: false, helperText: 'Enter a valid email address Ex. john.smith@mzushi.com' });

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        let flag = true;
        if (firstName.error === true) flag = true;
        else if (firstName.value.length === 0) flag = true;
        else if (lastName.error === true) flag = true;
        else if (lastName.value.length === 0) flag = true;
        else if (email.error === true) flag = true;
        else if (email.value.length === 0) flag = true;
        else flag = false;
        setDisabled(flag);
    }, [firstName, lastName, email]);

    const handleFirstNameChange = (event) => {
        if (event.target.value.length === 0) {
            setFirstName({ value: event.target.value, error: true, helperText: 'First name is required!' });
        } else {
            setFirstName({ value: event.target.value, error: false, helperText: 'Enter a first name Ex. John' });
        }
    }

    const handleLastNameChange = (event) => {
        if (event.target.value.length === 0) {
            setLastName({ value: event.target.value, error: true, helperText: 'Last name is required!' });
        } else {
            setLastName({ value: event.target.value, error: false, helperText: 'Enter a last name Ex. Smith' });
        }
    }

    const handleEmailChange = (event) => {
        if (event.target.value.length === 0) {
            setEmail({ value: event.target.value, error: true, helperText: 'Email is required!' });
        } else if (checkIfObjExistsByEmail(rows, event.target.value)) {
            setEmail({ value: event.target.value, error: true, helperText: 'Email already exists!' });
        } else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
            setEmail({ value: event.target.value, error: false, helperText: 'Enter a valid email address Ex. john.smith@mzushi.com' });
        } else {
            setEmail({ value: event.target.value, error: true, helperText: 'Enter a valid email address Ex. john.smith@mzushi.com' });
        }
    }

    const handleSubmitAdd = async event => {
        event.preventDefault();
        const response = await fetch(`${api}/admin-user/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
            }),
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/admin-user';
        } else {
            alert("Something went wrong.");
        }
    }

    let onSubmit = handleSubmitAdd;

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Admin User
                    </Typography>
                </Col>
            </Row>
            <Form onSubmit={onSubmit}>
                <input
                    type="password"
                    autoComplete="on"
                    value=""
                    style={{ display: 'none' }}
                    readOnly={true}
                />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={firstName.error} htmlFor="firstName">First Name</InputLabel>
                            <Input id="firstName"
                                value={firstName.value}
                                onChange={handleFirstNameChange}
                                onBlur={handleFirstNameChange}
                                error={firstName.error}
                            />
                            <FormHelperText error={firstName.error}>{firstName.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={lastName.error} htmlFor="lastName">Last Name</InputLabel>
                            <Input id="lastName"
                                value={lastName.value}
                                onChange={handleLastNameChange}
                                onBlur={handleLastNameChange}
                                error={lastName.error}
                            />
                            <FormHelperText error={lastName.error}>{lastName.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={email.error} htmlFor="email">Email</InputLabel>
                            <Input id="email"
                                value={email.value}
                                onChange={handleEmailChange}
                                onBlur={handleEmailChange}
                                error={email.error}
                            />
                            <FormHelperText error={email.error}>{email.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col className="flex-display">
                        <Button disabled={disabled} type="submit" variant="contained" color="secondary">
                            Save
                        </Button>
                        <div className="margin-global-05" />
                        <Button disabled={disabled} type="button" variant="contained" color="secondary">
                            Save and Add Another
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default AdminUserForm;