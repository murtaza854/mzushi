import React from 'react';
import { Link } from 'react-router-dom';
import './SmallGallery.scss';

function SmallGallery(props) {
    return (
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
            <Link className="show-more" to="">
                <img
                    src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                    alt="Test"
                />
                <p className="center-absolute">Show more</p>
            </Link>
        </div>
    );
}

export default SmallGallery;