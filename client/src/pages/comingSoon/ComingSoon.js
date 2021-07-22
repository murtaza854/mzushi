import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './ComingSoon.scss'

function ComingSoon(props) {
    return (
        <div className="coming-soon">
            <img className="bolt" src="/admin/Mzushi_Bolt.png" alt="Mzushi Bolt" />
            <Container fluid>
                <Row className="justify-content-center">
                    <img className="logo img-fluid" src="logo.png" alt="Mzushi" />
                </Row>
                <Row className="justify-content-center">
                    <div className="message">
                        Coming Soon
                    </div>
                </Row>
                <Row className="justify-content-center">
                    <div className="powered-by">
                        <p>Powered By</p>
                        <a href="https://www.instagram.com/hexandbracket/" target="_blank" rel="noreferrer">
                            <img className="h-b-logo" src="h-b-logo.png" alt="hex & bracket" />
                        </a>
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default ComingSoon;