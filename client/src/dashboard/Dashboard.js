import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Sidebar, DashboardSetup } from './components';
import { useHistory } from 'react-router';
// import api from '../api';
// import { YellowButton } from '../components';
import UserContext from './../contexts/userContext'
import {
    // BrowserRouter as Router,
    Switch as RouterSwitch,
    Route,
} from "react-router-dom";
import './Dashboard.scss'
import api from '../api';

function Dashboard(props) {
    const user = useContext(UserContext);
    const history = useHistory();
    const [startup, setStartup] = useState(null);


    useEffect(() => {
        if (!user.userState) history.push('/login');
    }, [history, user.userState]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${api}/startup/get-logged-in`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const content = await response.json();
            console.log(content.data);
            setStartup(content.data);
        })()
    }, []);

    // const logout = async (e, id) => {
    //     e.preventDefault();
    //     try {
    //         await fetch(`${api}/startup/logout`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         // history.push('/');
    //     } catch (error) {
    //         alert("Error logging out. Please contact support.")
    //     }
    // }
    return (
        // <Container className="user-dashboard text-center margin-global-top-2">
        //     Dashboard under construction, Please check back after a while. Sorry for the inconvenience.
        //     <Row className="margin-global-top-2">
        //         <YellowButton
        //             to="/"
        //             text="Sign Out"
        //             classes="text-uppercase width-high horizontal-center-relative"
        //             onClick={logout}
        //             id=""
        //         />
        //     </Row>
        // </Container>
        <Container className="user-dashboard" fluid>
            <Row>
                <Sidebar />
                <Col>
                    <RouterSwitch>
                        <Route path="/dashboard" children={
                            <DashboardSetup
                                startupName={startup.startupName}
                                startupDescription={startup.startupName}
                                logo={startup.startupName}
                                alignment={startup.startupName}
                                minPrice={startup.startupName}
                                maxPrice={startup.startupName}
                                webUrl={startup.startupName}
                                monday={startup.startupName}
                                tuesday={startup.startupName}
                                wednesday={startup.startupName}
                                thursday={startup.startupName}
                                friday={startup.startupName}
                                saturday={startup.startupName}
                                sunday={startup.startupName}
                                category={startup.startupName}
                                features={startup.startupName}
                                province={startup.startupName}
                                city={startup.startupName}
                                area={startup.startupName}
                                addressLine1={startup.startupName}
                                addressLine2={startup.startupName}
                                landmark={startup.startupName}
                                radios={startup.startupName}
                                provinceDS={startup.startupName}
                                cityDS={startup.startupName}
                                areaDS={startup.startupName}
                            />
                        } />
                        {/* <Route path="/dashboard/:model/add" children={<AdminForm />} />
                        <Route path="/dashboard/:model/delete" children={<DeleteConfirmation />} />
                        <Route path="/dashboard/:model" children={<EnhancedTable />} /> */}
                    </RouterSwitch>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;