import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar(props) {
    return (
        <Col md={3} className="dashboard-sidebar">
            <Row className="link-row text-center">
                <Link to="/">About</Link>
                <Link to="/">Address</Link>
                <Link to="/">Business Timings</Link>
                <Link to="/">Business Features</Link>
                <Link to="/">Gallery</Link>
            </Row>
        </Col>
    );
}

export default Sidebar;