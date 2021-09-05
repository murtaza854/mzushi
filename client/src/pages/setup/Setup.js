import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Heading1 } from '../../components';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import './Setup.scss';

function Setup(props) {
    const [alignment, setAlignment] = useState('left');
    const [categories, setCategories] = useState([]);
    const [features, setFeatures] = useState([]);

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    // useEffect(() => (
    //     async () => {
    //     }), []);

    useEffect(() => {
        setCategories([
            { _id: 0, name: 'Plumber', active: '' },
            { _id: 1, name: 'Plumber', active: '' },
            { _id: 2, name: 'Plumber', active: '' },
            { _id: 3, name: 'Plumber', active: '' },
            { _id: 4, name: 'Plumber', active: '' },
            { _id: 5, name: 'Plumber', active: '' },
            { _id: 6, name: 'Plumber', active: '' },
            { _id: 7, name: 'Plumber', active: '' },
            { _id: 8, name: 'Plumber', active: '' },
            { _id: 9, name: 'Plumber', active: '' },
            { _id: 10, name: 'Plumber', active: '' },
        ]);
    }, []);

    useEffect(() => {
        setFeatures([
            { _id: 0, name: 'Wifi', active: '' },
            { _id: 1, name: 'Wifi', active: '' },
            { _id: 2, name: 'Wifi', active: '' },
            { _id: 3, name: 'Wifi', active: '' },
            { _id: 4, name: 'Wifi', active: '' },
            { _id: 5, name: 'Wifi', active: '' },
            { _id: 6, name: 'Wifi', active: '' },
            { _id: 7, name: 'Wifi', active: '' },
            { _id: 8, name: 'Wifi', active: '' },
            { _id: 9, name: 'Wifi', active: '' },
            { _id: 10, name: 'Wifi', active: '' },
        ]);
    }, []);

    const handleCategory = id => {
        const newArray = [...categories];
        for (let i = 0; i < newArray.length; i++) {
            const element = newArray[i];
            if (element._id === id) newArray[i].active = 'active';
            else newArray[i].active = '';
        }
        setCategories(newArray);
    }

    const handleFeatures = id => {
        const newArray = [...features];
        for (let i = 0; i < newArray.length; i++) {
            const element = newArray[i];
            if (element._id === id) {
                if (element.active === 'active') newArray[i].active = '';
                else newArray[i].active = 'active';
            }
        }
        setFeatures(newArray);
    }

    return (
        <Container fluid className="setup">
            <div className="margin-global-top-5" />
            <Row>
                <Col>
                    <Heading1
                        text="Your Journey Starts Here!"
                        classes="text-center"
                    />
                </Col>
            </Row>
            <Row>
                <Form className="form-style margin-global-top-1">
                    <input
                        type="password"
                        autoComplete="on"
                        value=""
                        style={{ display: 'none' }}
                        readOnly={true}
                    />
                    <Row className="justify-content-between">
                        <Form.Group as={Col} md={6} controlId="firstName">
                            <Form.Label>Business Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-between">
                        <Form.Group as={Col} md={6} controlId="email">
                            <Form.Label>Business Description</Form.Label>
                            <textarea maxLength={1250} rows={7} />
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-4" />
                    <Row>
                        <Form.Group as={Col} md={6} controlId="email">
                            <ToggleButtonGroup
                                value={alignment}
                                size="small"
                                exclusive
                                onChange={handleAlignment}
                                aria-label="text alignment"
                            >
                                <ToggleButton disableRipple={true} value="left" aria-label="left aligned">
                                    $
                                </ToggleButton>
                                <ToggleButton disableRipple={true} className="square-toggle" value="center" aria-label="centered">
                                    $$
                                </ToggleButton>
                                <ToggleButton disableRipple={true} className="square-toggle" value="right" aria-label="right aligned">
                                    $$$
                                </ToggleButton>
                                <ToggleButton className="last-toggle" disableRipple={true} value="justify" aria-label="justified">
                                    $$$$
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-4" />
                    <Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>Add your Price Range</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md={3} controlId="firstName">
                            <Form.Label>Minimum Price</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group as={Col} md={3} controlId="firstName">
                            <Form.Label>Maximum Price</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>Have a Website? [Optional]</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md={6} controlId="firstName">
                            <Form.Label>Enter your URL</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-4" />
                    <Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>What Category does your Business fall in?</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md={8} controlId="firstName">
                            <Form.Label>Choose the Most Relevant Option</Form.Label>
                            <div className="form-yellow-buttons">
                                {
                                    categories.map((value, index) => {
                                        return (
                                            <div onClick={e => handleCategory(value._id)} key={index} className={`form-yellow-btn ${value.active}`}>
                                                {value.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-4" />
                    <Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>What Features does your Business offer?</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md={8} controlId="firstName">
                            <Form.Label>Choose the Option(s) that Apply</Form.Label>
                            <div className="form-yellow-buttons">
                                {
                                    features.map((value, index) => {
                                        return (
                                            <div onClick={e => handleFeatures(value._id)} key={index} className={`form-yellow-btn ${value.active}`}>
                                                {value.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-4" />
                    <Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>Business Address</Form.Label>
                        </Form.Group>
                    </Row>
                    <div className="margin-global-top-2" />
                    <Row className="justify-content-center">
                        <Button type="submit">
                            Submit
                        </Button>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
}

export default Setup;