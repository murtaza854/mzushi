import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BusinessCard, SearchBar } from '../../components';
import { BusinessList, FilterPanel } from './components';
import { GoSettings } from 'react-icons/go';
import Slider from "react-slick";
import './Businesses.scss';

function Businesses(props) {
    const cards = [<BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />];
    let sliderLength = 4;
    // let sliderLength1250 = 3;
    let sliderLength991 = 2;
    const settingsCards = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: sliderLength,
        slidesToScroll: 1,
        // initialSlide: 0,
        arrows: false,
        // variableWidth: true,
        responsive: [
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: sliderLength991,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                    centerMode: true,
                }
            }
        ]
    };
    const openFilterPanel = _ => {
        document.getElementById('filter-panel').classList.remove('remove-filter-panel');
        document.getElementById('filter-panel').classList.add('active-filter-panel');
        document.body.classList.add('disable-scroll');
    }
    return (
        <div className="businesses">
            <Container fluid className="first-section">
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
            </Container>
            <div className="margin-global-top-5" />
            <Container className="card-container">
                <Row>
                    <Col xl={2}>
                        <FilterPanel />
                        <GoSettings className="unhide-1200 filter-open-icon" onClick={openFilterPanel} />
                        {/* <button className="unhide-1200" onClick={openFilterPanel} type="button">Filter panel</button> */}
                    </Col>
                    <Col xl={10}>
                        <BusinessList />
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default Businesses;