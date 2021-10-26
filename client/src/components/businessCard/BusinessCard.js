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
                    src={props.logo}
                    alt="Test"
                />
                <div className="business-card-chip">
                    {props.category}
                </div>
            </div>
            <div className="margin-global-top-1" />
            <div className="business-card-body">
                <BusinessTitle
                    text={props.startupName}
                    blue=""
                    classes="margin-bottom-0"
                    text2=""
                    to={props.slug}
                />
                <Rating size="medium" name="read-only" value={props.rating} readOnly />
            <div className="margin-global-top-1" />
                <YellowButton
                    to={props.slug}
                    text="View"
                    classes="text-uppercase small-yellow-button horizontal-center-relative"
                />
            </div>
            <div className="margin-global-top-1" />
        </div>
    );
}

export default BusinessCard;