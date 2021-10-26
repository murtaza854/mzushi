import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BusinessCard, SearchBar } from '../../components';
import { BusinessList, FilterPanel } from './components';
import { GoSettings } from 'react-icons/go';
import Slider from "react-slick";
import './Businesses.scss';
import { useParams } from 'react-router';
import api from '../../api';
import { arrayBufferToBase64 } from '../../helperFunctions/arrayBufferToBase64';

function Businesses(props) {
    const { category } = useParams();
    const [startUps, setStartUps] = useState([]);
    const [featuredStartUps, setFeaturedStartUps] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${api}/startup/get-all-by-category?categorySlug=${category}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const content = await response.json();
            setStartUps(content.data);
            setFeaturedStartUps(content.data.filter(element => element.mzushiChoice === true));
            // setCategory(splitArrayIntoChunksOfLen(content.data, 4));
        })()
    }, [category]);

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
                            {/* {
                                cards.map((value, index) => (
                                    <div key={index} className="business-card-container">
                                        {value}
                                    </div>
                                ))
                            } */}
                            {
                            featuredStartUps.map((value, index) => {
                                const base64Flag = `data:${value.logo.contentType};base64,`;
                                const imagePath = base64Flag + arrayBufferToBase64(value.logo.data.data);
                                return (
                                    <div key={index} className="business-card-container">
                                        <BusinessCard
                                            classes="horizontal-center-relative"
                                            logo={imagePath}
                                            startupName={value.startupName}
                                            slug={`/${value.category.slug}/${value.slug}`}
                                            category={value.category.name}
                                            rating={value.rating}
                                        />
                                    </div>
                                )
                            })
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
                        <div className="unhide-1200 filter-icon-btn-container">
                            <div className="filter-icon-btn">
                                <GoSettings className="filter-open-icon" onClick={openFilterPanel} />
                            </div>
                        </div>
                        {/* <button className="unhide-1200" onClick={openFilterPanel} type="button">Filter panel</button> */}
                    </Col>
                    <Col xl={10}>
                        <BusinessList startUps={startUps} />
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default Businesses;