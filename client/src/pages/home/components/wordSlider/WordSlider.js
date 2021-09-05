import React from 'react';
import { YellowButton } from '../../../../components';
import './WordSlider.scss';

function WordSlider(props) {
    return (
        <div className="word-slider-main">
            <div className="center-relative-fit-content">
                <div className="word-slider-container">
                    <h1 className="word-slider">
                        <span>Trending</span>
                        &nbsp;
                        <span className="word-slider__words">
                            <span>Eateries</span>
                            <span>Restaurants</span>
                            {/*You must repeat the first word to emulate the loop effect*/}
                            <span>Eateries</span>
                        </span>
                    </h1>
                </div>
                <p className="text-center">Check out the Trending Business of your City</p>
                <YellowButton
                    to="/"
                    text="Explore More"
                    classes="text-uppercase width-full horizontal-center-relative"
                />
            </div>
        </div>
    );
}

export default WordSlider;