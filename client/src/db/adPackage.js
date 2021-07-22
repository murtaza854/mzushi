import { FormControl, Input, InputLabel, FormHelperText, Button, TextField, Select, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../api';
import TreeItem from '@material-ui/lab/TreeItem';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const createTableData = (data) => {
    const { _id, name, type, category, amountOfAds, active } = data;
    const categoryName = category.name
    return { _id, name, type, categoryName, amountOfAds, active };
}

const editObjCheck = (data, value, editObj) => {
    if (editObj) return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim() && obj.name !== editObj.name);
    else return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim())
}

const adPackageObj = {
    apiTable: `${api}/ad-package/table-data`,
    deleteApi: [`${api}/ad-package/get-by-ids`, `${api}/ad-package/delete`],
    createTableData: createTableData,
    headCells: [
        // { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
        { id: 'categoryName', numeric: false, disablePadding: false, label: 'Category' },
        { id: 'amountOfAds', numeric: false, disablePadding: false, label: 'Amount of Ads' },
        { id: 'active', numeric: false, disablePadding: false, label: 'Active' },
    ],
    ManyChild: '',
    checkboxSelection: '_id',
    Delete: function (items) {
        let html = [];
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            html.push(
                <TreeItem key={i} nodeId={`${element._id}`} label={element.name} />
            )
        }
        return html;
    },
    editAllowed: false,
    deleteAllowed: true,
    addAllowed: true,
    modelName: 'Ad Package',
    ordering: 'name',
    rightAllign: [],
    Form: function (id, classes) {
        let history = useHistory();

        // let queryID = '';
        // if (id != null) queryID = id;
        // const [editObj, setEditObj] = useState(null);

        const [nameState, setNameState] = useState({ name: '', helperText: 'Enter name Ex. Mobile', error: false });
        const [priceState, setPriceState] = useState({ name: '', helperText: 'Enter a price Ex. 5000', error: false });
        const [typeState, setTypeState] = useState({ name: '', helperText: 'Select a type Ex. Featured', error: false });
        const [categoryState, setCategoryState] = useState({ name: '', obj: undefined, helperText: 'Enter name Ex. Electronic', error: false });
        const [amountOfAdsState, setAmountOfAdsState] = useState({ name: '', helperText: 'Enter a number Ex. 150', error: false });
        const [checkboxes, setCheckboxes] = useState({ active: true });

        const [adPackagesArray, setAdPackagesArray] = useState([]);
        const [categoriesArray, setCategoriesArray] = useState([]);
        const [isDisabled, setCanSubmit] = useState(true);
        const [pressedBtn, setPressedBtn] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            let flag = true;
            if (nameState.error === true) flag = true;
            else if (nameState.name.length === 0) flag = true;
            else if (priceState.error === true) flag = true;
            else if (priceState.name.length === 0) flag = true;
            else if (typeState.error === true) flag = true;
            else if (typeState.name.length === 0) flag = true;
            else if (categoryState.error === true) flag = true;
            else if (categoryState.name.length === 0) flag = true;
            else if (categoryState.obj === undefined) flag = true;
            else if (amountOfAdsState.error === true) flag = true;
            else if (amountOfAdsState.name.length === 0) flag = true;
            else flag = false;
            setCanSubmit(flag);
        }, [nameState, categoryState, priceState, typeState, amountOfAdsState]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/ad-package/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                          },
                    });
                    const content = await response.json();
                    // const obj = content.data.find(o => o._id === queryID);
                    // setEditObj(obj);
                    setAdPackagesArray(content.data);
                    setLoading(false);
                })();
        }, [isDisabled]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/category/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                          },
                    });
                    const content = await response.json();
                    setCategoriesArray(content.data)
                })();
        }, []);

        // useEffect(() => {
        //     if (editObj) {
        //         setNameState(prevState => ({ ...prevState, name: editObj.name }));
        //         setCategoryState(prevState => ({ ...prevState, name: editObj.name, obj: editObj.category }));
        //     } else {
        //         setNameState(prevState => ({ ...prevState, name: '' }));
        //         setCategoryState(prevState => ({ ...prevState, name: '', obj: undefined }));
        //     }
        // }, [editObj]);

        function changeNameState(event) {
            const { value } = event.target;
            setNameState(prevState => ({ ...prevState, name: value }));
            let obj = editObjCheck(adPackagesArray, value, null);
            if (obj) setNameState(prevState => ({ ...prevState, helperText: `${obj.name} already exists!`, error: true }));
            else if (value === '') setNameState(prevState => ({ ...prevState, helperText: 'Name is required!', error: true }));
            else setNameState(prevState => ({ ...prevState, helperText: 'Enter name Ex. Mobile', error: false }));
        };
        function changePriceState(event) {
            const { value } = event.target;
            const reg = /^\d+$/;
            setPriceState(prevState => ({ ...prevState, name: value }));
            if (value === '') setPriceState(prevState => ({ ...prevState, helperText: 'Price is required!', error: true }));
            else if (!reg.test(value)) setPriceState(prevState => ({ ...prevState, helperText: 'Price is must be a number!', error: true }));
            else setPriceState(prevState => ({ ...prevState, helperText: 'Enter a price Ex. 5000', error: false }));
        };
        function changeTypeState(event) {
            const { value } = event.target;
            setTypeState(prevState => ({ ...prevState, name: value }));
            if (value === '') setTypeState(prevState => ({ ...prevState, helperText: 'Type is required!', error: true }));
            else setTypeState(prevState => ({ ...prevState, helperText: 'Select a type Ex. Featured', error: false }));
        };
        function changeCategoryState(event) {
            const { value } = event.target;
            const obj = categoriesArray.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim());
            setCategoryState(prevState => ({ ...prevState, name: value, obj: obj }));
            if (value === '') setCategoryState(prevState => ({ ...prevState, helperText: 'Category is required!', error: true }));
            else setCategoryState(prevState => ({ ...prevState, helperText: 'Enter name Ex. Electronic', error: false }));
        };
        function changeAmountOfAdsState(event) {
            const { value } = event.target;
            const reg = /^\d+$/;
            setAmountOfAdsState(prevState => ({ ...prevState, name: value }));
            if (value === '') setAmountOfAdsState(prevState => ({ ...prevState, helperText: 'A number is required!', error: true }));
            else if (!reg.test(value)) setAmountOfAdsState(prevState => ({ ...prevState, helperText: 'It must be a number!', error: true }));
            else setAmountOfAdsState(prevState => ({ ...prevState, helperText: 'Enter a number Ex. 150', error: false }));
        };
        function ChangeActiveState(event) {
            setCheckboxes(prevState => ({ ...prevState, active: !checkboxes.active }));
        }

        const onSubmit = async e => {
            e.preventDefault();
            // if (queryID === '') {
            await fetch(`${api}/ad-package/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                  },
                body: JSON.stringify({ name: nameState.name, price: priceState.name, type: typeState.name, amountOfAds: amountOfAdsState.name, active: checkboxes.active, category: categoryState.obj }),
            });
            // } else {
            //     await fetch(`${api}/ad-package/update`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({ _id: queryID, name: nameState.name, category: categoryState.obj }),
            //     });
            // }
            if (pressedBtn === 1) {
                // if (queryID === '') {
                history.push({
                    pathname: `/admin/ad-package`,
                    state: { data: 'added', name: nameState.name }
                });
                // } else {
                //     history.push({
                //         pathname: `/admin/ad-package`,
                //         state: {data: 'edited', name: nameState.name}
                //     });
                // }
            }
            else {
                setNameState({ name: '', helperText: 'Enter name Ex. Mobile', error: false });
                setPriceState({ name: '', helperText: 'Enter a price Ex. 5000', error: false });
                setTypeState({ name: '', helperText: 'Select a type Ex. Featured', error: false });
                setCategoryState({ name: '', obj: undefined, helperText: 'Enter name Ex. Electronic', error: false });
                setAmountOfAdsState({ name: '', helperText: 'Enter a number Ex. 150', error: false });
                setCheckboxes({ active: true });
                // queryID = '';
                history.push('/admin/ad-package/add');
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
                    <Form.Group as={Col} md={6} controlId="category">
                        <FormControl className={classes.formControl}>
                            <Autocomplete
                                id="combo-box-demo"
                                color="secondary"
                                options={categoriesArray}
                                getOptionLabel={(option) => option.name}
                                value={categoryState.obj ? categoryState.obj : null}
                                // style={{ width: 300 }}
                                renderInput={(params) => <TextField
                                    color="secondary"
                                    error={categoryState.error}
                                    onChange={changeCategoryState}
                                    onBlur={changeCategoryState}
                                    {...params} label="Category"
                                />
                                }
                            />
                            <FormHelperText error={categoryState.error} id="categoryState-helper">{categoryState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                </Row>
                <Row className={classes.rowGap}>
                    <Form.Group as={Col} md={6} controlId="name">
                        <FormControl className={classes.formControl}>
                            <InputLabel error={priceState.error} color="secondary" htmlFor="price">Price</InputLabel>
                            <Input
                                color="secondary"
                                autoComplete="none"
                                value={priceState.name}
                                type="text"
                                error={priceState.error}
                                id="price"
                                name="price"
                                onChange={changePriceState}
                                onBlur={changePriceState}
                                aria-describedby="price-helper"
                            />
                            <FormHelperText error={priceState.error} id="price-helper">{priceState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="type">
                        <FormControl className={classes.formControl}>
                            <InputLabel error={typeState.error} id="type">Type</InputLabel>
                            <Select
                                labelId="type"
                                id="type"
                                name="type"
                                value={typeState.name}
                                onChange={changeTypeState}
                                error={typeState.error}
                                onBlur={changeTypeState}
                                input={<Input />}
                                MenuProps={MenuProps}
                            >
                                <MenuItem value="">
                                    
                                </MenuItem>
                                <MenuItem value="Featured">
                                    Featured
                                </MenuItem>
                                <MenuItem value="To the Top">
                                    To the Top
                                </MenuItem>
                            </Select>
                            <FormHelperText error={typeState.error} id="type-helper">{typeState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                </Row>
                <Row className={classes.rowGap}>
                    <Form.Group as={Col} md={6} controlId="amountOfAds">
                        <FormControl className={classes.formControl}>
                            <InputLabel error={amountOfAdsState.error} color="secondary" htmlFor="amountOfAds">Amount of Ads</InputLabel>
                            <Input
                                color="secondary"
                                autoComplete="none"
                                value={amountOfAdsState.name}
                                type="text"
                                error={amountOfAdsState.error}
                                id="amountOfAds"
                                name="amountOfAds"
                                onChange={changeAmountOfAdsState}
                                onBlur={changeAmountOfAdsState}
                                aria-describedby="amountOfAds-helper"
                            />
                            <FormHelperText error={amountOfAdsState.error} id="amountOfAds-helper">{amountOfAdsState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                </Row>
                <Row className={classes.rowGap}>
                    <Form.Group as={Col} md={6} controlId="name">
                        <FormControlLabel
                            control={<Checkbox checked={checkboxes.active} onChange={ChangeActiveState} name="active" />}
                            label="Active"
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

export default adPackageObj;