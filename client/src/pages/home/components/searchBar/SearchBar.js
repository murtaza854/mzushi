import React, { useState } from 'react';
import { Fragment } from 'react';
import { Form, Col, Container, Row, Button } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import api from '../../../../api';
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
        <Container className="search-bar" fluid>
            <Form className="form-style">
                <Row className="justify-content-center">
                    <Form.Group as={Col} md={3} controlId="country">
                        <AsyncTypeahead
                            filterBy={filterByCountry}
                            isLoading={countryLoading}
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
                    <Form.Group className="input-form-group" controlId="country">
                        <select className="browser-default ustom-select">
                            <option value="Karachi">Karachi</option>
                            <option value="Islamabad">Islamabad</option>
                            <option value="3">Option 3</option>
                        </select>
                    </Form.Group>
                    <Button type="submit">
                        Search
                    </Button>
                </Row>
            </Form>
        </Container>
    );
}

export default SearchBar;