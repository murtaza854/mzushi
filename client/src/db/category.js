import { FormControl, Input, InputLabel, FormHelperText, Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import api from '../api';
import TreeItem from '@material-ui/lab/TreeItem';

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer)); bytes.forEach((b) => binary += String.fromCharCode(b)); return window.btoa(binary);
};

const createTableData = (data) => {
    const { _id, name, featured } = data;
    const base64Flag = `data:${data.image.contentType};base64,`;
    const imagePath = base64Flag + arrayBufferToBase64(data.image.data.data);
    return { _id, name, featured, imagePath };
}

function gcd(a, b) {
    return (b === 0) ? a : gcd(b, a % b);
}
// if b == 0:
//     return a
// return gcd (b, a mod b)

const editObjCheck = (data, value, editObj) => {
    if (editObj) return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim() && obj.name !== editObj.name);
    else return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim())
}

const categoryObj = {
    apiTable: `${api}/category/table-data`,
    deleteApi: [`${api}/category/get-by-ids`, `${api}/category/delete`],
    createTableData: createTableData,
    headCells: [
        // { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'featured', numeric: false, disablePadding: false, label: 'Featured' },
        { id: 'imagePath', numeric: false, disablePadding: false, label: 'Image' },
    ],
    ManyChild: '',
    checkboxSelection: '_id',
    Delete: function (items) {
        let html = [];
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            html.push(
                <TreeItem key={i} nodeId={`${element._id}`} label={element.name}>
                    {element.adPackages.map((childValue, childIndex) => {
                        return <TreeItem key={childIndex} nodeId={`${childValue._id}`} label={childValue.name} />
                    })}
                    {element.productBrands.map((childValue, childIndex) => {
                        return <TreeItem key={childIndex} nodeId={`${childValue._id}`} label={childValue.name} >
                            {childValue.products.map((subChildValue, subChildIndex) => {
                                return <TreeItem key={subChildIndex} nodeId={`${subChildValue._id}`} label={subChildValue.name} />
                            })}
                        </TreeItem>
                    })}
                    {element.productCategories.map((childValue, childIndex) => {
                        return <TreeItem key={childIndex} nodeId={`${childValue._id}`} label={childValue.name} >
                            {childValue.productSubCategories.map((subChildValue, subChildIndex) => {
                                return <TreeItem key={subChildIndex} nodeId={`${subChildValue._id}`} label={subChildValue.name} >
                                    {subChildValue.products.map((subSubChildValue, subSubChildIndex) => {
                                        return <TreeItem key={subSubChildIndex} nodeId={`${subSubChildValue._id}`} label={subSubChildValue.name} />
                                    })}
                                </TreeItem>
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
    modelName: 'Category',
    ordering: 'name',
    rightAllign: [],
    Form: function (id, classes) {
        let history = useHistory();

        let queryID = '';
        if (id != null) queryID = id;
        const [editObj, setEditObj] = useState(null);

        const [nameState, setNameState] = useState({ name: '', helperText: 'Enter name Ex. Electronic', error: false });
        const [image, setImage] = useState({ picturePreview: '', imgURl: '', error: false });
        const [keywordsState, setKeywordsState] = useState({ name: '', helperText: 'Comma seperated keywords for SEO (2 - 3 words)' });
        const [descriptionState, setDescriptionState] = useState({ name: '', helperText: 'SEO description Ex. This category is...' });
        const [checkboxes, setCheckboxes] = useState({ featured: false });

        const [categoriesArray, setCategoriesArray] = useState([]);
        const [isDisabled, setCanSubmit] = useState(true);
        const [pressedBtn, setPressedBtn] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            let flag = true;
            if (nameState.error === true) flag = true;
            else if (nameState.name.length === 0) flag = true;
            else if (image.imgURl === '') flag = true;
            else if (image.error === true) flag = true;
            else flag = false;
            setCanSubmit(flag);
        }, [nameState, image]);

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
                    const obj = content.data.find(o => o._id === queryID);
                    setEditObj(obj);
                    setCategoriesArray(content.data)
                    setLoading(false);
                })();
        }, [queryID, isDisabled]);

        useEffect(() => {
            if (editObj) {
                setNameState(prevState => ({ ...prevState, name: editObj.name }));
                setKeywordsState(prevState => ({ ...prevState, name: editObj.keywords }));
                setDescriptionState(prevState => ({ ...prevState, name: editObj.description }));
                setCheckboxes({ featured: editObj.featured });
            } else {
                setNameState(prevState => ({ ...prevState, name: '' }));
                setKeywordsState(prevState => ({ ...prevState, name: '' }));
                setDescriptionState(prevState => ({ ...prevState, name: '' }));
                setCheckboxes({ featured: false });
            }
        }, [editObj]);

        function changeNameState(event) {
            const { value } = event.target;
            setNameState(prevState => ({ ...prevState, name: value }));
            let obj = editObjCheck(categoriesArray, value, editObj);
            if (obj) setNameState(prevState => ({ ...prevState, helperText: `${obj.name} already exists!`, error: true }));
            else if (value === '') setNameState(prevState => ({ ...prevState, helperText: 'Name is required!', error: true }));
            else setNameState(prevState => ({ ...prevState, helperText: 'Enter name Ex. Electronic', error: false }));
        };
        function changeKeywordsState(event) {
            const { value } = event.target;
            setKeywordsState(prevState => ({ ...prevState, name: value }));
        };
        function changeDescriptionState(event) {
            const { value } = event.target;
            setDescriptionState(prevState => ({ ...prevState, name: value }));
        };
        function changeFeatured(event) {
            setCheckboxes(prevState => ({ ...prevState, featured: !checkboxes.featured }));
        };

        const imageChange = event => {
            let reader = new FileReader();
            if (event.target.files && event.target.files[0]) {
                if (event.target.files[0].size / 1024 < 300) {
                    reader.readAsDataURL(event.target.files[0]);
                    const objectUrl = URL.createObjectURL(event.target.files[0]);
                    reader.onload = ((theFile) => {
                        var image = new Image();
                        image.src = theFile.target.result;

                        image.onload = function () {
                            // access image size here 
                            const w = this.width;
                            const h = this.height;
                            const r = gcd(w, h);
                            if (w / r > h / r) {
                                setImage(prevState => ({ ...prevState, picturePreview: event.target.files[0], imgURl: objectUrl, error: false }));
                            }
                            else {
                                alert("Please upload a landscape image.");
                            }
                        };
                    });
                } else {
                    alert("Size too large");
                }
            }
        }

        const onSubmit = async e => {
            e.preventDefault();
            const formData = new FormData();
            if (queryID === '') {
                formData.append(
                    "image",
                    // imageState.picturePreview
                    image.picturePreview
                );
                formData.append(
                    "data",
                    // imageState.picturePreview
                    JSON.stringify({ name: nameState.name, keywords: keywordsState.name, description: descriptionState.name, featured: checkboxes.featured })
                );
                await fetch(`${api}/category/add`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'multipart/form-data',
                        'Cache-Control': 'no-store'
                    },
                    body: formData,
                });
            } else {
                formData.append(
                    "image",
                    // imageState.picturePreview
                    image.picturePreview
                );
                formData.append(
                    "data",
                    // imageState.picturePreview
                    JSON.stringify({ _id: queryID, name: nameState.name, keywords: keywordsState.name, description: descriptionState.name, featured: checkboxes.featured })
                );
                await fetch(`${api}/category/update`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'multipart/form-data',
                        'Cache-Control': 'no-store'
                    },
                    body: formData,
                });
            }
            if (pressedBtn === 1) {
                history.push('/admin/category');
            }
            else {
                setNameState({ name: '', helperText: 'Enter name Ex. Electronic', error: false });
                setImage({ picturePreview: '', imgURl: '', error: false });
                setKeywordsState({ name: '', helperText: 'Comma seperated keywords for SEO (2 - 3 words)' });
                setDescriptionState({ name: '', helperText: 'Enter description Ex. This category is...' });
                queryID = '';
                history.push('/admin/category/add');
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
                <Row className={classes.rowGap}>
                    <Form.Group as={Col} md={6} controlId="name">
                        <FormControlLabel
                            control={<Checkbox checked={checkboxes.featured} onChange={changeFeatured} name="featured" />}
                            label="Featured"
                        />
                    </Form.Group>
                </Row>
            </fieldset>
            <fieldset>
                <legend>Image</legend>
                <Row>
                    <Form.Group as={Col} md={1} controlId="image">
                        <FormControl className={classes.formControl}>
                            <label htmlFor="icon-button-file">
                                <Input onChange={imageChange} style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </FormControl>
                    </Form.Group>
                    {
                        image.imgURl !== '' ? (
                            <div>
                                <div className="margin-global-top-2" />
                                <img style={{ width: '30rem' }} src={image.imgURl} alt="Preview" />
                                <div className="margin-global-top-1" />
                            </div>
                        ) : null
                    }
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

export default categoryObj;