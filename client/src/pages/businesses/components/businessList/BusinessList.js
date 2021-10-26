import React from 'react';
import { Row } from 'react-bootstrap';
import { BusinessBigCard } from '../../../../components';
import { arrayBufferToBase64 } from '../../../../helperFunctions/arrayBufferToBase64';
import './BusinessList.scss';

function BusinessList(props) {

    return (
        <div>
            {
                props.startUps.map((value, index) => {
                    let classes = "";
                    if (index !== 0) classes = "margin-global-top-1";
                    const base64Flag = `data:${value.logo.contentType};base64,`;
                    const imagePath = base64Flag + arrayBufferToBase64(value.logo.data.data);
                    return (
                        <Row key={index} className={classes}>
                            <BusinessBigCard
                                classes=""
                                logo={imagePath}
                                startupName={value.startupName}
                                slug={`/${value.category.slug}/${value.slug}`}
                                moneyClass={value.moneyClass}
                                category={value.category.name}
                                rating={value.rating}
                                addressLine1={value.address.addressLine1}
                                addressLine2={value.address.addressLine2}
                                landmark={value.address.landmark}
                                area={value.address.area.name}
                                city={value.address.area.city.name}
                                province={value.address.area.city.province.name}
                                activeDays={value.activeDays}
                                features={value.features}
                            />
                        </Row>
                    )
                })
            }
            {/* <Row>
                <BusinessBigCard classes="" />
            </Row>
            <div className="margin-global-top-1" />
            <Row>
                <BusinessBigCard classes="" />
            </Row>
            <div className="margin-global-top-1" />
            <Row>
                <BusinessBigCard classes="" />
            </Row>
            <div className="margin-global-top-1" />
            <Row>
                <BusinessBigCard classes="" />
            </Row>
            <div className="margin-global-top-1" />
            <Row>
                <BusinessBigCard classes="" />
            </Row>
            <div className="margin-global-top-1" />
            <Row>
                <BusinessBigCard classes="" />
            </Row>
            <div className="margin-global-top-1" />
            <Row>
                <BusinessBigCard classes="" />
            </Row> */}
        </div>
    );
}

export default BusinessList;