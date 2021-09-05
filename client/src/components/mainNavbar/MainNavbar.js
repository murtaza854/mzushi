import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import {
    Link,
} from "react-router-dom";
import TransparentButton from '../transparentButton/TransparentButton';
import YellowButton from '../yellowButton/YellowButton';
import './MainNavbar.scss';

function MainNavbar(props) {
    return (
        <Navbar className="main-navbar" collapseOnSelect expand="lg" bg="white" variant="white">
            <Container>
                <div className="img-cont">
                    <Link to="/">
                        <img src="/logo_blue.png" alt="mzushi" />
                    </Link>
                </div>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <TransparentButton
                            to="/login"
                            text="Login"
                            classes=""
                        />
                        <div className="margin-global-left-2" />
                        <YellowButton
                            to="/signup"
                            text="Sign Up"
                            classes="text-uppercase width-medium"
                        />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNavbar;