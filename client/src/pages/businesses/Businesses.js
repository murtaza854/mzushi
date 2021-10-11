import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BusinessCard, SearchBar } from '../../components';
import { BusinessList, FilterPanel } from './components'
import Slider from "react-slick";
import './Businesses.scss';

function Businesses(props) {
    const cards = [<BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />];
    let sliderLength = 4;
    let sliderLength1250 = 3;
    let sliderLength991 = 2;
    if (cards.length < sliderLength) sliderLength = cards.length;
    if (cards.length < sliderLength1250) sliderLength = cards.length;
    if (cards.length < sliderLength991) sliderLength = cards.length;
    const settingsCards = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: sliderLength,
        slidesToScroll: 1,
        // initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: sliderLength1250,
                    slidesToScroll: 1,
                    centerMode: true,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: sliderLength991,
                    slidesToScroll: 1,
                    centerMode: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
                }
            }
        ]
    };
    return (
        <Container className="businesses" fluid>
            <div className="margin-global-top-5" />
            <SearchBar classes="" centerclass="" />
            <div className="margin-global-top-3" />
            <Container className="card-container">
                <Row className="justify-content-center">
                    <Slider {...settingsCards}>
                        {
                            cards.map((value, index) => (
                                <div key={index} className="business-card-container">
                                    {value}
                                </div>
                            ))
                        }
                    </Slider>
                </Row>
            </Container>
            <div className="margin-global-top-5" />
            <Row>
                <Col md={2}>
                    <FilterPanel />
                </Col>
                <Col md={10}>
                    <BusinessList />
                </Col>
            </Row>
        </Container>
    );
}

export default Businesses;