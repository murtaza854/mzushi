import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Heading1, Package } from '../../components';
import { AiOutlineClose } from 'react-icons/ai'
import { FiCheck } from 'react-icons/fi'
import './PackageSelection.scss';

function PackageSelection(props) {
    const features = [
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <FiCheck className="icon" /> },
        { text: 'Lorem Ipsum', icon: <AiOutlineClose className="icon" /> },
        { text: 'Lorem Ipsum', icon: <AiOutlineClose className="icon" /> },
        { text: 'Lorem Ipsum', icon: <AiOutlineClose className="icon" /> },
        { text: 'Lorem Ipsum', icon: <AiOutlineClose className="icon" /> },
        { text: 'Lorem Ipsum', icon: <AiOutlineClose className="icon" /> },
    ]
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
                    heading="PLAN A"
                    features={features}
                    price="00000"
                    classes=""
                />
                <Package
                    heading="PLAN A"
                    features={features}
                    price="00000"
                    classes=""
                />
            </Row>
        </Container>
    );
}

export default PackageSelection;