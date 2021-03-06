import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { SearchBar } from '../../components';
import { Featured, WordSlider } from './components';
import './Home.scss';

function Home(props) {

    useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
    return (
        <Container fluid className="home">
            <SearchBar classes="search-bar-height" centerclass="center-relative-vertical" />
            <div className="margin-global-top-5" />
            <Featured />
            <div className="margin-global-top-5" />
            <WordSlider />
            {/* <div className="margin-global-top-5" />
            <MzushiChoice /> */}
        </Container>
    );
}

export default Home;