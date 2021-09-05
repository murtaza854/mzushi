import React from 'react';
import {
    Link,
} from "react-router-dom";
import './TransparentButton.scss';

function TransparentButton(props) {
    return (
        <Link className={`transparent-button ${props.classes}`} to={props.to}>{props.text}</Link>
    );
}

export default TransparentButton;