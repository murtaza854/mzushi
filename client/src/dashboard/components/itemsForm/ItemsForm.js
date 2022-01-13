import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import api from '../../../api';
import { ClickButton, DescriptionText, Heading2 } from '../../../components';
import { gcd } from '../../../helperFunctions/gcd';

function ItemsForm(props) {


    const [name, setName] = useState({ text: '', errorText: '', error: false });
    const [price, setPrice] = useState({ text: '', errorText: '', error: false });
    const [logo, setLogo] = useState({ picturePreview: '', imgURl: '', error: false });

    const [disabledBtn, setDisabledBtn] = useState(true);

    const [message, setMessage] = useState({ display: false, text: '' });

    const handleName = event => {
        if (event.target.value === '') setName({ text: event.target.value, errorText: 'Name is required!', error: true });
        else setName({ text: event.target.value, errorText: '', error: false });
    }

    const handlePrice = event => {
        const minprice = /^\d*\.?\d*$/;
        if (event.target.value === '') setPrice({ text: event.target.value, errorText: 'Price is required!', error: true });
        else if (!event.target.value.match(minprice)) setPrice({ text: event.target.value, errorText: "Only numericals are allowed!", error: true });
        else setPrice({ text: event.target.value, errorText: '', error: false });
    }

    const onSubmit = async e => {
        e.preventDefault();
        setName({ text: '', errorText: '', error: false });
        setPrice({ text: '', errorText: '', error: false });
        setLogo({ picturePreview: '', imgURl: '', error: false });
        const formData = new FormData();
        formData.append(
            "image",
            // imageState.picturePreview
            logo.picturePreview
        );
        formData.append(
            "data",
            JSON.stringify({ name: name.text, price: price.text })
        );
        try {
            const response = await fetch(`${api}/startup/add-product-service`, {
                method: 'POST',
                headers: {
                    'Accept': 'multipart/form-data',
                    'Cache-Control': 'no-store'
                },
                body: formData
            });
            const content = await response.json();
            if (content.data) {
                setMessage({ display: true, text: 'Product/Service has been added successfully!' })
                setTimeout(() => {
                    setMessage({ display: false, text: '' });
                }, 5000);
            } else throw new Error("Error");
        } catch (error) {
            setMessage({ display: true, text: 'Error adding product/service, please contact support if this issue persists.' })
            setTimeout(() => {
                setMessage({ display: false, text: '' });
            }, 5000);
        }
    }
    const handleFileClick = _ => {
        document.getElementById('logo-upload').click();
    }
    const logoChange = event => {
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
                            setLogo(prevState => ({ ...prevState, picturePreview: event.target.files[0], imgURl: objectUrl, error: false }));
                        }
                        else {
                            setLogo({ picturePreview: '', imgURl: '', error: true });
                            alert("Please upload a landscape image.");
                        }
                    };
                });
            } else {
                setLogo({ picturePreview: '', imgURl: '', error: true });
                alert("Image is too large.")
            }
        }
    }

    useEffect(() => {
        let flag = true;
        if (logo.error === true) flag = true;
        else if (logo.imgURl === '') flag = true;
        else if (name.error === true) flag = true;
        else if (name.text.length === 0) flag = true;
        else if (price.error === true) flag = true;
        else if (price.text.length === 0) flag = true;
        else flag = false;
        setDisabledBtn(flag);
    }, [logo, name, price]);
    return (
        <Container className="dashboard-about box-shadow-dashboard" fluid>
            <Row>
                <Col>
                    <Heading2
                        text="Add new Product/Service"
                        classes="text-left"
                    />
                </Col>
            </Row>
            <Row>
                <Form onSubmit={onSubmit} className="form-style margin-global-top-1">
                    <input
                        type="password"
                        autoComplete="on"
                        value=""
                        style={{ display: 'none' }}
                        readOnly={true}
                    />
                    <Row className="justify-content-between">
                        <Form.Group className="form-group-right" as={Col} md={6} controlId="firstName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handleName}
                                onBlur={handleName}
                                value={name.text}
                            />
                            <div className="error-text">{name.errorText}</div>
                        </Form.Group>
                        <div className="margin-global-top-2 unhide-768" />
                        <Form.Group className="form-group-left" as={Col} md={6} controlId="lastName">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={handlePrice}
                                onBlur={handlePrice}
                                value={price.text}
                            />
                            <div className="error-text">{price.errorText}</div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-1" />
                    <Row className="justify-content-start">
                        <Col className="margin-global-top-2-xs" lg={6}>
                            <Form.Group controlId="Image">
                                <Form.Label className="bold-600">Image</Form.Label>
                                <div className="margin-global-top-1" />
                                <input onChange={logoChange} accept="image/*" type="file" id="logo-upload" style={{ display: 'none' }} />
                                <ClickButton
                                    text="Choose Here"
                                    onClick={handleFileClick}
                                    classes=""
                                />
                            </Form.Group>
                            {
                                logo.imgURl !== '' ? (
                                    <div>
                                        <div className="margin-global-top-2" />
                                        <img src={logo.imgURl} alt="Preview" />
                                    </div>
                                ) : null
                            }
                            {/* <div className="margin-global-top-2" />
                            <img
                                src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                                alt="Test"
                            /> */}
                        </Col>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-center">
                        <Button disabled={disabledBtn} type="submit">
                            Submit
                        </Button>
                    </Row>
                    {
                        message.display ? (
                            <Row className="margin-global-top-1">
                                <Col>
                                    <DescriptionText
                                        text={message.text}
                                        link=""
                                        to="/"
                                        classes="text-center"
                                    />
                                </Col>
                            </Row>
                        ) : null
                    }
                </Form>
            </Row>
        </Container>
    );
}

export default ItemsForm;