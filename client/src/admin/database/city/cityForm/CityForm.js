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

function CityForm(props) {
    const {
        rows,
    } = props;
    const id = useParams().id || null;

    const [name, setName] = useState({ value: '', error: false, helperText: 'Enter a name Ex. Karachi' });
    const [state, setState] = useState({ name: '', obj: null, helperText: 'Enter state Ex. Sindh', error: false });
    const [checkBoxes, setCheckBoxes] = useState({ active: true, featured: false });

    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${api}/province/getAllStates`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const content = await response.json();
                setStateList(content.data);
            })();
    }, []);

    useEffect(() => {
        let flag = true;
        if (name.error === true) flag = true;
        else if (name.value.length === 0) flag = true;
        else if (state.error === true) flag = true;
        else if (state.obj === null) flag = true;
        else flag = false;
        setDisabled(flag);
    }, [name, state]);

    const handleNameChange = (event) => {
        if (event.target.value.length === 0) {
            setName({ value: event.target.value, error: true, helperText: 'Name is required!' });
        } else if (checkIfObjExistsByName(rows, event.target.value, id)) {
            setName({ value: event.target.value, error: true, helperText: 'City already exists!' });
        } else {
            setName({ value: event.target.value, error: false, helperText: 'Enter a name Ex. Karachi' });
        }
    }

    const handleStateChange = (event) => {
        const obj = stateList.find(cat => cat.name === event.target.value);
        if (event.target.value === '') {
            setState({ name: event.target.value, obj: null, helperText: 'State is required!', error: true });
        } else if (obj === undefined) {
            setState({ name: event.target.value, obj: null, helperText: 'State does not exist!', error: true });
        } else {
            setState({ name: event.target.value, obj, helperText: 'Enter state Ex. Sindh', error: false });
        }
    }

    const handleActiveChange = (event) => {
        setCheckBoxes({ ...checkBoxes, active: !checkBoxes.active });
    }

    const handleFeaturedChange = (event) => {
        setCheckBoxes({ ...checkBoxes, featured: !checkBoxes.featured });
    }

    const handleSubmitAdd = async event => {
        event.preventDefault();
        const response = await fetch(`${api}/city/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({
                name: name.value,
                state: state.obj,
                active: checkBoxes.active,
                featured: checkBoxes.featured,
            })
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/city';
        } else {
            alert("Something went wrong.");
        }
    }

    const handleSubmitEdit = async event => {
        event.preventDefault();
        const response = await fetch(`${api}/city/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({
                id: id,
                name: name.value,
                state: state.obj,
                active: checkBoxes.active,
                featured: checkBoxes.featured
            })
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/city';
        } else {
            alert("Something went wrong.");
        }
    }

    useEffect(() => {
        (
            async () => {
                if (id) {
                    const response = await fetch(`${api}/city/getById`, {
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
                        setName({ value: data.name, error: false, helperText: 'Enter a name Ex. Karachi' });
                        setState({ name: data.province.name, obj: data.province, helperText: 'Enter state Ex. Sindh', error: false });
                        setCheckBoxes({ active: data.active, featured: data.featured });
                        setDisabled(false);
                    } else {
                        window.location.href = window.location.href.split('/admin')[0] + '/admin/city';
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
                        City
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
                                value={state.obj ? state.obj.name : null}
                                onChange={handleStateChange}
                                onBlur={handleStateChange}
                                fullWidth
                                id="combo-box-demo"
                                options={stateList.map(option => option.name)}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField error={state.error} {...params} variant="standard" label="State" />}
                            />
                            <FormHelperText error={state.error}>{state.helperText}</FormHelperText>
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
                    <Col md={6}>
                        <FormControlLabel
                            control={<Checkbox
                                checked={checkBoxes.featured}
                                onChange={handleFeaturedChange}
                            />}
                            label="Featured"
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

export default CityForm;