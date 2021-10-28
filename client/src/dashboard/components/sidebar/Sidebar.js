import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar(props) {
    return (
        <Col md={3} className="dashboard-sidebar">
            <Row className="link-row text-center">
                <Link className="active" to="/dashboard">Setup</Link>
                <Link to="/dashboard/gallery">Gallery</Link>
            </Row>
        </Col>
    );
}

export default Sidebar;