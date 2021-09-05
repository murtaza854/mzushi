import React from 'react';
import './Heading1.scss';

function Heading1(props) {
    return (
        <h1 className={`heading-1 ${props.classes}`}>
            {props.text}
        </h1>
    );
}

export default Heading1;