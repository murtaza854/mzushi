import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Sidebar, DashboardSetup, ChangeEmail, ChangePassword, DashboardHome, OwnerInfo, Gallery, GalleryForm, PaymentHistory, DashboardPremium, Items, ItemsForm } from './components';
import { Setup } from '../pages';
import { useHistory } from 'react-router';
import api from '../api';
// import { YellowButton } from '../components';
import UserContext from './../contexts/userContext'
import {
    // BrowserRouter as Router,
    Switch as RouterSwitch,
    Route,
} from "react-router-dom";
import './Dashboard.scss'
import { GiHamburgerMenu } from 'react-icons/gi';

function Dashboard(props) {
    const user = useContext(UserContext);
    const history = useHistory();
    const [startup, setStartup] = useState(null);


    useEffect(() => {
        if (!user.userState) history.push('/login');
        else {
            if (!user.userState.accountSetup) history.push('/packages');
        }
    }, [history, user.userState]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${api}/startup/get-logged-in`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
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
    const openFilterPanel = _ => {
        document.getElementById('dashboard-sidebar').classList.remove('remove-dashboard-sidebar');
        document.getElementById('dashboard-sidebar').classList.add('active-dashboard-sidebar');
        // document.body.classList.add('disable-scroll');
    }

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
            <div className="margin-global-top-3" />
            <Row>
                <Sidebar provider={user.userState.provider} />
                <div className="unhide-1200 filter-icon-btn-container">
                    <div className="dash-icon-btn">
                        <GiHamburgerMenu className="dash-open-icon" onClick={openFilterPanel} />
                    </div>
                </div>
                <Col>
                    <RouterSwitch>
                        <Route path="/dashboard/account/items/add" children={
                            <ItemsForm />
                        } />
                        <Route path="/dashboard/account/gallery/add" children={
                            <GalleryForm
                                premium={startup.premium}
                                images={startup.images}
                            />
                        } />
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
                                    facebook={startup.facebookURL}
                                    instagram={startup.instagramURL}
                                    twitter={startup.twitterURL}
                                    youtube={startup.youtubeURL}
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
                                facebook={startup.facebookURL}
                                instagram={startup.instagramURL}
                                twitter={startup.twitterURL}
                                youtube={startup.youtubeURL}
                            />
                        } />
                        <Route path="/dashboard/account/change-email" children={
                            <ChangeEmail
                                email={startup.email}
                            />
                        } />
                        <Route path="/dashboard/account/change-password" children={
                            <ChangePassword />
                        } />
                        <Route path="/dashboard/account/owner-info" children={
                            <OwnerInfo
                                ownerFirstName={startup.ownerFirstName}
                                ownerLastName={startup.ownerLastName}
                                contactNumber={startup.contactNumber}
                            />
                        } />
                        <Route path="/dashboard/account/items" children={
                            <Items
                                productsServices={startup.productsServices}
                            />
                        } />
                        <Route path="/dashboard/account/gallery" children={
                            <Gallery
                                images={startup.images}
                            />
                        } />
                        <Route path="/dashboard/account/premium" children={
                            <DashboardPremium
                                premium={startup.premium}
                            />
                        } />
                        <Route path="/dashboard/account/payment-history" children={
                            <PaymentHistory
                            />
                        } />
                        <Route path="/dashboard/account" children={
                            <DashboardHome
                                startupName={startup.startupName}
                                ownerFirstName={startup.ownerFirstName}
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