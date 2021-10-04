import React from 'react';
import './Heading3.scss';

function Heading3(props) {
    return (
        <h2 className={`heading-3 ${props.classes}`}>
            {props.text} <span>{props.blue}</span> {props.text2}
        </h2>
    );
}

export default Heading3;