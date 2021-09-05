import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Heading2, BigBox } from '../../../../components';

function Featured(props) {
    return (
        <Container>
            <div className="margin-global-top-5" />
            <Heading2
                text="Featured"
                blue="Categories"
                classes="text-center"
                text2=""
            />
            <div className="margin-global-top-1" />
            <Row className="justify-content-center">
                <BigBox
                    text="Female Run"
                    text1="Business"
                    size={4}
                    classes="text-center"
                    classes_p=""
                    to="/"
                />
                <div className="spacing"></div>
                <BigBox
                    text="Explore"
                    text1="More Categories"
                    size={4}
                    classes="text-center blue"
                    classes_p=""
                    to="/"
                />
            </Row>
            <div className="margin-global-top-1" />
            <Row className="justify-content-center">
                <BigBox
                    text="Female Run"
                    text1="Business"
                    size={2}
                    classes="text-center"
                    classes_p=""
                    to="/"
                />
                <div className="spacing-1"></div>
                <BigBox
                    text="Explore"
                    text1="More Categories"
                    size={2}
                    classes="text-center"
                    classes_p=""
                    to="/"
                />
                <div className="spacing-1"></div>
                <BigBox
                    text="Female Run"
                    text1="Business"
                    size={2}
                    classes="text-center"
                    classes_p=""
                    to="/"
                />
                <div className="spacing-1"></div>
                <BigBox
                    text="Explore"
                    text1="More Categories"
                    size={2}
                    classes="text-center"
                    classes_p=""
                    to="/"
                />
            </Row>
        </Container>
    );
}

export default Featured;