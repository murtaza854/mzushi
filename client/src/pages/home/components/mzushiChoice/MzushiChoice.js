import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Slider from "react-slick";
import api from '../../../../api';
import { BusinessCard, Heading2, YellowButton } from '../../../../components';
import { arrayBufferToBase64 } from '../../../../helperFunctions/arrayBufferToBase64';
import './MzushiChoice.scss';

function MzushiChoice(props) {
    // const [cards, setCards] = useState({karachi: [], lahore: [], islamabad: [], quetta: [], peshawer: []});
    // const cards = [<BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />];
    const [buttons, setButtons] = useState([]);
    const [cards, setCards] = useState([]);
    const [activeCity, setActiveCity] = useState(null);
    const [loading, setLoading] = useState({ city: true, startup: true });
    // const [featuredCities, setFeaturedCities] = useState([]);
    // useEffect(() => {
    //     setCards({
    //         karachi: [<BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />],
    //         lahore: [<BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />],
    //         islamabad: [<BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />],
    //         quetta: [<BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />],
    //         peshawer: [<BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />, <BusinessCard classes="horizontal-center-relative" />],
    //     })
    // }, [])

    useEffect(() => {
        (async () => {
            const response = await fetch(`${api}/city/get-featured`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const content = await response.json();
            const buttonsList = [];
            
            for (let index = 0; index < content.data.length; index++) {
                const element = content.data[index];
                element['active'] = '';
                if (index === 0) {
                    element['active'] = 'active-card';
                    setActiveCity(element);
                }
                buttonsList.push(element);
            }
            setButtons(content.data);
            setLoading(prevState => ({ ...prevState, city: false }));
            // function splitArrayIntoChunksOfLen(arr, len) {
            //     var chunks = [], i = 0, n = arr.length;
            //     while (i < n) {
            //         chunks.push(arr.slice(i, i += len));
            //     }
            //     return chunks;
            // }
            // setCategory(splitArrayIntoChunksOfLen(content.data, 4));
        })()
    }, []);

    useEffect(() => {
        (async () => {
            if (activeCity) {
                const response = await fetch(`${api}/startup/get-mzushi-choice?city=${JSON.stringify(activeCity)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const content = await response.json();
                setCards(content.data);
            }
        })()
    }, [activeCity]);

    const settingsCities = {
        dots: false,
        infinite: false,
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
    const settingsCards = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        // initialSlide: 0,
        arrows: false,
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
                    slidesToShow: 2,
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
                    centerMode: true
                }
            }
        ]
    };

    const handleCategory = (e, id) => {
        e.preventDefault();
        const newArray = [...buttons];
        for (let i = 0; i < newArray.length; i++) {
            const element = newArray[i];
            newArray[i].active = '';
            if (element._id === id) {
                newArray[i].active = 'active-card';
                setActiveCity(newArray[i]);
            }
        }
        setButtons(newArray);
    }

    if (loading.city === true && loading.startup === true) return <div></div>;

    return (
        <Container fluid className="mzushi-choice">
            <Container className="city-container" fluid>
                <Heading2
                    text=""
                    blue="mzushi's"
                    classes="text-center"
                    text2="choice"
                />
                <div className="margin-global-top-2" />
                <Row className="justify-content-center">
                    <Slider {...settingsCities}>
                        {
                            buttons.map((value, index) => {
                                return (
                                    <Col xs={2} key={index}>
                                        <YellowButton
                                            to="/"
                                            onClick={handleCategory}
                                            id={value._id}
                                            text={value.name}
                                            classes={`text-uppercase width-high horizontal-center-relative ${value['active']}`}
                                        />
                                    </Col>
                                );
                            })
                        }
                        {/* <Col xs={2}>
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
                        </Col> */}
                    </Slider>
                </Row>
            </Container>
            <div className="margin-global-top-4" />
            <Container className="card-container">
                <Row className="justify-content-center">
                    <Slider {...settingsCards}>
                        {
                            cards.map((value, index) => {
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
                <div className="margin-global-top-4" />
                <Row>
                    <YellowButton
                        to={"/"}
                        text="Show More"
                        classes="text-uppercase width-full horizontal-center-relative"
                    />
                </Row>
            </Container>
        </Container>
    );
}

export default MzushiChoice;