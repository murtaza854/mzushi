import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Col, Row, InputGroup, Button } from 'react-bootstrap';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { onSignIn, responseFacebook } from '../../firebase';
import api from '../../api';
import { DescriptionText, Heading1 } from '../../components';
import UserContext from '../../contexts/userContext';
/* global gapi */

function Login(props) {
    const [email, setEmail] = useState({ name: '', errorText: '', error: false });
    const [password, setPassword] = useState({ name: '', errorText: '', error: false, showPassword: false });
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [disable, setDisable] = useState(false);

    const user = useContext(UserContext);

    const handleClickShowPassword = _ => {
        setPassword(prevState => ({ ...prevState, showPassword: !password.showPassword }));
    }
    const handleMouseDownPassword = event => {
        event.preventDefault();
    }
    const changePassword = event => {
        setPassword(prevState => ({ ...prevState, name: event.target.value }));
    }

    const changeEmail = event => {
        setEmail(prevState => ({ ...prevState, name: event.target.value }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setDisable(true);
        try {
            const response = await fetch(`${api}/startup/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({ email, password, provider: 'email-password' }),
            });
            const content = await response.json();
            if (content.data) {
                const response1 = await fetch(`${api}/logged-in`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    withCredentials: true,
                });
                const content1 = await response1.json();
                const { displayName, email, emailVerified, accountSetup, admin, provider } = content1.data;
                if (!emailVerified) {
                    history.push("/__/auth/action?mode=emailNotVerified");
                } else {
                    user.setUserState({ displayName, email, emailVerified, accountSetup, admin, provider });
                    if (accountSetup) history.push("/");
                }
            } else {
                setEmail(prevState => ({ ...prevState, name: '', errorText: 'Invalid Credentials!', error: true }));
                setPassword(prevState => ({ ...prevState, name: '', errorText: 'Invalid Credentials!', error: true, showPassword: false }));
                setDisable(false);
            }
            // if (userLoggedin === null) {
            //     setEmail(prevState => ({ ...prevState, name: '', errorText: 'Invalid Credentials!', error: true }));
            //     setPassword(prevState => ({ ...prevState, name: '', errorText: 'Invalid Credentials!', error: true, showPassword: false }));
            // } else {
            //     user.setUserState(userLoggedin);
            // }
        } catch (error) {
            setDisable(false);
        }
    }

    useEffect(() => {
        if (user.userState) {
            if (user.userState.accountSetup) history.push('/');
            else history.push('/packages');
        }
    }, [history, user.userState]);

    useEffect(() => {
        gapi.signin2.render('g-signin2', {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            //   'width': 200,
            //   'height': 50,
            'longtitle': true,
            'border-radius': 15,
            'theme': 'dark',
            'onsuccess': googleuser => onSignIn(googleuser, user),
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <div className="margin-global-top-5" />
            <Row>
                <Col>
                    <Heading1
                        text="Welcome Back"
                        classes="text-center"
                    />
                </Col>
            </Row>
            <Row>
                <Form onSubmit={handleSubmit} className="form-style margin-global-top-2">
                    <input
                        type="password"
                        autoComplete="on"
                        value=""
                        style={{ display: 'none' }}
                        readOnly={true}
                    />
                    <Row className="justify-content-center">
                        <Form.Group as={Col} md={6} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={changeEmail}
                                value={email.name}
                            />
                            <div className="error-text">{email.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-center">
                        <Form.Group as={Col} md={6} controlId="password">
                            <Form.Label>Password</Form.Label>
                            <InputGroup size="lg">
                                <Form.Control
                                    type={password.showPassword ? 'text' : 'password'}
                                    onChange={changePassword}
                                    value={password.name}
                                />
                                <InputGroup.Text>
                                    {
                                        password.showPassword ? (
                                            <IoMdEye
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                className="icon" />
                                        ) : (
                                            <IoMdEyeOff
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                className="icon" />
                                        )
                                    }
                                </InputGroup.Text>
                            </InputGroup>
                            <div className="error-text">{password.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-center">
                        <Button disabled={disable} type="submit">
                            Login
                        </Button>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row>
                        <Col>
                            <DescriptionText
                                text="Not a Registered Customer? Sign Up"
                                link="HERE"
                                to="/signup"
                                classes="text-center"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DescriptionText
                                text="Forgot Password? Click"
                                link="HERE"
                                to="/forgot-password"
                                classes="text-center"
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <div id="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                        <div className="margin-global-top-1 unhide-768" />
                        <div className="facebook-button-container">
                            <button className="login-with-fb-btn connect-fb" onClick={e => responseFacebook(user)}>
                                <i className="fa fa-facebook mr-1"></i>
                                <span>Sign in with Facebook</span>
                            </button>
                        </div>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row>
                        <Col>
                            <DescriptionText
                                text="Please click"
                                link="HERE"
                                to="/terms-conditions"
                                text1="to read our terms and conditions for having an account with us."
                                classes="text-center margin-bottom-0"
                            />
                        </Col>
                    </Row>
                    <div className="margin-global-top-1" />
                    <Row>
                        <Col>
                            <DescriptionText
                                text="Please click"
                                link="HERE"
                                to="/privacy-policy"
                                text1="to read our privacy policy."
                                classes="text-center"
                            />
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
}

export default Login;