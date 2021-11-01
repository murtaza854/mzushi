import React from 'react';
import {
    Link,
} from "react-router-dom";
import './ButtonTab.scss';

function ButtonTab(props) {
    return (
        <>
            {
                props.onClick ? (
                    <Link onClick={e => props.onClick(e, props.section)} className={`button-tab ${props.classes}`} to={props.to}>{props.text}</Link>
                ) : (
                    <Link className={`button-tab ${props.classes}`} to={props.to}>{props.text}</Link>
                )
            }
        </>
    );
}

export default ButtonTab;