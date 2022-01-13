import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import { IoLocationOutline } from 'react-icons/io5'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FiCheck } from 'react-icons/fi'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import './Details.scss';
import { formatAMPM } from '../../../../helperFunctions/formatAMPM';

function Details(props) {
    const todayDate = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[todayDate.getDay()];
    const currentTime = todayDate.getTime();
    let displayTime = "";
    let classes = "";
    for (let i = 0; i < props.activeDays.length; i++) {
        const element = props.activeDays[i];
        if (dayName === element.name) {
            const startTime = new Date(element.workingHourStart);
            const endTime = new Date(element.workingHourEnd);
            if (startTime.getTime() < currentTime && endTime.getTime() > currentTime) {
                displayTime = `Today - ${formatAMPM(startTime)} to ${formatAMPM(endTime)}`;
                break;
            } else {
                displayTime = "Closed";
                classes = "closed-business";
            }
        } else {
            displayTime = "Closed";
            classes = "closed-business";
        }
    }
    if (props.activeDays.length === 0) {
        displayTime = "Closed";
        classes = "closed-business";
    }
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
    let website = "";
    if (props.website.includes("http")) {
        website = props.website;
    } else {
        website = `https://${props.website}`;
    }
    return (
        <div className="details">
            <Row className="justify-content-center">
                <Col md={11}>
                    <Row className="justify-content-between">
                        <Col md={5} className="business-card-chip-cont">
                            <div className="business-card-chip">
                                {props.category}
                            </div>
                        </Col>
                        <Col>
                            <Row>
                                <ToggleButtonGroup
                                    value={props.moneyClass}
                                    size="small"
                                    exclusive
                                    onChange={_ => { }}
                                    aria-label="text alignment"
                                    className="fit-content margin-left-auto"
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
                            </Row>
                            <Row>
                                <p className="content-read1 fit-content margin-left-auto">PKR {props.minPrice}/- to PKR {props.maxPrice}/-</p>
                            </Row>
                        </Col>
                    </Row>
                    <div className="margin-global-top-06" />
                    <Row>
                        <Col md={6}>
                            <Rating size="medium" name="read-only" value={props.rating} readOnly />
                            <p className="content-read">Click <a style={{ color: 'black' }} className="bold-600" href={website} target="_blank" rel="noreferrer">HERE</a> to head to {props.startupName} website.</p>
                            <div className="icon-text">
                                <IoLocationOutline className="icon center-relative-vertical" />
                                <p>{props.addressLine1}</p>
                                <p>{props.addressLine2}</p>
                                {
                                    props.landmark !== "" ? (
                                        <p>{props.landmark}, {props.area}</p>
                                    ) : (
                                        <p>{props.area}</p>
                                    )
                                }
                                <p>{props.city}, {props.province}</p>
                            </div>
                            <div className="margin-global-top-06" />
                            <div className="icon-text">
                                <AiOutlineClockCircle className={`icon ${classes}`} />
                                <p>{displayTime}</p>
                            </div>
                            <div className="margin-global-top-06" />
                            <Row>
                                {
                                    props.features.map((value, index) => {
                                        return (
                                            <Col key={index} xs={4} className="icon-text yellow">
                                                <FiCheck className="icon" />
                                                <p>{value.name}</p>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col className="margin-global-top-2-xs margin-left-auto" lg={10}>
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
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Details;