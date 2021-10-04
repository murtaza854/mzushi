import React from 'react';
import {
    Link,
} from "react-router-dom";
import './ButtonTab.scss';

function ButtonTab(props) {
    return (
        <Link className={`button-tab ${props.classes}`} to={props.to}>{props.text}</Link>
    );
}

export default ButtonTab;