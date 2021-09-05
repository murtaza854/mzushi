import React from 'react';
import {
    Link,
} from "react-router-dom";
import './YellowButton.scss';

function YellowButton(props) {
    return (
        <Link className={`yellow-button ${props.classes}`} to={props.to}>{props.text}</Link>
    );
}

export default YellowButton;