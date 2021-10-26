import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import api from '../api';
import { YellowButton } from '../components';
import UserContext from './../contexts/userContext'

function Dashboard(props) {
    const user = useContext(UserContext);
    const history = useHistory();


    useEffect(() => {
        if (!user.userState) history.push('/login');
    }, [history, user.userState]);

    const logout = async (e, id) => {
        e.preventDefault();
        try {
            await fetch(`${api}/startup/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // history.push('/');
        } catch (error) {
            alert("Error logging out. Please contact support.")
        }
    }
    return (
        <Container className="user-dashboard text-center margin-global-top-2">
            Dashboard under construction, Please check back after a while. Sorry for the inconvenience.
            <Row className="margin-global-top-2">
                <YellowButton
                    to="/"
                    text="Sign Out"
                    classes="text-uppercase width-high horizontal-center-relative"
                    onClick={logout}
                    id=""
                />
            </Row>
        </Container>
    );
}

export default Dashboard;