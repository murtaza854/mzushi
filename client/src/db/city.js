import { FormControl, Input, InputLabel, FormHelperText, Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../api';
import TreeItem from '@material-ui/lab/TreeItem';

const createTableData = (data) => {
    const { _id, name, province, featured } = data;
    const provinceName = province.name
    const countryName = province.country.name
    return { _id, name, provinceName, countryName, featured };
}

const editObjCheck = (data, value, editObj) => {
    if (editObj) return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim() && obj.name !== editObj.name);
    else return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim())
}

const cityObj = {
    apiTable: `${api}/city/table-data`,
    deleteApi: [`${api}/city/get-by-ids`, `${api}/city/delete`],
    createTableData: createTableData,
    headCells: [
        // { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'provinceName', numeric: false, disablePadding: false, label: 'Province' },
        { id: 'countryName', numeric: false, disablePadding: false, label: 'Country' },
        { id: 'featured', numeric: false, disablePadding: false, label: 'Featured' },
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
                    {element.areas.map((childValue, childIndex) => {
                        return <TreeItem key={childIndex} nodeId={`${childValue._id}`} label={childValue.name} />
                    })}
                </TreeItem>
            )
        }
        return html;
    },
    editAllowed: true,
    deleteAllowed: true,
    addAllowed: true,
    modelName: 'City',
    ordering: 'name',
    rightAllign: [],
    Form: function (id, classes) {
        let history = useHistory();

        let queryID = '';
        if (id != null) queryID = id;
        const [editObj, setEditObj] = useState(null);

        const [nameState, setNameState] = useState({ name: '', helperText: 'Enter name Ex. Samsung', error: false });
        const [provinceState, setProvinceState] = useState({ name: '', obj: undefined, helperText: 'Enter name Ex. Electronic', error: false });
        const [checkboxes, setCheckboxes] = useState({ featured: false });

        const [citiesArray, setCitiesArray] = useState([]);
        const [provincesArray, setProvincesArray] = useState([]);
        const [isDisabled, setCanSubmit] = useState(true);
        const [pressedBtn, setPressedBtn] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            let flag = true;
            if (nameState.error === true) flag = true;
            else if (nameState.name.length === 0) flag = true;
            else if (provinceState.error === true) flag = true;
            else if (provinceState.name.length === 0) flag = true;
            else if (provinceState.obj === undefined) flag = true;
            else flag = false;
            setCanSubmit(flag);
        }, [nameState, provinceState]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/city/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                          },
                    });
                    const content = await response.json();
                    const obj = content.data.find(o => o._id === queryID);
                    console.log(obj);
                    setEditObj(obj);
                    setCitiesArray(content.data);
                    setLoading(false);
                })();
        }, [queryID]);

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
                    setProvincesArray(content.data)
                })();
        }, []);

        useEffect(() => {
            if (editObj) {
                setNameState(prevState => ({ ...prevState, name: editObj.name }));
                setProvinceState(prevState => ({ ...prevState, name: editObj.name, obj: editObj.province }));
                setCheckboxes({ featured: editObj.featured });
            } else {
                setNameState(prevState => ({ ...prevState, name: '' }));
                setProvinceState(prevState => ({ ...prevState, name: '', obj: undefined }));
                setCheckboxes({ featured: false });
            }
        }, [editObj]);

        function changeNameState(event) {
            const { value } = event.target;
            setNameState(prevState => ({ ...prevState, name: value }));
            let obj = editObjCheck(citiesArray, value, editObj);
            if (obj) setNameState(prevState => ({ ...prevState, helperText: `${obj.name} already exists!`, error: true }));
            else if (value === '') setNameState(prevState => ({ ...prevState, helperText: 'Name is required!', error: true }));
            else setNameState(prevState => ({ ...prevState, helperText: 'Enter name Ex. Samsung', error: false }));
        };
        function changeProvinceState(event) {
            const { value } = event.target;
            const obj = provincesArray.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim());
            setProvinceState(prevState => ({ ...prevState, name: value, obj: obj }));
            if (value === '') setProvinceState(prevState => ({ ...prevState, helperText: 'Sub category is required!', error: true }));
            else setProvinceState(prevState => ({ ...prevState, helperText: 'Enter name Ex. Electronic', error: false }));
        };
        function ChangeChexboxesState(event) {
            setCheckboxes(prevState => ({ ...prevState, featured: !checkboxes.featured }));
        }

        const onSubmit = async e => {
            e.preventDefault();
            if (queryID === '') {
                await fetch(`${api}/city/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                      },
                    body: JSON.stringify({ name: nameState.name, province: provinceState.obj, featured: checkboxes.featured }),
                });
            } else {
                await fetch(`${api}/city/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                      },
                    body: JSON.stringify({ _id: queryID, name: nameState.name, province: provinceState.obj, featured: checkboxes.featured }),
                });
            }
            if (pressedBtn === 1) {
                if (queryID === '') {
                    history.push({
                        pathname: `/admin/city`,
                        state: { data: 'added', name: nameState.name }
                    });
                } else {
                    history.push({
                        pathname: `/admin/city`,
                        state: { data: 'edited', name: nameState.name }
                    });
                }
            }
            else {
                setNameState({ name: '', helperText: 'Enter name Ex. Samsung', error: false });
                setProvinceState({ name: '', obj: undefined, helperText: 'Enter name Ex. Electronic', error: false });
                setCheckboxes({ featured: false });
                history.push('/admin/city/add');
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
                    <Form.Group as={Col} md={6} controlId="province">
                        <FormControl className={classes.formControl}>
                            <Autocomplete
                                id="combo-box-demo"
                                color="secondary"
                                options={provincesArray}
                                getOptionLabel={(option) => option.name}
                                value={provinceState.obj ? provinceState.obj : null}
                                // style={{ width: 300 }}
                                renderInput={(params) => <TextField
                                    color="secondary"
                                    error={provinceState.error}
                                    onChange={changeProvinceState}
                                    onBlur={changeProvinceState}
                                    {...params} label="Province"
                                />
                                }
                            />
                            <FormHelperText error={provinceState.error} id="provinceState-helper">{provinceState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                </Row>
                <Row className={classes.rowGap}>
                    <Form.Group as={Col} md={6} controlId="name">
                        <FormControlLabel
                            control={<Checkbox checked={checkboxes.featured} onChange={ChangeChexboxesState} name="featured" />}
                            label="Featured"
                        />
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

export default cityObj;