import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import { IoLocationOutline } from 'react-icons/io5'
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai'
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
            // console.log(new Date(element.workingHourStart));
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
                        <ToggleButtonGroup
                            value={props.moneyClass}
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
                    </Row>
                    <div className="margin-global-top-06" />
                    <Rating size="medium" name="read-only" value={props.rating} readOnly />
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
                    <Row style={{display: 'none'}}>
                        <Col xs={4} className="icon-text yellow">
                            <FiCheck className="icon" />
                            <p>Lorem Ipsum</p>
                        </Col>
                        <Col xs={4} className="icon-text yellow">
                            <FiCheck className="icon" />
                            <p>Lorem Ipsum</p>
                        </Col>
                        <Col xs={4} className="icon-text yellow">
                            <AiOutlineClose className="icon" />
                            <p>Lorem Ipsum</p>
                        </Col>
                        <Col xs={4} className="icon-text yellow">
                            <FiCheck className="icon" />
                            <p>Lorem Ipsum</p>
                        </Col>
                        <Col xs={4} className="icon-text yellow">
                            <FiCheck className="icon" />
                            <p>Lorem Ipsum</p>
                        </Col>
                        <Col xs={4} className="icon-text yellow">
                            <AiOutlineClose className="icon" />
                            <p>Lorem Ipsum</p>
                        </Col>
                        <Col xs={4} className="icon-text yellow">
                            <FiCheck className="icon" />
                            <p>Lorem Ipsum</p>
                        </Col>
                        <Col xs={4} className="icon-text yellow">
                            <FiCheck className="icon" />
                            <p>Lorem Ipsum</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Details;