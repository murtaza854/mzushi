import React from 'react';
import { Container } from 'react-bootstrap';
import { SearchBar } from '../../components';
import { Featured, WordSlider, MzushiChoice } from './components';
import './Home.scss';

function Home(props) {
    return (
        <Container fluid className="home">
            <SearchBar classes="search-bar-height" centerclass="center-relative-vertical" />
            <div className="margin-global-top-5" />
            <Featured />
            <div className="margin-global-top-5" />
            <WordSlider />
            <div className="margin-global-top-5" />
            <MzushiChoice />
        </Container>
    );
}

export default Home;