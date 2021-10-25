import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import api from '../../api';
import './Business.scss';
import { Details, Poster, SmallGallery, BusinessDynamic } from './components';

function Business(props) {
    const { category, startup } = useParams();
    const [startupObj, setStartupObj] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${api}/startup/get-one-by-category-startup?categorySlug=${category}&startupSlug=${startup}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const content = await response.json();
            console.log(content.data);
            setStartupObj(content.data);
        })()
    }, [category, startup]);

    return (
        <div>
            {
                startupObj ? (
                    <Container>
                        <div className="margin-global-top-4" />
                        <Row className="justify-content-center">
                            <Poster
                                startupName={startupObj.startupName}
                            />
                        </Row>
                        <div className="margin-global-top-4" />
                        <Row>
                            <Details
                                moneyClass={startupObj.moneyClass}
                                category={startupObj.category.name}
                                rating={startupObj.rating}
                                addressLine1={startupObj.address.addressLine1}
                                addressLine2={startupObj.address.addressLine2}
                                landmark={startupObj.address.landmark}
                                area={startupObj.address.area.name}
                                city={startupObj.address.area.city.name}
                                province={startupObj.address.area.city.province.name}
                                activeDays={startupObj.activeDays}
                                features={startupObj.features}
                            />
                        </Row>
                        <div className="margin-global-top-4" />
                        <Row>
                            <SmallGallery />
                        </Row>
                        <div className="margin-global-top-4" />
                        <Row>
                            <BusinessDynamic
                                categorySlug={category}
                                startupSlug={startup}
                                description={startupObj.description}
                            />
                        </Row>
                    </Container>
                ) : null
            }
        </div>
    );
}

export default Business;