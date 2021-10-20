import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import api from '../../../../api';
import { Heading2, BigBox } from '../../../../components';
import './Featured.scss'

function Featured(props) {
    const [category, setCategory] = useState([]);
    const [display, setDisplay] = useState('display-hidden');
    const [catText, setCatText] = useState(['Explore', 'More']);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${api}/category/get-all-by-featured`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const content = await response.json();
            function splitArrayIntoChunksOfLen(arr, len) {
                var chunks = [], i = 0, n = arr.length;
                while (i < n) {
                    chunks.push(arr.slice(i, i += len));
                }
                return chunks;
            }
            setCategory(splitArrayIntoChunksOfLen(content.data, 4));
        })()
    }, []);

    const handleDisplay = e => {
        e.preventDefault();
        if (display === 'display-hidden') {
            setDisplay('');
            setCatText(['Show', 'Less']);
        }
        else {
            setDisplay('display-hidden');
            setCatText(['Explore', 'More']);
        }
    }


    return (
        <Container className="featured">
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
                    onClick={null}
                />
                <BigBox
                    text={catText[0]}
                    text1={`${catText[1]} Categories`}
                    size={4}
                    classes="text-center blue-big-box big-box-fixed-size"
                    classes_p="center-absolute"
                    to="/"
                    img=""
                    onClick={handleDisplay}
                />
            </Row>
            <div className="margin-global-top-1" />
            {
                category.map((row, rowIndex) => {
                    let displayClass = '';
                    if (rowIndex !== 0) displayClass = display;
                    return (
                        <Row className={`justify-content-center ${displayClass}`} key={rowIndex}>
                            {
                                row.map((cat, catIndex) => {
                                    function arrayBufferToBase64(buffer) {
                                        var binary = '';
                                        var bytes = [].slice.call(new Uint8Array(buffer)); bytes.forEach((b) => binary += String.fromCharCode(b)); return window.btoa(binary);
                                    };
                                    const base64Flag = `data:${cat.image.contentType};base64,`;
                                    const imagePath = base64Flag + arrayBufferToBase64(cat.image.data.data);
                                    return (
                                        <div className="big-box-div" key={catIndex}>
                                            <BigBox
                                                text={cat.name}
                                                text1=""
                                                size={2}
                                                classes="text-center big-box-fixed-size-small"
                                                classes_p="center-absolute"
                                                to={cat.slug}
                                                img={
                                                    <img
                                                        src={imagePath}
                                                        alt={cat.name}
                                                    />
                                                }
                                                onClick={null}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </Row>
                    )
                })
            }
            {/* <Row className="justify-content-center">
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
            </Row> */}
        </Container>
    );
}

export default Featured;