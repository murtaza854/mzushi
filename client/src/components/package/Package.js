import React, { useContext, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/userContext';
import './Package.scss'

function Package(props) {
    const user = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (user.userState) {
            if (user.userState.accountSetup) history.push('/');
        } else history.push('/login');
    }, [history, user.userState]);

    return (
        <div className={`package ${props.classes}`}>
            <h3 className="text-center">{props.heading}</h3>
            <div className="feature-list">
                {
                    props.features.map((value, index) => {
                        return (
                            <Row className="Justify-content-between icon-text" key={index}>
                                <Col xs={9}><p>{value.text}</p></Col>
                                <Col xs={2}>{value.icon}</Col>
                            </Row>
                        )
                    })
                }
            </div>
            <div className="margin-global-top-1" />
            <h3 className="text-center plan-price">PKR.{props.price}</h3>
            <Link className="get-it-link" to={props.to}>Get it</Link>
        </div>
    );
}

export default Package;