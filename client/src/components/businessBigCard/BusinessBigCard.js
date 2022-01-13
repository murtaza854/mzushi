import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { BusinessTitle } from '..';
import Rating from '@material-ui/lab/Rating';
import { IoLocationOutline } from 'react-icons/io5'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FiCheck } from 'react-icons/fi'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import './BusinessBigCard.scss';
import { formatAMPM } from '../../helperFunctions/formatAMPM';

function BusinessBigCard(props) {
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
    return (
        <div className={`business-big-card ${props.classes}`}>
            <Row>
                <Col lg={3}>
                    <img
                        src={props.logo}
                        alt={props.startupName}
                    />
                </Col>
                <Col lg={9}>
                    <Row className="justify-content-between">
                        <BusinessTitle
                            text={props.startupName}
                            blue=""
                            classes="margin-bottom-0 fit-content"
                            text2=""
                            to={props.slug}
                        />
                        <div className="margin-global-top-1" />
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
                    <div className="margin-global-top-1" />
                    <div className="business-card-chip">
                        {props.category}
                    </div>
                    <div className="margin-global-top-06" />
                    <Rating size="medium" name="read-only" value={props.rating} readOnly />
                    <div className="margin-global-top-02" />
                    <div className="icon-text">
                        <IoLocationOutline className="icon center-relative-vertical" />
                        <p>{props.area}, {props.city}, {props.province}</p>
                    </div>
                    <div class="margin-global-top-06"></div>
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
                        {/* <Col xs={4} className="icon-text yellow">
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
                        </Col> */}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default BusinessBigCard;