import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './BigBox.scss';

function BigBox(props) {
    return (
        <Col md={props.size} className={`big-box ${props.classes}`}>
            <Link to={props.to}>
                <p className={`${props.classes_p}`}>
                    <span>{props.text}</span>
                    {
                        props.text1 !== "" ? (
                            <>
                                <br />
                                <span>{props.text1}</span>
                            </>
                        ) : null
                    }
                </p>
            </Link>
        </Col>
    );
}

export default BigBox;