import React from 'react';
import { Row } from 'react-bootstrap';
import { BusinessBigCard } from '../../../../components';
import './BusinessList.scss';

function BusinessList(props) {
    return (
        <div>
            <Row>
                <BusinessBigCard classes="" />
            </Row>
        </div>
    );
}

export default BusinessList;