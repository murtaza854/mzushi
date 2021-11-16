import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import api from '../../api';
// import { arrayBufferToBase64 } from '../../helperFunctions/arrayBufferToBase64';
import './Business.scss';
import { Details, Poster, SmallGallery, BusinessDynamic } from './components';

function Business(props) {
    const { category, startup } = useParams();
    const [startupObj, setStartupObj] = useState(null);
    const [poster, setPoster] = useState(null);

    useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

    useEffect(() => {
        (async () => {
            const response = await fetch(`${api}/startup/get-one-by-category-startup?categorySlug=${category}&startupSlug=${startup}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const content = await response.json();
            // const base64Flag = `data:${content.data.logo.contentType};base64,`;
            // const imagePath = base64Flag + arrayBufferToBase64(content.data.logo.data.data);
            const imagePath = content.data.logo.filePath;
            setPoster(imagePath);
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
                                poster={poster}
                                startupName={startupObj.startupName}
                            />
                        </Row>
                        <div className="margin-global-top-4" />
                        <Row>
                            <Details
                                startupName={startupObj.startupName}
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
                                website={startupObj.website}
                                minPrice={startupObj.minPrice}
                                maxPrice={startupObj.maxPrice}
                            />
                        </Row>
                        <div className="margin-global-top-4" />
                        <Row>
                            <SmallGallery 
                                images={startupObj.images}
                                />
                        </Row>
                        <div className="margin-global-top-4" />
                        <Row>
                            <BusinessDynamic
                                categorySlug={category}
                                startupSlug={startup}
                                description={startupObj.description}
                                delivery={startupObj.delivery}
                                provinceDS={startupObj.serviceProvinces}
                                cityDS={startupObj.serviceCities}
                                areaDS={startupObj.serviceAreas}
                                productsServices={startupObj.productsServices}
                            />
                        </Row>
                    </Container>
                ) : null
            }
        </div>
    );
}

export default Business;