import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { arrayBufferToBase64 } from '../../../../helperFunctions/arrayBufferToBase64';
import './SmallGallery.scss';

function SmallGallery(props) {
    const [display, setDisplay] = useState('display-hidden');
    const [catText, setCatText] = useState(['Show', 'More']);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const results = [];

        while (props.images.length) {
            results.push(props.images.splice(0, 4));
        }
        setRows(results);
    }, [props.images])

    const handleDisplay = e => {
        e.preventDefault();
        if (display === 'display-hidden') {
            setDisplay('');
            setCatText(['Show', 'Less']);
        }
        else {
            setDisplay('display-hidden');
            setCatText(['Show', 'More']);
        }
    }

    return (
        <div>
            {
                rows.map((value, index) => {
                    return (
                        <div key={index} className="small-gallery center-relative-horizontal-fit-content">
                            {
                                value.map((value1, index1) => {
                                    const base64Flag = `data:${value1.image.contentType};base64,`;
                                    const imagePath = base64Flag + arrayBufferToBase64(value1.image.data.data);
                                    let flag = <div key={index1} className="img-cont">
                                        <img
                                            src={imagePath}
                                            alt={value1.fileName}
                                        />
                                    </div>;
                                    if (rows.length > 1 && index === 0 && index1 === 3) flag = <Link key={index1} onClick={handleDisplay} className="show-more" to="">
                                        <img
                                            src={imagePath}
                                            alt={value1.fileName}
                                        />
                                        <p className="center-absolute">{catText[0]} {catText[1]}</p>
                                    </Link>;
                                    return flag
                                })
                            }
                        </div>
                    )
                })
            }
            {/* <div className="small-gallery center-relative-horizontal-fit-content">
                <div className="img-cont">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                </div>
                <div className="img-cont hide-768">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                </div>
                <div className="img-cont hide-1200">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                </div>
                <div className="img-cont hide-1400">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                </div>
                <Link onClick={handleDisplay} className="show-more" to="">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                    <p className="center-absolute">{catText[0]} {catText[1]}</p>
                </Link>
            </div>
            <div className={`margin-global-top-1 small-gallery center-relative-horizontal-fit-content ${display}`}>
                <div className="img-cont">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                </div>
                <div className="img-cont hide-768">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                </div>
                <div className="img-cont hide-1200">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                </div>
                <div className="img-cont hide-1400">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                </div>
                <div className="img-cont hide-1400">
                    <img
                        src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                        alt="Test"
                    />
                </div>
            </div> */}
        </div>
    );
}

export default SmallGallery;