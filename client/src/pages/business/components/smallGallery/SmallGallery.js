import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SmallGallery.scss';

function SmallGallery(props) {
    const [display, setDisplay] = useState('display-hidden');
    const [catText, setCatText] = useState(['Show', 'More']);

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
            <div className="small-gallery center-relative-horizontal-fit-content">
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
            </div>
        </div>
    );
}

export default SmallGallery;