import { FormControl, Input, InputLabel, FormHelperText, Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../api';
import TreeItem from '@material-ui/lab/TreeItem';

const createTableData = (data) => {
    const { _id, name, productCategory } = data;
    const productCategoryName = productCategory.name
    const categoryName = productCategory.name
    return { _id, name, productCategoryName, categoryName };
}

const editObjCheck = (data, value, editObj) => {
    if (editObj) return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim() && obj.name !== editObj.name);
    else return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim())
}

const productSubCategoryObj = {
    apiTable: `${api}/product-sub-category/table-data`,
    deleteApi: [`${api}/product-sub-category/get-by-ids`, `${api}/product-sub-category/delete`],
    createTableData: createTableData,
    headCells: [
        // { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'productCategoryName', numeric: false, disablePadding: false, label: 'Product Category' },
        { id: 'categoryName', numeric: false, disablePadding: false, label: 'Category' },
    ],
    ManyChild: '',
    checkboxSelection: '_id',
    Delete: function (items) {
        let html = [];
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
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
    modelName: 'Product Sub Category',
    ordering: 'name',
    rightAllign: [],
    Form: function (id, classes) {
        let history = useHistory();

        let queryID = '';
        if (id != null) queryID = id;
        const [editObj, setEditObj] = useState(null);

        const [nameState, setNameState] = useState({ name: '', helperText: 'Enter name Ex. Samsung', error: false });
        const [productCategoryState, setProductCategoryState] = useState({ name: '', obj: undefined, helperText: 'Enter name Ex. Electronic', error: false });
        const [keywordsState, setKeywordsState] = useState({ name: '', helperText: 'Comma seperated keywords for SEO (2 - 3 words)' });
        const [descriptionState, setDescriptionState] = useState({ name: '', helperText: 'SEO description Ex. This product sub category is...' });

        const [productSubCategoriesArray, setProductSubCategoriesArray] = useState([]);
        const [productCategoriesArray, setProductCategoriesArray] = useState([]);
        const [isDisabled, setCanSubmit] = useState(true);
        const [pressedBtn, setPressedBtn] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            let flag = true;
            if (nameState.error === true) flag = true;
            else if (nameState.name.length === 0) flag = true;
            else if (productCategoryState.error === true) flag = true;
            else if (productCategoryState.name.length === 0) flag = true;
            else if (productCategoryState.obj === undefined) flag = true;
            else flag = false;
            setCanSubmit(flag);
        }, [nameState, productCategoryState]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/product-sub-category/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                        },
                    });
                    const content = await response.json();
                    const obj = content.data.find(o => o._id === queryID);
                    setEditObj(obj);
                    setProductSubCategoriesArray(content.data);
                    setLoading(false);
                })();
        }, [queryID]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/product-category/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                        },
                    });
                    const content = await response.json();
                    setProductCategoriesArray(content.data)
                })();
        }, []);

        useEffect(() => {
            if (editObj) {
                setNameState(prevState => ({ ...prevState, name: editObj.name }));
                setKeywordsState(prevState => ({ ...prevState, name: editObj.keywords }));
                setDescriptionState(prevState => ({ ...prevState, name: editObj.description }));
                setProductCategoryState(prevState => ({ ...prevState, name: editObj.name, obj: editObj.productCategory }));
            } else {
                setNameState(prevState => ({ ...prevState, name: '' }));
                setKeywordsState(prevState => ({ ...prevState, name: '' }));
                setDescriptionState(prevState => ({ ...prevState, name: '' }));
                setProductCategoryState(prevState => ({ ...prevState, name: '', obj: undefined }));
            }
        }, [editObj]);

        function changeNameState(event) {
            const { value } = event.target;
            setNameState(prevState => ({ ...prevState, name: value }));
            let obj = editObjCheck(productSubCategoriesArray, value, editObj);
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
        function changeProductCategoryState(event) {
            const { value } = event.target;
            const obj = productCategoriesArray.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim());
            setProductCategoryState(prevState => ({ ...prevState, name: value, obj: obj }));
            if (value === '') setProductCategoryState(prevState => ({ ...prevState, helperText: 'Sub category is required!', error: true }));
            else setProductCategoryState(prevState => ({ ...prevState, helperText: 'Enter name Ex. Electronic', error: false }));
        };

        const onSubmit = async e => {
            e.preventDefault();
            if (queryID === '') {
                await fetch(`${api}/product-sub-category/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                    body: JSON.stringify({ name: nameState.name, keywords: keywordsState.name, description: descriptionState.name, productCategory: productCategoryState.obj }),
                });
            } else {
                await fetch(`${api}/product-sub-category/update`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store'
                    },
                    body: JSON.stringify({ _id: queryID, name: nameState.name, keywords: keywordsState.name, description: descriptionState.name, productCategory: productCategoryState.obj }),
                });
            }
            if (pressedBtn === 1) {
                if (queryID === '') {
                    history.push({
                        pathname: `/admin/product-sub-category`,
                        state: { data: 'added', name: nameState.name }
                    });
                } else {
                    history.push({
                        pathname: `/admin/product-sub-category`,
                        state: { data: 'edited', name: nameState.name }
                    });
                }
            }
            else {
                setNameState({ name: '', helperText: 'Enter name Ex. Samsung', error: false });
                setKeywordsState({ name: '', helperText: 'Comma seperated keywords for SEO (2 - 3 words)' });
                setDescriptionState({ name: '', helperText: 'Enter description Ex. This product sub category is...' });
                setProductCategoryState({ name: '', obj: undefined, helperText: 'Enter name Ex. Electronic', error: false });
                history.push('/admin/product-sub-category/add');
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
                    <Form.Group as={Col} md={6} controlId="productCategory">
                        <FormControl className={classes.formControl}>
                            <Autocomplete
                                id="combo-box-demo"
                                color="secondary"
                                options={productCategoriesArray}
                                getOptionLabel={(option) => option.name}
                                value={productCategoryState.obj ? productCategoryState.obj : null}
                                // style={{ width: 300 }}
                                renderInput={(params) => <TextField
                                    color="secondary"
                                    error={productCategoryState.error}
                                    onChange={changeProductCategoryState}
                                    onBlur={changeProductCategoryState}
                                    {...params} label="Product category"
                                />
                                }
                            />
                            <FormHelperText error={productCategoryState.error} id="productCategoryState-helper">{productCategoryState.helperText}</FormHelperText>
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

export default productSubCategoryObj;