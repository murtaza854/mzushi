import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BusinessCard, SearchBar } from '../../components';
import { BusinessList, FilterPanel } from './components'

function Businesses(props) {
    return (
        <Container className="setup" fluid>
            <div className="margin-global-top-5" />
            <SearchBar classes="" centerclass="" />
            <div className="margin-global-top-3" />
            <Row className="justify-content-center">
                <BusinessCard classes="" />
                <BusinessCard classes="" />
                <BusinessCard classes="" />
                <BusinessCard classes="" />
            </Row>
            <div className="margin-global-top-5" />
            <Row>
                <Col md={2}>
                    <FilterPanel />
                </Col>
                <Col md={8}>
                    <BusinessList />
                </Col>
            </Row>
        </Container>
    );
}

export default Businesses;