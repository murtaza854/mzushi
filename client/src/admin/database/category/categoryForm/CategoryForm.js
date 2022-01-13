import { FormControl, InputLabel, Typography, Input, FormControlLabel, Checkbox, FormHelperText, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import api from '../../../../api';

function gcd(a, b) {
    return (b === 0) ? a : gcd(b, a % b);
}

function checkIfObjExistsByName(obj, name, id) {
    if (id) {
        return obj.find(o => o.name.toLowerCase() === name.toLowerCase() && o.id !== id);
    } else {
        return obj.find(o => o.name.toLowerCase() === name.toLowerCase());
    }
}

function CategoryForm(props) {
    const {
        rows,
    } = props;
    const id = useParams().id || null;

    const [name, setName] = useState({ value: '', error: false, helperText: 'Enter a name Ex. Candles' });
    const [image, setImage] = useState({ picturePreview: '', imgURl: '', error: false });
    const [checkBoxes, setCheckBoxes] = useState({ active: true, featured: false });

    const [oldFileName, setOldFileName] = useState('');

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        (
            async () => {
                if (id) {
                    const response = await fetch(`${api}/category/getById`, {
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
                        setName({ value: data.name, error: false, helperText: 'Enter a name Ex. Candles' });
                        setImage({ picturePreview: '', imgURl: data.image.filePath, error: false });
                        setCheckBoxes({ active: data.active, featured: data.featured });
                        setDisabled(false);
                        setOldFileName(data.image.fileName);
                    } else {
                        window.location.href = window.location.href.split('/admin')[0] + '/admin/category';
                    }
                }
            })();
    }, [id]);

    useEffect(() => {
        let flag = true;
        if (name.error === true) flag = true;
        else if (name.value.length === 0) flag = true;
        else if (image.imgURl === '') flag = true;
        else if (image.error === true) flag = true;
        else flag = false;
        setDisabled(flag);
    }, [name, image]);

    const handleNameChange = (event) => {
        if (event.target.value.length === 0) {
            setName({ value: event.target.value, error: true, helperText: 'Name is required!' });
        } else if (checkIfObjExistsByName(rows, event.target.value, id)) {
            setName({ value: event.target.value, error: true, helperText: 'Category already exists!' });
        } else {
            setName({ value: event.target.value, error: false, helperText: 'Enter a name Ex. Candles' });
        }
    }

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
                alert("Size too large. Must be below 300kb.");
            }
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
        const formData = new FormData();
        formData.append(
            'data',
            JSON.stringify({
                name: name.value,
                active: checkBoxes.active,
                featured: checkBoxes.featured,
            })
        );
        formData.append('image', image.picturePreview);
        const response = await fetch(`${api}/category/add`, {
            method: 'POST',
            headers: {
                'Accept': 'multipart/form-data',
                'Cache-Control': 'no-store'
            },
            body: formData,
        });
        const content = await response.json();
        if (content.data) {
            window.location.href = window.location.href.split('/admin')[0] + '/admin/category';
        } else {
            alert("Something went wrong.");
        }
    }

    const handleSubmitEdit = async event => {
        event.preventDefault();
        if (image.picturePreview === '') {
            const response = await fetch(`${api}/category/updateWithoutImage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                },
                body: JSON.stringify({
                    id: id,
                    name: name.value,
                    active: checkBoxes.active,
                    featured: checkBoxes.featured,
                })
            });
            const content = await response.json();
            if (content.data) {
                window.location.href = window.location.href.split('/admin')[0] + '/admin/category';
            } else {
                alert("Something went wrong.");
            }
        } else {
            const formData = new FormData();
            formData.append(
                'data',
                JSON.stringify({
                    id: id,
                    name: name.value,
                    active: checkBoxes.active,
                    featured: checkBoxes.featured,
                    oldFileName
                })
            );
            formData.append('image', image.picturePreview);
            const response = await fetch(`${api}/category/updateWithImage`, {
                method: 'POST',
                headers: {
                    'Accept': 'multipart/form-data',
                    'Cache-Control': 'no-store'
                },
                body: formData,
            });
            const content = await response.json();
            if (content.data) {
                window.location.href = window.location.href.split('/admin')[0] + '/admin/category';
            } else {
                alert("Something went wrong.");
            }
        }
    }

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
                        Category
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
                    <Col md={6}>
                        <label htmlFor="image">
                            <Input onChange={imageChange} hidden accept="image/*" id="image" type="file" />
                            <Button type="button" variant="contained" component="span">
                                Upload
                            </Button>
                        </label>
                    </Col>
                </Row>
                {
                    image.imgURl !== '' ? (
                        <Row>
                            <div className="margin-global-top-2" />
                            <img style={{ width: '30rem' }} src={image.imgURl} alt="Preview" />
                            <div className="margin-global-top-1" />
                        </Row>
                    ) : null
                }
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

export default CategoryForm;