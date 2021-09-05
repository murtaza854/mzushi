import React from 'react';
import './Heading2.scss';

function Heading2(props) {
    return (
        <h2 className={`heading-2 ${props.classes}`}>
            {props.text} <span>{props.blue}</span> {props.text2}
        </h2>
    );
}

export default Heading2;