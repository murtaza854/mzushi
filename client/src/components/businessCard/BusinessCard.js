import React from 'react';
import Rating from '@material-ui/lab/Rating';
import './BusinessCard.scss';
import YellowButton from '../yellowButton/YellowButton';
import { BusinessTitle } from '..';

function BusinessCard(props) {
    return (
        <div className={`business-card ${props.classes}`}>
            <div className="business-card-head">
                <img
                    src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                    alt="Test"
                />
                <div className="business-card-chip">
                    Breakfast
                </div>
            </div>
            <div className="margin-global-top-1" />
            <div className="business-card-body">
                <BusinessTitle
                    text="Business Name"
                    blue=""
                    classes="margin-bottom-0"
                    text2=""
                />
                <Rating size="medium" name="read-only" value={3} readOnly />
            <div className="margin-global-top-1" />
                <YellowButton
                    to="/"
                    text="View"
                    classes="text-uppercase small-yellow-button horizontal-center-relative"
                />
            </div>
            <div className="margin-global-top-1" />
        </div>
    );
}

export default BusinessCard;