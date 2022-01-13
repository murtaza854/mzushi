import React from 'react';
import { Link } from 'react-router-dom';
import './DescriptionText.scss';

function DescriptionText(props) {
    return (
        <p className={`description-text ${props.classes}`}>
            {props.text} <Link rel={props.rel} to={props.to}>{props.link}</Link> {props.text1}
        </p>
    );
}

export default DescriptionText;