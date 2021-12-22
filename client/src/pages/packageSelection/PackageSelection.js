import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Heading1, Package } from '../../components';
import { AiOutlineClose } from 'react-icons/ai'
import { FiCheck } from 'react-icons/fi'
import './PackageSelection.scss';
import UserContext from '../../contexts/userContext';
import { useHistory } from 'react-router';

function PackageSelection(props) {
    const user = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (user.userState) {
            if (user.userState.accountSetup) history.push('/');
        }
    }, [history, user.userState]);
    const standard = [
        { text: 'Business listed', icon: <FiCheck className="icon" /> },
        { text: 'Business dashboard', icon: <FiCheck className="icon" /> },
        { text: 'Standard Listings', icon: <FiCheck className="icon" /> },
        { text: 'Upload upto 3 pictures', icon: <FiCheck className="icon" /> },
        { text: "Get featured on mzushi's growing social media platforms", icon: <AiOutlineClose className="icon" /> },
        { text: 'Sellers Blog', icon: <AiOutlineClose className="icon" /> },
    ];
    const features = [
        { text: 'Business listed', icon: <FiCheck className="icon" /> },
        { text: 'Business dashboard', icon: <FiCheck className="icon" /> },
        { text: 'Featured Listings', icon: <FiCheck className="icon" /> },
        { text: 'Upload upto 21 pictures', icon: <FiCheck className="icon" /> },
        { text: "Get featured on mzushi's growing social media platforms", icon: <FiCheck className="icon" /> },
        { text: 'Sellers Blog', icon: <FiCheck className="icon" /> },
    ];
    return (
        <Container>
            <div className="margin-global-top-5" />
            <Row>
                <Heading1
                    text="Choose Your Package"
                    classes="text-center text-uppercase bold-600"
                />
            </Row>
            <div className="margin-global-top-5" />
            <Row className="justify-content-center">
                <Package
                    heading="STANDARD"
                    features={standard}
                    price="0"
                    classes=""
                    to="/setup"
                    onClick={true}
                />
                <Package
                    heading="PREMIUM"
                    features={features}
                    price="250"
                    classes=""
                    to="/premium"
                    onClick={false}
                />
            </Row>
        </Container>
    );
}

export default PackageSelection;