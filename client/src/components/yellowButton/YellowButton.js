import React from 'react';
import {
    Link,
} from "react-router-dom";
import './YellowButton.scss';

function YellowButton(props) {
    return (
        <>
            {
                props.onClick ? (
                    <Link onClick={e => props.onClick(e, props.id)} className={`yellow-button ${props.classes}`} to={props.to}>{props.text}</Link>
                ) : (
                    <Link className={`yellow-button ${props.classes}`} to={props.to}>{props.text}</Link>
                )
            }
        </>
        // <Link className={`yellow-button ${props.classes}`} to={props.to}>{props.text}</Link>
    );
}

export default YellowButton;