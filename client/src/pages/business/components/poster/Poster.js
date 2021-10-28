import React from 'react';
import './Poster.scss';

function Poster(props) {
    console.log(props.poster);
    return (
        <div className="poster">
            
            <img
                src={props.poster}
                alt={props.startupName}
            />
            <h2 className="business-name text-uppercase">{props.startupName}</h2>
        </div>
    );
}

export default Poster;