import { FormControl, Input, InputLabel, FormHelperText, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../api';
import TreeItem from '@material-ui/lab/TreeItem';

const createTableData = (data) => {
    const { _id, name, category } = data;
    const categoryName = category.name
    return { _id, name, categoryName };
}

const editObjCheck = (data, value, editObj) => {
    if (editObj) return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim() && obj.name !== editObj.name);
    else return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim())
}

const productBrandObj = {
    apiTable: `${api}/product-brand/table-data`,
    deleteApi: [`${api}/product-brand/get-by-ids`, `${api}/product-brand/delete`],
    createTableData: createTableData,
    headCells: [
        // { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'categoryName', numeric: false, disablePadding: false, label: 'Category' },
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
                    {element.products.map((childValue, childIndex) => {
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
    modelName: 'Product Brand',
    ordering: 'name',
    rightAllign: [],
    Form: function (id, classes) {
        let history = useHistory();

        let queryID = '';
        if (id != null) queryID = id;
        const [editObj, setEditObj] = useState(null);

        const [nameState, setNameState] = useState({ name: '', helperText: 'Enter name Ex. Samsung', error: false });
        const [categoryState, setCategoryState] = useState({ name: '', obj: undefined, helperText: 'Enter name Ex. Electronic', error: false });
        const [keywordsState, setKeywordsState] = useState({ name: '', helperText: 'Comma seperated keywords for SEO (2 - 3 words)' });
        const [descriptionState, setDescriptionState] = useState({ name: '', helperText: 'SEO description Ex. This product brand is...' });

        const [productBrandsArray, setProductBrandsArray] = useState([]);
        const [categoriesArray, setCategoriesArray] = useState([]);
        const [isDisabled, setCanSubmit] = useState(true);
        const [pressedBtn, setPressedBtn] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            let flag = true;
            if (nameState.error === true) flag = true;
            else if (nameState.name.length === 0) flag = true;
            else if (categoryState.error === true) flag = true;
            else if (categoryState.obj === undefined) flag = true;
            else flag = false;
            setCanSubmit(flag);
        }, [nameState, categoryState]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/product-brand/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                          },
                    });
                    const content = await response.json();
                    const obj = content.data.find(o => o._id === queryID);
                    setEditObj(obj);
                    setProductBrandsArray(content.data);
                    setLoading(false);
                })();
        }, [queryID, isDisabled]);

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

        useEffect(() => {
            if (editObj) {
                setNameState(prevState => ({ ...prevState, name: editObj.name }));
                setKeywordsState(prevState => ({ ...prevState, name: editObj.keywords }));
                setDescriptionState(prevState => ({ ...prevState, name: editObj.description }));
                setCategoryState(prevState => ({ ...prevState, name: editObj.name, obj: editObj.category }));
            } else {
                setNameState(prevState => ({ ...prevState, name: '' }));
                setKeywordsState(prevState => ({ ...prevState, name: '' }));
                setDescriptionState(prevState => ({ ...prevState, name: '' }));
                setCategoryState(prevState => ({ ...prevState, name: '', obj: undefined }));
            }
        }, [editObj]);

        function changeNameState(event) {
            const { value } = event.target;
            setNameState(prevState => ({ ...prevState, name: value }));
            let obj = editObjCheck(productBrandsArray, value, editObj);
            if (obj) setNameState(prevState => ({ ...prevState, helperText: `${obj.name} already exists!`, error: true }));
            else if (value === '') setNameState(prevState => ({ ...prevState, helperText: 'Name is required!', error: true }));
            else setNameState(prevState => ({ ...prevState, helperText: 'Enter name Ex. Samsung', error: false }));
        };
        function changeKeywordsState(event) {
            const { value } = event.target;
            setKeywordsState(prevState => ({ ...prevState, name: value }));
        };
        function changeDescriptionState(event) {
            const { value } = event.target;
            setDescriptionState(prevState => ({ ...prevState, name: value }));
        };
        function changeCategoryState(event) {
            const { value } = event.target;
            const obj = categoriesArray.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim());
            setCategoryState(prevState => ({ ...prevState, name: value, obj: obj }));
            if (value === '') setCategoryState(prevState => ({ ...prevState, helperText: 'Category is required!', error: true }));
            else setCategoryState(prevState => ({ ...prevState, helperText: 'Enter name Ex. Electronic', error: false }));
        };

        const onSubmit = async e => {
            e.preventDefault();
            if (queryID === '') {
                await fetch(`${api}/product-brand/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                      },
                    body: JSON.stringify({ name: nameState.name, keywords: keywordsState.name, description: descriptionState.name, category: categoryState.obj }),
                });
            } else {
                await fetch(`${api}/product-brand/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                      },
                    body: JSON.stringify({ _id: queryID, name: nameState.name, keywords: keywordsState.name, description: descriptionState.name, category: categoryState.obj }),
                });
            }
            if (pressedBtn === 1) {
                history.push('/admin/product-brand');
            }
            else {
                setNameState({ name: '', helperText: 'Enter name Ex. Samsung', error: false });
                setKeywordsState({ name: '', helperText: 'Comma seperated keywords for SEO (2 - 3 words)' });
                setDescriptionState({ name: '', helperText: 'Enter description Ex. This product brand is...' });
                setCategoryState({ name: '', obj: undefined, helperText: 'Enter name Ex. Electronic', error: false });
                queryID = '';
                history.push('/admin/product-brand/add');
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
                    <Form.Group as={Col} md={6} controlId="keywords">
                        <FormControl className={classes.formControl}>
                            <InputLabel error={keywordsState.error} color="secondary" htmlFor="keywords">Keywords</InputLabel>
                            <Input
                                color="secondary"
                                autoComplete="none"
                                value={keywordsState.name}
                                type="text"
                                error={keywordsState.error}
                                id="keywords"
                                name="keywords"
                                onChange={changeKeywordsState}
                                onBlur={changeKeywordsState}
                                aria-describedby="keywords-helper"
                            />
                            <FormHelperText error={keywordsState.error} id="keywords-helper">{keywordsState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                </Row>
                <Row className={classes.rowGap}>
                    <Form.Group controlId="description">
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="description"
                                color="secondary"
                                autoComplete="none"
                                label="Description"
                                onChange={changeDescriptionState}
                                onBlur={changeDescriptionState}
                                multiline
                                rows={10}
                                error={descriptionState.error}
                                value={descriptionState.name}
                                aria-describedby="description-helper"
                            />
                            <FormHelperText id="description-helper">{descriptionState.helperText}</FormHelperText>
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

export default productBrandObj;