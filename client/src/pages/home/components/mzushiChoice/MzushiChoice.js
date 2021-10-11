import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Slider from "react-slick";
import { BusinessCard, Heading2, YellowButton } from '../../../../components';
import './MzushiChoice.scss';

function MzushiChoice(props) {
    const settingsCities = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        // initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                }
            },
            {
                breakpoint: 567,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true
                }
            }
        ]
    };
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
        <Container fluid className="mzushi-choice">
            <Container className="city-container">
                <Heading2
                    text=""
                    blue="mzushi's"
                    classes="text-center"
                    text2="Choice"
                />
                <div className="margin-global-top-2" />
                <Row className="justify-content-center">
                    <Slider {...settingsCities}>
                        <Col xs={2}>
                            <YellowButton
                                to="/"
                                text="Karachi"
                                classes="text-uppercase active-card width-high horizontal-center-relative"
                            />
                        </Col>
                        <Col xs={2}>
                            <YellowButton
                                to="/"
                                text="Lahore"
                                classes="text-uppercase width-high horizontal-center-relative"
                            />
                        </Col>
                        <Col xs={2}>
                            <YellowButton
                                to="/"
                                text="Islamabad"
                                classes="text-uppercase width-high horizontal-center-relative"
                            />
                        </Col>
                        <Col xs={2}>
                            <YellowButton
                                to="/"
                                text="Quetta"
                                classes="text-uppercase width-high horizontal-center-relative"
                            />
                        </Col>
                        <Col xs={2}>
                            <YellowButton
                                to="/"
                                text="Peshawer"
                                classes="text-uppercase width-high horizontal-center-relative"
                            />
                        </Col>
                    </Slider>
                </Row>
            </Container>
            <div className="margin-global-top-4" />
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
                <div className="margin-global-top-4" />
                <Row>
                    <YellowButton
                        to="/"
                        text="Show More"
                        classes="text-uppercase width-full horizontal-center-relative"
                    />
                </Row>
            </Container>
        </Container>
    );
}

export default MzushiChoice;