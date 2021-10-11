import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BusinessTitle } from '..';
import Rating from '@material-ui/lab/Rating';
import { IoLocationOutline } from 'react-icons/io5'
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai'
import { FiCheck } from 'react-icons/fi'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import './BusinessBigCard.scss';

function BusinessBigCard(props) {
    const [alignment] = useState('left');
    return (
        <div className={`business-big-card ${props.classes}`}>
            <Row>
                <Col lg={3}>
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                </Col>
                <Col lg={9}>
                    <Row className="justify-content-between">
                        <BusinessTitle
                            text="Business Name"
                            blue=""
                            classes="margin-bottom-0 fit-content"
                            text2=""
                        />
                        <div className="margin-global-top-1" />
                        <ToggleButtonGroup
                            value={alignment}
                            size="small"
                            exclusive
                            onChange={_ => { }}
                            aria-label="text alignment"
                            className="fit-content"
                        >
                            <ToggleButton className="first-toggle" disableRipple={true} value="left" aria-label="left aligned">
                                <strong className="bold-900">$</strong>
                            </ToggleButton>
                            <ToggleButton disableRipple={true} className="square-toggle" value="center" aria-label="centered">
                                <strong className="bold-900">$$</strong>
                            </ToggleButton>
                            <ToggleButton disableRipple={true} className="square-toggle" value="right" aria-label="right aligned">
                                <strong className="bold-900">$$$</strong>
                            </ToggleButton>
                            <ToggleButton className="last-toggle" disableRipple={true} value="justify" aria-label="justified">
                                <strong className="bold-900">$$$$</strong>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                    <div className="margin-global-top-1" />
                    <div className="business-card-chip">
                        Category
                    </div>
                    <div className="margin-global-top-06" />
                    <Rating size="medium" name="read-only" value={3} readOnly />
                    <div className="margin-global-top-02" />
                    <div className="icon-text">
                        <IoLocationOutline className="icon" />
                        <p>Lorem Ipsum</p>
                    </div>
                    <div className="icon-text">
                        <AiOutlineClockCircle className="icon" />
                        <p>Today - 00:00 to 00:00</p>
                    </div>
                    <div className="margin-global-top-06" />
                    <Row>
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
                    </Row>
                    <Row>
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
                    </Row>
                    <Row>
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

export default BusinessBigCard;