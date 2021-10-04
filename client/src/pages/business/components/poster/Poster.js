import React from 'react';
import './Poster.scss';

function Poster(props) {
    return (
        <div className="poster">
            <img
                src="https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/a2a6dfbdce53/assets/img/home/hero_photos/Y52KtIDZeG8aAMBaLIjSlQ.jpg"
                alt="Test"
            />
            <h2 className="business-name text-uppercase">Name of the Business</h2>
        </div>
    );
}

export default Poster;