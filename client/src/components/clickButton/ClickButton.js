import React from 'react';
import { Button } from 'react-bootstrap';
import './ClickButton.scss';

function ClickButton(props) {
    return (
        <Button type="button" onClick={props.onClick} className={`click-button ${props.classes}`}>
            {props.text}
        </Button>
    );
}

export default ClickButton;