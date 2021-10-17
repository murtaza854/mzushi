import React, { useContext, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import api from '../../api';
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

    const onClick = async e => {
        try {
            const response = await fetch(`${api}/startup/mark-premium`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({ user: user.userState, mark: false })
            });
            const content = await response.json();
            if (content.data) history.push('/setup');
            else {
                alert("Error proceeding. Please contact support if issue persists.");
                e.preventDefault();
            }
        } catch (error) {
            alert("Error proceeding. Please contact support if issue persists.");
            e.preventDefault();
        }
    }

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
            {
                props.onClick ? (
                    <Link onClick={onClick} className="get-it-link" to={props.to}>Get it</Link>
                ) : (
                    <Link className="get-it-link" to={props.to}>Get it</Link>
                )
            }
        </div>
    );
}

export default Package;