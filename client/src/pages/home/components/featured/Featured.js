import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import api from '../../../../api';
import { Heading2, BigBox } from '../../../../components';

function Featured(props) {

    const handleSubmit = async e => {
        e.preventDefault();
    }

    useEffect(() => {
        (async () => {
            // const response = await fetch(`${api}/admin-user/login`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     credentials: 'include',
            //     withCredentials: true,
            // });
        })()
    }, [])


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
                    text1="Businesses"
                    size={4}
                    classes="text-center yellow-big-box big-box-fixed-size"
                    classes_p="center-absolute"
                    to="/directory"
                    img=""
                />
                <BigBox
                    text="Explore"
                    text1="More Categories"
                    size={4}
                    classes="text-center blue-big-box big-box-fixed-size"
                    classes_p="center-absolute"
                    to="/directory"
                    img=""
                />
            </Row>
            <div className="margin-global-top-1" />
            <Row className="justify-content-center">
                <BigBox
                    text="Restaurants"
                    text1=""
                    size={2}
                    classes="text-center big-box-fixed-size-small"
                    classes_p="center-absolute"
                    to="/directory"
                    img={
                        <img
                            src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                            alt="Test"
                        />
                    }
                />
                <BigBox
                    text="Plumbers"
                    text1=""
                    size={2}
                    classes="text-center big-box-fixed-size-small"
                    classes_p="center-absolute"
                    to="/directory"
                    img={
                        <img
                            src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                            alt="Test"
                        />
                    }
                />
                <BigBox
                    text="Carpenters"
                    text1=""
                    size={2}
                    classes="text-center big-box-fixed-size-small margin-global-top-1-xs"
                    classes_p="center-absolute"
                    to="/directory"
                    img={
                        <img
                            src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                            alt="Test"
                        />
                    }
                />
                <BigBox
                    text="Gardeners"
                    text1=""
                    size={2}
                    classes="text-center big-box-fixed-size-small margin-global-top-1-xs"
                    classes_p="center-absolute"
                    to="/directory"
                    img={
                        <img
                            src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                            alt="Test"
                        />
                    }
                />
            </Row>
        </Container>
    );
}

export default Featured;