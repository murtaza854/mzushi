import React, { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import {
    Link,
} from "react-router-dom";
import UserContext from '../../contexts/userContext';
import TransparentButton from '../transparentButton/TransparentButton';
import YellowButton from '../yellowButton/YellowButton';
import './MainNavbar.scss';

function MainNavbar(props) {
    const user = useContext(UserContext);
    let flag = false;
    if (window.location.pathname === '/packages') flag = true;
    else if (window.location.pathname === '/premium') flag = true;
    else if (window.location.pathname === '/setup') flag = true;
    return (
        <Navbar className="main-navbar" collapseOnSelect expand="lg" bg="white" variant="white">
            <Container>
                <div className="img-cont">
                    <Link to="/">
                        <img src="/logo_blue.png" alt="mzushi" />
                    </Link>
                </div>
                {
                    !flag ? (
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            </Nav>
                            {
                                user.userState ? (
                                    <Nav>
                                        <Link className="dashboard-icon" to="/dashboard/account">
                                            <img src="/android-chrome-192x192.png" alt="mzushi icon" />
                                        </Link>
                                    </Nav>
                                ) : (
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
                                )
                            }
                        </Navbar.Collapse>
                    ) : null
                }
            </Container>
        </Navbar>
    );
}

export default MainNavbar;