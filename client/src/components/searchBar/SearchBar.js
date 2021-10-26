import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Form, Col, Container, Row } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { AiOutlineSearch } from 'react-icons/ai';
import api from '../../api';
import './SearchBar.scss';

function SearchBar(props) {
    const [cityList, setCityList] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    const [startup, setStartup] = useState({ value: [] });
    const [startupList, setStartupList] = useState([]);
    const [startupLoading, setStartupLoading] = useState(false);

    const changeStartup = async array => {
        setStartup(prevState => ({ ...prevState, value: array }));
    }

    const handlStartupSearch = async (query) => {
        setStartupLoading(true);
        setStartupList([]);
        const response = await fetch(`${api}/startup/get-startups-search?startupText=${query}&city=${JSON.stringify(selectedCity)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            credentials: 'include',
            withCredentials: true,
        });
        const content = await response.json();
        setTimeout(() => {
            setStartupList(content.data);
            setStartupLoading(false);
        }, 1000)
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${api}/city/table-data`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const content = await response.json();
                setCityList(content.data);
                if (content.data.length > 0) setSelectedCity(content.data[0]._id);
            } catch (error) {
                setCityList([]);
            }
        })()
    }, []);

    const filterByStartup = () => true;

    const changeSelectedCity = e => {
        // console.log(e.target.value);
        // setStartupList([]);
        setSelectedCity(e.target.value);
    }

    return (
        <Container className={`search-bar ${props.classes}`} fluid>
            <img className="background" src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/a2a6dfbdce53/assets/img/home/hero_photos/Y52KtIDZeG8aAMBaLIjSlQ.jpg" alt="Background" />
            <Form className={`form-style ${props.centerclass}`}>
                <Row className="justify-content-center">
                    <Form.Group as={Col} xs={4} controlId="startup">
                        <AsyncTypeahead
                            filterBy={filterByStartup}
                            isLoading={startupLoading}
                            placeholder="Search"
                            id="startup"
                            labelKey="startupName"
                            minLength={2}
                            onSearch={handlStartupSearch}
                            onChange={changeStartup}
                            options={startupList}
                            selected={startup.value}
                            renderMenuItemChildren={(option, props) => (
                                <Fragment>
                                    <span>{option.startupName}</span>
                                </Fragment>
                            )}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={4} className="input-form-group fit-content" controlId="country">
                        {
                            selectedCity ? (
                                <select value={selectedCity} onChange={changeSelectedCity} className="browser-default ustom-select">
                                    {
                                        cityList.map((value, index) => {
                                            return (
                                                <option key={index} value={value._id}>{value.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            ) : null
                        }
                    </Form.Group>
                    <Col xs={2} className="searchbar-btn">
                        {/* <Button className="searchbar-width border-radius-btn" type="submit"> */}
                        <AiOutlineSearch className="icon" />
                        {/* </Button> */}
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default SearchBar;