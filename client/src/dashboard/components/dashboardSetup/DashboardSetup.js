import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { arrayBufferToBase64 } from '../../../helperFunctions/arrayBufferToBase64';
import { formatAMPM } from '../../../helperFunctions/formatAMPM';
import { BiPencil } from 'react-icons/bi';
import './DashboardSetup.scss';
import { Link } from 'react-router-dom';

function DashboardSetup(props) {
    const base64Flag = `data:${props.logo.contentType};base64,`;
    const imagePath = base64Flag + arrayBufferToBase64(props.logo.data.data);
    const activeDaysJSON = [
        { name: 'Monday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Tuesday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Wednesday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Thursday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Friday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Saturday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
        { name: 'Sunday', workingHourStart: 'Closed', workingHourEnd: 'Closed' },
    ];
    props.activeDays.forEach(element => {
        const daytime = activeDaysJSON.find(e => e.name === element.name);
        const startTime = new Date(element.workingHourStart);
        const endTime = new Date(element.workingHourEnd);
        daytime.workingHourStart = formatAMPM(startTime);
        daytime.workingHourEnd = formatAMPM(endTime);
    });
    const featuresString = props.features.map(function (elem) {
        return elem.name;
    }).join(", ");
    let provincesString = props.provinceDS.map(function (elem) {
        return elem.name;
    }).join(", ");
    if (props.provinceDS.length === 0) provincesString = 'Not provided';

    let citiesString = props.cityDS.map(function (elem) {
        return elem.name;
    }).join(", ");
    if (props.cityDS.length === 0) citiesString = 'Not provided';

    let areasString = props.areaDS.map(function (elem) {
        return elem.name;
    }).join(", ");
    if (props.areaDS.length === 0) areasString = 'Not provided';

    return (
        <Container className="dashboard-about box-shadow-dashboard" fluid>
            <Row>
                <Link className="icon-link" to="/dashboard/account/account-setup/edit">
                    <BiPencil className="icon" />
                </Link>
            </Row>
            <Form className="form-style margin-global-top-1">
                <Row>
                    <Col md={7}>
                        <Row>
                            <Form.Group>
                                <Form.Label className="bold-600">Business Name</Form.Label>
                                <p className="content-read">{props.startupName}</p>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label className="bold-600">Business Description</Form.Label>
                                <p className="content-read">{props.startupDescription}</p>
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label className="bold-600">Business Poster</Form.Label>
                            <img src={imagePath} alt={props.startupName} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Row>
                            <Form.Group>
                                <Form.Label className="bold-600">Criteria</Form.Label>
                                <ToggleButtonGroup
                                    value={props.alignment}
                                    name="moneyClass"
                                    size="small"
                                    exclusive
                                    onChange={_ => { }}
                                    aria-label="text alignment"
                                    className="fit-content"
                                >
                                    <ToggleButton className="first-toggle" disableRipple={true} value="one" aria-label="left aligned">
                                        <strong className="bold-900">$</strong>
                                    </ToggleButton>
                                    <ToggleButton disableRipple={true} className="square-toggle" value="two" aria-label="centered">
                                        <strong className="bold-900">$$</strong>
                                    </ToggleButton>
                                    <ToggleButton disableRipple={true} className="square-toggle" value="three" aria-label="right aligned">
                                        <strong className="bold-900">$$$</strong>
                                    </ToggleButton>
                                    <ToggleButton className="last-toggle" disableRipple={true} value="four" aria-label="justified">
                                        <strong className="bold-900">$$$$</strong>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>
                        </Row>
                        <div className="margin-global-top-1" />
                        <Row>
                            <Form.Group>
                                <Form.Label className="bold-600">Add your Price Range</Form.Label>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} xs={6} controlId="firstName">
                                <Form.Label>Minimum Price</Form.Label>
                                <p className="content-read">PKR {props.minPrice}/-</p>
                            </Form.Group>
                            <Form.Group as={Col} xs={6} controlId="firstName">
                                <Form.Label>Maximum Price</Form.Label>
                                <p className="content-read">PKR {props.maxPrice}/-</p>
                            </Form.Group>
                        </Row>
                        <div className="margin-global-top-1" />
                        <Row>
                            <Form.Group controlId="firstName">
                                <Form.Label className="bold-600">Website</Form.Label>
                                <p className="content-read">{props.webUrl}</p>
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col className="margin-global-top-2-xs" lg={6}>
                        <Row>
                            <Form.Label className="bold-600">Operational Days & Timings</Form.Label>
                        </Row>
                        <Row>
                            <Col className="datetime-col-xs" xs={3} />
                            <Col xs={4}>
                                <Form.Label className="bold-600 text-center">Starting Time</Form.Label>
                            </Col>
                            <Col xs={4}>
                                <Form.Label className="bold-600 text-center">Ending Time</Form.Label>
                            </Col>
                        </Row>
                        {
                            activeDaysJSON.map((value, index) => {
                                let html = '';
                                if (value.workingHourStart === 'Closed') {
                                    html = <Form.Group className="less-padding text-center" as={Col} xs={8}>
                                        Closed
                                    </Form.Group>
                                } else {
                                    html = <>
                                        <Form.Group className="less-padding text-center" as={Col} xs={4}>
                                            {value.workingHourStart}
                                        </Form.Group>
                                        <Form.Group className="less-padding text-center" as={Col} xs={4}>
                                            {value.workingHourEnd}
                                        </Form.Group>
                                    </>
                                }
                                return (
                                    <Row key={index}>
                                        <Form.Group className="datetime-col-xs" as={Col} xs={3}>
                                            <Form.Label className="text-center">{value.name}</Form.Label>
                                        </Form.Group>
                                        {html}
                                    </Row>
                                )
                            })
                        }
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Col lg={6}>
                        <Form.Group>
                            <Form.Label className="bold-600">Category</Form.Label>
                            <p className="content-read">{props.category.name}</p>
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group as={Col}>
                            <Form.Label className="bold-600">Features</Form.Label>
                            <p className="content-read">{featuresString}</p>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label className="bold-600">Business Address</Form.Label>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>Province</Form.Label>
                        <p className="content-read">{props.address.area.city.province.name}</p>
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>Address Line 1</Form.Label>
                        <p className="content-read">{props.address.addressLine1}</p>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>City</Form.Label>
                        <p className="content-read">{props.address.area.city.name}</p>
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>Address Line 2</Form.Label>
                        {
                            props.address.addressLine2 === '' ? (
                                <p className="content-read">Not provided</p>
                            ) : (
                                <p className="content-read">{props.address.addressLine2}</p>
                            )
                        }
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>Area</Form.Label>
                        <p className="content-read">{props.address.area.name}</p>
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label>Nearest Landmark</Form.Label>
                        {
                            props.address.landmark === '' ? (
                                <p className="content-read">Not provided</p>
                            ) : (
                                <p className="content-read">{props.address.landmark}</p>
                            )
                        }
                    </Form.Group>
                </Row>
                <div className="margin-global-top-1" />
                <Row>
                    {
                        props.radios.service ? (
                            <Form.Group as={Col}>
                                <Form.Label className="bold-600">Service Provinces</Form.Label>
                                <p className="content-read">{provincesString}</p>
                            </Form.Group>
                        ) : (
                            <Form.Group as={Col}>
                                <Form.Label className="bold-600">Delivery Provinces</Form.Label>
                                <p className="content-read">{provincesString}</p>
                            </Form.Group>
                        )
                    }
                </Row>
                <Row>
                    {
                        props.radios.service ? (
                            <Form.Group as={Col}>
                                <Form.Label className="bold-600">Service Cities</Form.Label>
                                <p className="content-read">{citiesString}</p>
                            </Form.Group>
                        ) : (
                            <Form.Group as={Col}>
                                <Form.Label className="bold-600">Delivery Cities</Form.Label>
                                <p className="content-read">{citiesString}</p>
                            </Form.Group>
                        )
                    }
                </Row>
                <Row>
                    {
                        props.radios.service ? (
                            <Form.Group as={Col}>
                                <Form.Label className="bold-600">Service Areas</Form.Label>
                                <p className="content-read">{areasString}</p>
                            </Form.Group>
                        ) : (
                            <Form.Group as={Col}>
                                <Form.Label className="bold-600">Delivery Areas</Form.Label>
                                <p className="content-read">{areasString}</p>
                            </Form.Group>
                        )
                    }
                </Row>
            </Form>
        </Container>
    );
}

export default DashboardSetup;