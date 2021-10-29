import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar(props) {
    const activeClass = {
        home: '',
        setup: '',
        gallery: ''
    };
    if (window.location.pathname === '/dashboard/account') activeClass.home = 'active';
    else if (window.location.pathname === '/dashboard/account/account-setup' || window.location.pathname === '/dashboard/account/account-setup/edit') activeClass.setup = 'active';
    else if (window.location.pathname === '/dashboard/account/gallery') activeClass.gallery = 'active';
    return (
        <Col md={2} className="dashboard-sidebar">
            <Row className="link-row text-center">
                <Link className={activeClass.home} to="/dashboard/account">Home</Link>
                <Link className={activeClass.setup} to="/dashboard/account/account-setup">Setup</Link>
                <Link className={activeClass.gallery} to="/dashboard/account/gallery">Gallery</Link>
            </Row>
        </Col>
    );
}

export default Sidebar;