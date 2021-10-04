import React from 'react';
import { Link } from 'react-router-dom';
import './SmallGallery.scss';

function SmallGallery(props) {
    return (
        <div className="small-gallery">
            <img
                src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                alt="Test"
            />
            <img
                src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                alt="Test"
            />
            <img
                src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                alt="Test"
            />
            <img
                src="https://s3-media0.fl.yelpcdn.com/bphoto/JMaVR5nUiDXz2XDbyZvc8Q/l.jpg"
                alt="Test"
            />
            <Link className="show-more" to="">
                <p className="center-absolute">Show more</p>
            </Link>
        </div>
    );
}

export default SmallGallery;