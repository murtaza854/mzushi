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

    const [selectedStartups, setSelectedStartups] = useState([]);
    const [features, setFeatures] = useState([]);

    const [provinces, setProvinces] = useState([]);

    // const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);

    // const [areas, setAreas] = useState([]);
    const [filteredAreas, setFilteredAreas] = useState([]);
    // const [areaChange, setAreaChange] = useState(true);
    const params = new URLSearchParams(window.location.search);
    const feature = params.get('feature') || null;

    useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/features/table-data`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                });
                const content = await response.json();
                const featuresList = [];
                content.data.forEach(element => {
                    element['active'] = false;
                    if (feature && element.slug === feature) element['active'] = true;
                    featuresList.push(element);
                });
                setFeatures(featuresList);
            })();
    }, [feature]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/province/get-provinces-with-ref`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                });
                const content = await response.json();
                const provincesList = [];
                content.data.forEach(element => {
                    element['active'] = false;
                    provincesList.push(element);
                });
                setProvinces(provincesList);
            })();
    }, []);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/city/get-cities-with-ref`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                });
                const content = await response.json();
                const citiesList = [];
                content.data.forEach(element => {
                    element['active'] = false;
                    citiesList.push(element);
                });
                // setCities(citiesList);
                setFilteredCities(citiesList);
            })();
    }, []);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/area/get-areas-with-ref`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                });
                const content = await response.json();
                const areasList = [];
                content.data.forEach(element => {
                    element['active'] = false;
                    areasList.push(element);
                });
                // setAreas(areasList);
                setFilteredAreas(areasList);
            })();
    }, []);

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
            setSelectedStartups(content.data);
            setFeaturedStartUps(content.data.filter(element => element.mzushiChoice === true));
        })()
    }, [category]);

    useEffect(() => {
        try {
            const activeFeatures = features.filter(e => e.active === true);
            const activeProvinces = provinces.filter(e => e.active === true);
            const activeCities = filteredCities.filter(e => e.active === true);
            const activeAreas = filteredAreas.filter(e => e.active === true);
            const filteredStartups = [];
            for (let i = 0; i < startUps.length; i++) {
                const s = startUps[i];
                const startupFeatures = s.features;
                const startupArea = s.address.area;
                const startupCity = startupArea.city;
                const startupProvince = startupCity.province;
                let flag = true;
                for (let j = 0; j < activeFeatures.length; j++) {
                    const activeF = activeFeatures[j];
                    flag = startupFeatures.some(elem => elem.name === activeF.name);
                    if (!flag) break;
                }
                if (flag) {
                    if (activeProvinces.find(elem => elem.name !== startupProvince.name)) flag = false;
                }
                if (flag) {
                    if (activeCities.find(elem => elem.name !== startupCity.name)) flag = false;
                }
                if (flag) {
                    if (activeAreas.find(elem => elem.name !== startupArea.name)) flag = false;
                }
                if (flag) filteredStartups.push(s);
            }
            console.log(filteredStartups);
            setSelectedStartups(filteredStartups);
        } catch (error) {
            console.log(error);
        }
    }, [startUps, features, provinces, filteredCities, filteredAreas]);

    // useEffect(() => {
    //     const activeProvinces = provinces.filter(e => e.active === true);
    //     const citiesList = [];
    //     if (activeProvinces.length > 0) {
    //         for (let i = 0; i < cities.length; i++) {
    //             const city = cities[i];
    //             city.active = false;
    //             if (activeProvinces.find(province => province._id === city.province)) {
    //                 citiesList.push(city);
    //             }
    //         }
    //         setFilteredCities(citiesList);
    //         const areasList = [];
    //         if (citiesList.length > 0) {
    //             // setAreaChange(false);
    //             for (let i = 0; i < areas.length; i++) {
    //                 const area = areas[i];
    //                 area.active = false;
    //                 if (citiesList.find(city => city._id === area.city)) {
    //                     areasList.push(area);
    //                 }
    //             }
    //             setFilteredAreas(areasList);
    //         } else {
    //             // setAreaChange(true);
    //             setFilteredAreas(areas);
    //         }
    //     } else {
    //         setFilteredCities(cities);
    //         const activeCities = filteredCities.filter(e => e.active === true);
    //         const areasList = [];
    //         if (activeCities.length > 0) {
    //             for (let i = 0; i < areas.length; i++) {
    //                 const area = areas[i];
    //                 area.active = false;
    //                 if (activeCities.find(city => city._id === area.city)) {
    //                     areasList.push(area);
    //                 }
    //             }
    //             setFilteredAreas(areasList);
    //         } else {
    //             setFilteredAreas(areas);
    //         }
    //     }
    // }, [provinces, cities, areas, filteredCities]);

    // useEffect(() => {
    //     if (areaChange) {
    //         const activeCities = filteredCities.filter(e => e.active === true);
    //         const areasList = [];
    //         if (activeCities.length > 0) {
    //             for (let i = 0; i < areas.length; i++) {
    //                 const area = areas[i];
    //                 area.active = false;
    //                 if (activeCities.find(city => city._id === area.city)) {
    //                     areasList.push(area);
    //                 }
    //             }
    //             setFilteredAreas(areasList);
    //         } else {
    //             setFilteredAreas(areas);
    //         }
    //     }
    // }, [filteredCities, areas, areaChange]);

    const handleFeatureChange = (e, index) => {
        const featuresList = [...features];
        featuresList[index].active = !featuresList[index].active;
        setFeatures(featuresList);
    }

    const handleProvinceChange = (e, index) => {
        const provinvesList = [...provinces];
        provinvesList[index].active = !provinvesList[index].active;
        provinvesList.map((value, i) => {
            if (i !== index) value.active = false;
            return value;
        });
        setProvinces(provinvesList);
    }

    const handleCityChange = (e, index) => {
        const citiesList = [...filteredCities];
        citiesList[index].active = !citiesList[index].active;
        citiesList.map((value, i) => {
            if (i !== index) value.active = false;
            return value;
        });
        setFilteredCities(citiesList);
    }

    const handleAreaChange = (e, index) => {
        const areasList = [...filteredAreas];
        areasList[index].active = !areasList[index].active;
        areasList.map((value, i) => {
            if (i !== index) value.active = false;
            return value;
        });
        setFilteredAreas(areasList);
    }

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
                        <FilterPanel
                            handleFeatureChange={handleFeatureChange}
                            handleProvinceChange={handleProvinceChange}
                            handleCityChange={handleCityChange}
                            handleAreaChange={handleAreaChange}
                            features={features}
                            provinces={provinces}
                            cities={filteredCities}
                            areas={filteredAreas}
                        />
                        <div className="unhide-1200 filter-icon-btn-container">
                            <div className="filter-icon-btn">
                                <GoSettings className="filter-open-icon" onClick={openFilterPanel} />
                            </div>
                        </div>
                        {/* <button className="unhide-1200" onClick={openFilterPanel} type="button">Filter panel</button> */}
                    </Col>
                    <Col xl={10}>
                        <BusinessList startUps={selectedStartups} />
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default Businesses;