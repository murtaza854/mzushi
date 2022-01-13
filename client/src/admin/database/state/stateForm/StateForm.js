import { FormControl, InputLabel, Typography, Input, FormControlLabel, Checkbox, FormHelperText, Button, TextField, Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../../../api';

function checkIfObjExistsByName(obj, name, id) {
    if (id) {
        return obj.find(o => o.name.toLowerCase() === name.toLowerCase() && o.id !== id);
    } else {
        return obj.find(o => o.name.toLowerCase() === name.toLowerCase());
    }
}

function StateForm(props) {
    const {
        rows,
    } = props;
    const id = useParams().id || null;

    const [name, setName] = useState({ value: '', error: false, helperText: 'Enter a name Ex. Sindh' });
    const [country, setCountry] = useState({ name: '', obj: null, helperText: 'Enter country Ex. Pakistan', error: false });
    const [checkBoxes, setCheckBoxes] = useState({ active: true });

    const [countryList, setCountryList] = useState([]);

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/country/getAllCountries`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const content = await response.json();
                setCountryList(content.data);
            })();
    }, []);

    useEffect(() => {
        let flag = true;
        if (name.error === true) flag = true;
        else if (name.value.length === 0) flag = true;
        else if (country.error === true) flag = true;
        else if (country.obj === null) flag = true;
        else flag = false;
        setDisabled(flag);
    }, [name, country]);

    const handleNameChange = (event) => {
        if (event.target.value.length === 0) {
            setName({ value: event.target.value, error: true, helperText: 'Name is required!' });
        } else if (checkIfObjExistsByName(rows, event.target.value, id)) {
            setName({ value: event.target.value, error: true, helperText: 'State already exists!' });
        } else {
            setName({ value: event.target.value, error: false, helperText: 'Enter a name Ex. Sindh' });
        }
    }

    const handleCountryChange = (event) => {
        const obj = countryList.find(cat => cat.name === event.target.value);
        if (event.target.value === '') {
            setCountry({ name: event.target.value, obj: null, helperText: 'Country is required!', error: true });
        } else if (obj === undefined) {
            setCountry({ name: event.target.value, obj: null, helperText: 'Country does not exist!', error: true });
        } else {
            setCountry({ name: event.target.value, obj, helperText: 'Enter country Ex. Pakistan', error: false });
        }
    }

    const handleActiveChange = (event) => {
        setCheckBoxes({ ...checkBoxes, active: !checkBoxes.active });
    }

    const handleSubmitAdd = async event => {
        event.preventDefault();
        const response = await fetch(`${api}/province/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({
                name: name.value,
                country: country.obj,
                active: checkBoxes.active
            })
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/state';
        } else {
            alert("Something went wrong.");
        }
    }

    const handleSubmitEdit = async event => {
        event.preventDefault();
        const response = await fetch(`${api}/province/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({
                id: id,
                name: name.value,
                country: country.obj,
                active: checkBoxes.active
            })
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/state';
        } else {
            alert("Something went wrong.");
        }
    }

    useEffect(() => {
        (
            async () => {
                if (id) {
                    const response = await fetch(`${api}/province/getById`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: id
                        })
                    });
                    const content = await response.json();
                    if (content.data) {
                        const { data } = content;
                        setName({ value: data.name, error: false, helperText: 'Enter a name Ex. Sindh' });
                        setCountry({ name: data.country.name, obj: data.country, helperText: 'Enter country Ex. Pakistan', error: false });
                        setCheckBoxes({ active: data.active });
                        setDisabled(false);
                    } else {
                        window.location.href = window.location.href.split('/admin')[0] + '/admin/state';
                    }
                }
            })();
    }, [id]);

    let onSubmit = handleSubmitAdd;
    if (id) onSubmit = handleSubmitEdit;

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        State
                    </Typography>
                </Col>
            </Row>
            <Form onSubmit={onSubmit}>
                <input
                    type="password"
                    autoComplete="on"
                    value=""
                    style={{ display: 'none' }}
                    readOnly={true}
                />
                <Row>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel error={name.error} htmlFor="name">Name</InputLabel>
                            <Input id="name"
                                value={name.value}
                                onChange={handleNameChange}
                                onBlur={handleNameChange}
                                error={name.error}
                            />
                            <FormHelperText error={name.error}>{name.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                    <Col md={6}>
                        <FormControl variant="standard" fullWidth>
                            <Autocomplete
                                style={{ width: '100%' }}
                                disablePortal
                                // value={category.obj}
                                value={country.obj ? country.obj.name : null}
                                onChange={handleCountryChange}
                                onBlur={handleCountryChange}
                                fullWidth
                                id="combo-box-demo"
                                options={countryList.map(option => option.name)}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField error={country.error} {...params} variant="standard" label="Country" />}
                            />
                            <FormHelperText error={country.error}>{country.helperText}</FormHelperText>
                        </FormControl>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col md={6}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={checkBoxes.active}
                                onChange={handleActiveChange}
                            />}
                            label="Active"
                        />
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col className="flex-display">
                        <Button disabled={disabled} type="submit" variant="contained" color="secondary">
                            Save
                        </Button>
                        <div className="margin-global-05" />
                        <Button disabled={disabled} type="button" variant="contained" color="secondary">
                            Save and Add Another
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default StateForm;