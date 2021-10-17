import React, { useState } from 'react';
import { Fragment } from 'react';
import { Form, Col, Container, Row } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { AiOutlineSearch } from 'react-icons/ai';
import api from '../../api';
import './SearchBar.scss';

function SearchBar(props) {
    const [country, setCountry] = useState({ value: [] });
    const [countryList, setCountryList] = useState([]);
    const [countryLoading, setCountryLoading] = useState(false);

    const changeCountry = async array => {
        setCountry(prevState => ({ ...prevState, value: array }));
    }

    const handleCountrySearch = async (query) => {
        setCountryLoading(true);
        setCountryList([]);
        const response = await fetch(`${api}/country/get-countries-search?countryText=${query}`, {
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
            setCountryList(content.data);
            setCountryLoading(false);
        }, 1000)
    };

    const filterByCountry = () => true;
    return (
        <Container className={`search-bar ${props.classes}`} fluid>
            <Form className={`form-style ${props.centerclass}`}>
                <Row className="justify-content-center">
                    <Form.Group as={Col} xs={4} controlId="country">
                        <AsyncTypeahead
                            filterBy={filterByCountry}
                            isLoading={countryLoading}
                            placeholder="Search"
                            id="country"
                            labelKey="name"
                            minLength={2}
                            onSearch={handleCountrySearch}
                            onChange={changeCountry}
                            options={countryList}
                            selected={country.value}
                            renderMenuItemChildren={(option, props) => (
                                <Fragment>
                                    <span>{option.name}</span>
                                </Fragment>
                            )}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs={4} className="input-form-group fit-content" controlId="country">
                        <select className="browser-default ustom-select">
                            <option value="Karachi">Karachi</option>
                            <option value="Islamabad">Dera Ghazi Khan</option>
                            <option value="3">Option 3</option>
                        </select>
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