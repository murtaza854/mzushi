import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar(props) {
    const activeClass = {
        home: '',
        owner: '',
        premium: '',
        setup: '',
        gallery: '',
        email: '',
        password: ''
    };
    if (window.location.pathname === '/dashboard/account') activeClass.home = 'active';
    else if (window.location.pathname === '/dashboard/account/account-setup' || window.location.pathname === '/dashboard/account/account-setup/edit') activeClass.setup = 'active';
    else if (window.location.pathname === '/dashboard/account/gallery') activeClass.gallery = 'active';
    else if (window.location.pathname === '/dashboard/account/gallery/add') activeClass.gallery = 'active';
    else if (window.location.pathname === '/dashboard/account/change-email') activeClass.email = 'active';
    else if (window.location.pathname === '/dashboard/account/change-password') activeClass.password = 'active';
    else if (window.location.pathname === '/dashboard/account/owner-info') activeClass.owner = 'active';
    return (
        <Col md={2} className="dashboard-sidebar">
        <div className="margin-global-top-3" />
            <Row className="link-row text-center">
                <Link className={activeClass.home} to="/dashboard/account">Home</Link>
                <Link className={activeClass.owner} to="/dashboard/account/owner-info">Owner</Link>
                <Link className={activeClass.premium} to="/dashboard/account">Premium</Link>
                <Link className={activeClass.setup} to="/dashboard/account/account-setup">Setup</Link>
                <Link className={activeClass.gallery} to="/dashboard/account/gallery">Gallery</Link>
                <Link className={activeClass.email} to="/dashboard/account/change-email">Change Email</Link>
                <Link className={activeClass.password} to="/dashboard/account/change-password">Change Password</Link>
            </Row>
        <div className="margin-global-top-3" />
        </Col>
    );
}

export default Sidebar;