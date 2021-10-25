import React from 'react';
import { Link } from 'react-router-dom';
import './BusinessTitle.scss';

function BusinessTitle(props) {
    return (
        <Link to={props.to} className={`business-title ${props.classes}`}>
            <h2>
                {props.text} <span>{props.blue}</span> {props.text2}
            </h2>
        </Link>
    );
}

export default BusinessTitle;