import React from 'react';
import {
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import { MainNavbar, IconBanner, Footer } from './components';
import { Home, Signup, Login, Setup, Businesses, Business, PackageSelection, Premium, ForgotPassword } from './pages';
import Auth from './auth/Auth';
// import { ComingSoon } from './pages';
// import { Dashboard } from './dashboard';
// import CartContext from './contexts/cart';
// import DiscountContext from './contexts/discount';
// import api from './api';
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
//   import './App.scss';
import './form.scss';
import './global.scss';
import { Dashboard } from './dashboard';

function Routes(props) {
    //   const [cart, setCart] = useState({ data: {}, count: 0 });
    //   const [discountState, setDiscountState] = useState(null);
    //   const [navOptions, setNavOptions] = useState([]);
    //   const [mainNavOptions, setMainNavOptions] = useState([]);

    let location = useLocation();

    return (
        // <CartContext.Provider value={{ cartObj: cart, setCart: setCart }}>
        //   <DiscountContext.Provider value={discountState}>
        //     <SmallBanner />
        //     <div className="margin-global-top-1" />
        //     <SearchNavbar options={navOptions} />
        // {/* <div className="margin-global-top-1" /> */}
        <div>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    timeout={300}
                >
                    <div className="page">
                        <Switch location={location}>
                            <Route path="/__/auth/action">
                                <MainNavbar />
                                <Auth />
                            </Route>
                            <Route path="/dashboard/account">
                                <MainNavbar />
                                <Dashboard />
                            </Route>
                            <Route path="/:category/:startup">
                                <MainNavbar />
                                <Business />
                            </Route>
                            <Route path="/forgot-password">
                                <MainNavbar />
                                <ForgotPassword />
                            </Route>
                            <Route path="/premium">
                                <MainNavbar />
                                <Premium />
                            </Route>
                            <Route path="/packages">
                                <MainNavbar />
                                <PackageSelection />
                            </Route>
                            <Route path="/signup">
                                <MainNavbar />
                                <Signup />
                            </Route>
                            <Route path="/login">
                                <MainNavbar />
                                <Login />
                            </Route>
                            <Route path="/setup">
                                <MainNavbar />
                                <Setup
                                    title="Your Journey Starts Here!"
                                    edit={false}
                                />
                            </Route>
                            <Route path="/:category">
                                <MainNavbar />
                                <Businesses />
                            </Route>
                            <Route path="/">
                                <MainNavbar />
                                <Home />
                            </Route>
                        </Switch>
                        <div className="margin-global-top-8" />
                        <IconBanner />
                        <Footer />
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
        //   {/* </DiscountContext.Provider>
        // </CartContext.Provider> */}
    );
}

export default Routes;
