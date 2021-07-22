import { FormControl, Input, InputLabel, FormHelperText, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../api';
import TreeItem from '@material-ui/lab/TreeItem';

const createTableData = (data) => {
    const { _id, name, country } = data;
    const countryName = country.name
    return { _id, name, countryName };
}

const editObjCheck = (data, value, editObj) => {
    if (editObj) return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim() && obj.name !== editObj.name);
    else return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim())
}

const provinceObj = {
    apiTable: `${api}/province/table-data`,
    deleteApi: [`${api}/province/get-by-ids`, `${api}/province/delete`],
    createTableData: createTableData,
    headCells: [
        // { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'countryName', numeric: false, disablePadding: false, label: 'Country' },
    ],
    ManyChild: '',
    checkboxSelection: '_id',
    Delete: function (items) {
        let html = [];
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            console.log(element);
            html.push(
                <TreeItem key={i} nodeId={`${element._id}`} label={element.name}>
                    {element.cities.map((childValue, childIndex) => {
                        return <TreeItem key={childIndex} nodeId={`${childValue._id}`} label={childValue.name} >
                            {childValue.areas.map((subChildValue, subChildIndex) => {
                                return <TreeItem key={subChildIndex} nodeId={`${subChildValue._id}`} label={subChildValue.name} />
                            })}
                        </TreeItem>
                    })}
                </TreeItem>
            )
        }
        return html;
    },
    editAllowed: true,
    deleteAllowed: true,
    addAllowed: true,
    modelName: 'Province',
    ordering: 'name',
    rightAllign: [],
    Form: function (id, classes) {
        let history = useHistory();

        let queryID = '';
        if (id != null) queryID = id;
        const [editObj, setEditObj] = useState(null);

        const [nameState, setNameState] = useState({ name: '', helperText: 'Enter name Ex. Mobile', error: false });
        const [countryState, setCountryState] = useState({ name: '', obj: undefined, helperText: 'Enter name Ex. Electronic', error: false });

        const [provincesArray, setProvincesArray] = useState([]);
        const [countriesArray, setCountriesArray] = useState([]);
        const [isDisabled, setCanSubmit] = useState(true);
        const [pressedBtn, setPressedBtn] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            let flag = true;
            if (nameState.error === true) flag = true;
            else if (nameState.name.length === 0) flag = true;
            else if (countryState.error === true) flag = true;
            else if (countryState.name.length === 0) flag = true;
            else if (countryState.obj === undefined) flag = true;
            else flag = false;
            setCanSubmit(flag);
        }, [nameState, countryState]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/province/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                          },
                    });
                    const content = await response.json();
                    const obj = content.data.find(o => o._id === queryID);
                    setEditObj(obj);
                    setProvincesArray(content.data);
                    setLoading(false);
                })();
        }, [queryID, isDisabled]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/country/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                          },
                    });
                    const content = await response.json();
                    setCountriesArray(content.data)
                })();
        }, []);

        useEffect(() => {
            if (editObj) {
                setNameState(prevState => ({ ...prevState, name: editObj.name }));
                setCountryState(prevState => ({ ...prevState, name: editObj.name, obj: editObj.country }));
            } else {
                setNameState(prevState => ({ ...prevState, name: '' }));
                setCountryState(prevState => ({ ...prevState, name: '', obj: undefined }));
            }
        }, [editObj]);

        function changeNameState(event) {
            const { value } = event.target;
            setNameState(prevState => ({ ...prevState, name: value }));
            let obj = editObjCheck(provincesArray, value, editObj);
            if (obj) setNameState(prevState => ({ ...prevState, helperText: `${obj.name} already exists!`, error: true }));
            else if (value === '') setNameState(prevState => ({ ...prevState, helperText: 'Name is required!', error: true }));
            else setNameState(prevState => ({ ...prevState, helperText: 'Enter name Ex. Mobile', error: false }));
        };
        function changeCountryState(event) {
            const { value } = event.target;
            const obj = countriesArray.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim());
            setCountryState(prevState => ({ ...prevState, name: value, obj: obj  }));
            if (value === '') setCountryState(prevState => ({ ...prevState, helperText: 'Country is required!', error: true }));
            else setCountryState(prevState => ({ ...prevState, helperText: 'Enter name Ex. Electronic', error: false }));
        };

        const onSubmit = async e => {
            e.preventDefault();
            if (queryID === '') {
                await fetch(`${api}/province/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                      },
                    body: JSON.stringify({ name: nameState.name, country: countryState.obj }),
                });
            } else {
                await fetch(`${api}/province/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                      },
                    body: JSON.stringify({ _id: queryID, name: nameState.name, country: countryState.obj }),
                });
            }
            if (pressedBtn === 1) {
                if (queryID === '') {
                    history.push({
                        pathname: `/admin/province`,
                        state: {data: 'added', name: nameState.name}
                    });
                } else {
                    history.push({
                        pathname: `/admin/province`,
                        state: {data: 'edited', name: nameState.name}
                    });
                }
            }
            else {
                setNameState({ name: '', helperText: 'Enter name Ex. Mobile', error: false });
                setCountryState({ name: '', obj: undefined, helperText: 'Enter name Ex. Electronic', error: false });
                queryID = '';
                history.push('/admin/province/add');
            }
        };
        if (loading) return <div></div>

        return (<form onSubmit={onSubmit} autoComplete="off">
            <fieldset>
                <legend>Details</legend>
                <Row className={classes.rowGap}>
                    <Form.Group as={Col} md={6} controlId="name">
                        <FormControl className={classes.formControl}>
                            <InputLabel error={nameState.error} color="secondary" htmlFor="name">Name</InputLabel>
                            <Input
                                color="secondary"
                                autoComplete="none"
                                value={nameState.name}
                                type="text"
                                error={nameState.error}
                                id="name"
                                name="name"
                                onChange={changeNameState}
                                onBlur={changeNameState}
                                aria-describedby="name-helper"
                            />
                            <FormHelperText error={nameState.error} id="name-helper">{nameState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="country">
                        <FormControl className={classes.formControl}>
                            <Autocomplete
                                id="combo-box-demo"
                                color="secondary"
                                options={countriesArray}
                                getOptionLabel={(option) => option.name}
                                value={countryState.obj ? countryState.obj : null}
                                // style={{ width: 300 }}
                                renderInput={(params) => <TextField
                                    color="secondary"
                                    error={countryState.error}
                                    onChange={changeCountryState}
                                    onBlur={changeCountryState}
                                    {...params} label="Country"
                                />
                                }
                            />
                            <FormHelperText error={countryState.error} id="countryState-helper">{countryState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                </Row>
            </fieldset>
            <Button className={classes.button} onClick={_ => setPressedBtn(1)} disabled={isDisabled} type="submit" variant="contained" color="primary">
                Save
            </Button>
            <Button onClick={_ => setPressedBtn(2)} disabled={isDisabled} type="submit" variant="contained" color="primary">
                Save and add another
            </Button>
        </form>);
    },
}

export default provinceObj;