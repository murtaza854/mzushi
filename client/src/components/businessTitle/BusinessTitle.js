import React from 'react';
import './BusinessTitle.scss';

function BusinessTitle(props) {
    return (
        <h2 className={`business-title ${props.classes}`}>
            {props.text} <span>{props.blue}</span> {props.text2}
        </h2>
    );
}

export default BusinessTitle;