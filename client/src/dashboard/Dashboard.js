import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Sidebar, DashboardSetup } from './components';
import { Setup } from '../pages';
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
    if (startup === null) return <div></div>;

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
                        <Route path="/dashboard/account/account-setup/edit" children={
                            <div className="box-shadow-dashboard">
                                <Setup
                                    title="Edit Business details"
                                    edit={true}
                                    startupName={startup.startupName}
                                    startupDescription={startup.description}
                                    logo={startup.logo}
                                    alignment={startup.moneyClass}
                                    minPrice={startup.minPrice}
                                    maxPrice={startup.maxPrice}
                                    webUrl={startup.website}
                                    activeDays={startup.activeDays}
                                    category={startup.category}
                                    features={startup.features}
                                    address={startup.address}
                                    radios={{ delivery: startup.delivery, service: startup.service }}
                                    provinceDS={startup.serviceProvinces}
                                    cityDS={startup.serviceCities}
                                    areaDS={startup.serviceAreas}
                                />
                            </div>
                        } />
                        <Route path="/dashboard/account/account-setup" children={
                            <DashboardSetup
                                startupName={startup.startupName}
                                startupDescription={startup.description}
                                logo={startup.logo}
                                alignment={startup.moneyClass}
                                minPrice={startup.minPrice}
                                maxPrice={startup.maxPrice}
                                webUrl={startup.website}
                                activeDays={startup.activeDays}
                                category={startup.category}
                                features={startup.features}
                                address={startup.address}
                                radios={{ delivery: startup.delivery, service: startup.service }}
                                provinceDS={startup.serviceProvinces}
                                cityDS={startup.serviceCities}
                                areaDS={startup.serviceAreas}
                            />
                        } />
                        {/* <Route path="/dashboard/:model/add" children={<AdminForm />} />
                        <Route path="/dashboard/:model/delete" children={<DeleteConfirmation />} />
                        <Route path="/dashboard/:model" children={<EnhancedTable />} /> */}
                    </RouterSwitch>
                </Col>
            </Row>
        </Container >
    );
}

export default Dashboard;