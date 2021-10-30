import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import api from '../../../api';
import { ClickButton, DescriptionText, Heading2 } from '../../../components';
import { gcd } from '../../../helperFunctions/gcd';

function GalleryForm(props) {

    const [logo, setLogo] = useState({ picturePreview: '', imgURl: '', error: false });

    const [disabledBtn, setDisabledBtn] = useState(true);

    const [message, setMessage] = useState({ display: false, text: '' });

    const onSubmit = async e => {
        e.preventDefault();
        setLogo({ picturePreview: '', imgURl: '', error: false });
        const formData = new FormData();
        formData.append(
            "image",
            // imageState.picturePreview
            logo.picturePreview
        );
        // console.log(logo.picturePreview);
        try {
            const response = await fetch(`${api}/startup/add-image`, {
                method: 'POST',
                headers: {
                    'Accept': 'multipart/form-data',
                    'Cache-Control': 'no-store'
                },
                body: formData
            });
            const content = await response.json();
            if (content.data) {
                setMessage({ display: true, text: 'Image has been added successfully!' })
                setTimeout(() => {
                    setMessage({ display: false, text: '' });
                }, 5000);
            } else throw new Error("Error");
        } catch (error) {
            setMessage({ display: true, text: 'Error adding image, please contact support if this issue persists.' })
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
                    setLogo(prevState => ({ ...prevState, picturePreview: event.target.files[0], imgURl: objectUrl, error: false }));
                    image.onload = function () {
                        // access image size here 
                        // console.log(this.width, this.height);
                        // console.log(gcd(this.width, this.height));
                        const w = this.width;
                        const h = this.height;
                        const r = gcd(w, h);
                        if (w / r > h / r) {
                            setLogo(prevState => ({ ...prevState, picturePreview: event.target.files[0], imgURl: objectUrl, error: false }));
                        }
                        else {
                            alert("Please upload a landscape image.");
                        }
                    };
                });
            } else {
                setLogo(prevState => ({ ...prevState, error: true }));
                alert("Image is too large.")
            }
        }
    }

    useEffect(() => {
        let flag = true;
        if (logo.error === true) flag = true;
        else if (logo.imgURl === '') flag = true;
        else flag = false;
        setDisabledBtn(flag);
    }, [logo]);
    return (
        <Container className="dashboard-about box-shadow-dashboard" fluid>
            <Row>
                <Col>
                    <Heading2
                        text="Add new Image"
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

export default GalleryForm;