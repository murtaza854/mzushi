import React from 'react';
// import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './BigBox.scss';

function BigBox(props) {
    return (
        <>
            {
                props.onClick ? (
                    <Link onClick={props.onClick} className={`big-box ${props.classes}`} to={props.to}>
                        <div>
                            {props.img}
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
                        </div>
                    </Link>
                ) : (
                    <Link className={`big-box ${props.classes}`} to={props.to}>
                        <div>
                            {props.img}
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
                        </div>
                    </Link>
                )
            }
        </>
    );
}

export default BigBox;