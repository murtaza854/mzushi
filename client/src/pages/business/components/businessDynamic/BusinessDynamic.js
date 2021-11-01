import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { ButtonTab } from '../../../../components';
import Slider from "react-slick";
import './BusinessDynamic.scss';

function BusinessDynamic(props) {

    const [urlObj, setUrlObj] = useState({
        about: 'active-button',
        productService: '',
    });

    let productServiceText = "Service";
    if (props.delivery) productServiceText = "Delivery";
    // if (window.location.pathname.includes('delivery') || window.location.pathname.includes('service')) urlObj.productService = 'active-button';
    // else urlObj.about = 'active-button';

    const onClick = (e, section) => {
        e.preventDefault();
        const obj = {
            about: '',
            productService: '',
        };
        obj[`${section}`] = 'active-button';
        setUrlObj(obj);
    }

    let provincesString = props.provinceDS.map(function (elem) {
        return elem.name;
    }).join(", ");
    if (props.provinceDS.length === 0) provincesString = 'Not provided';

    let citiesString = props.cityDS.map(function (elem) {
        return elem.name;
    }).join(", ");
    if (props.cityDS.length === 0) citiesString = 'Not provided';

    let areasString = props.areaDS.map(function (elem) {
        return elem.name;
    }).join(", ");
    if (props.areaDS.length === 0) areasString = 'Not provided';

    const buttons = [
        <ButtonTab
            text="About"
            to="/"
            classes={`button-tab-fit-content button-tab-center ${urlObj.about}`}
            onClick={onClick}
            section="about"
        />,
        <ButtonTab
            text="Location"
            to="/"
            classes={`button-tab-fit-content button-tab-center ${urlObj.productService}`}
            onClick={onClick}
            section="productService"
        />,
        // <ButtonTab
        //     text="Deals"
        //     to="/"
        //     classes="button-tab-fit-content button-tab-center"
        // />,
        // <ButtonTab
        //     text="Deals"
        //     to="/"
        //     classes="button-tab-fit-content button-tab-center"
        // />
    ];
    let sliderLength = 5;
    let sliderLength991 = 3;
    let sliderLength767 = 2;
    let sliderLength567 = 1;
    // if (buttons.length < sliderLength) sliderLength = buttons.length;
    // if (buttons.length < sliderLength991) sliderLength = buttons.length;
    // if (buttons.length < sliderLength767) sliderLength = buttons.length;
    // if (buttons.length < sliderLength567) sliderLength = buttons.length;
    const settingsButtons = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: sliderLength,
        slidesToScroll: 1,
        // initialSlide: 0,
        arrows: false,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: sliderLength991,
                    slidesToScroll: 1,
                    centerMode: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: sliderLength767,
                    slidesToScroll: 1,
                    centerMode: true,
                }
            },
            {
                breakpoint: 567,
                settings: {
                    slidesToShow: sliderLength567,
                    slidesToScroll: 1,
                    centerMode: true
                }
            }
        ]
    };
    return (
        <div className="business-dynamic">
            <Row className="justify-content-center">
                <Col md={11}>
                    <Slider {...settingsButtons}>
                        {
                            buttons.map((value, index) => (
                                <div key={index} className="button-dynamic-cont">
                                    {value}
                                </div>
                            ))
                        }
                    </Slider>
                </Col>
            </Row>
            <div className="margin-global-top-1" />
            <Row className="justify-content-center">
                <Col md={11}>
                    <Row>
                        {/* <p className="content-read">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam venenatis arcu ut turpis molestie lobortis.Nulla a justo non purus mattis fermentum.In vel felis leo.Quisque imperdiet, libero ac mattis venenatis, turpis lectus laoreet elit, ut interdum elit libero at felis.Etiam laoreet faucibus elit, vel accumsan nisi.Cras ac velit aliquet nunc auctor tristique in a lacus.Sed sollicitudin magna tortor.Maecenas semper euismod sollicitudin.Integer in erat nulla.Curabitur pharetra pharetra lectus, sed ullamcorper ex feugiat vel.Nam vel placerat magna.Morbi faucibus vitae magna a condimentum.Sed aliquet nulla eget neque maximus, eu vestibulum leo ultrices.

                            Ut pulvinar maximus consectetur.Fusce ultricies mi at lacus vestibulum, a finibus felis pretium.Etiam posuere quam est, a vulputate nibh sollicitudin et.Etiam suscipit vehicula nisl ut tincidunt.Praesent lobortis aliquam nisl nec lacinia.Phasellus sed quam porttitor, eleifend odio a, condimentum mi.Nam laoreet feugiat quam.Integer accumsan, lacus quis egestas dictum, sem lorem ultricies libero, eget laoreet urna ex a elit.Quisque semper nisl in volutpat pharetra.Etiam id quam at lacus suscipit congue a blandit elit.Vestibulum tempor lacus ac massa gravida, id facilisis sem facilisis.Interdum et malesuada fames ac ante ipsum primis in faucibus.Vestibulum commodo nunc non semper dapibus.Suspendisse nec purus at metus rhoncus vehicula eget ac lacus.Suspendisse consectetur massa eget ante faucibus, id interdum turpis malesuada.Etiam eget varius neque.Pellentesque ullamcorper sapien augue, a tristique metus pellentesque sed.Duis semper velit at libero iaculis cursus at vitae eros.Aenean.
                        </p> */}
                        {
                            urlObj.about === 'active-button' ? (
                                <p className="content-read">{props.description}</p>
                            ) : null
                        }
                        {
                            urlObj.productService === 'active-button' ? (
                                <>
                                    <p className="content-read">{productServiceText} provided at:</p>
                                    <Row>
                                        <Form.Group as={Col}>
                                            <Form.Label className="bold-600 margin-bottom-0">Provinces</Form.Label>
                                            <p className="content-read">{provincesString}</p>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col}>
                                            <Form.Label className="bold-600 margin-bottom-0">Cities</Form.Label>
                                            <p className="content-read">{citiesString}</p>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col}>
                                            <Form.Label className="bold-600 margin-bottom-0">Areas</Form.Label>
                                            <p className="content-read">{areasString}</p>
                                        </Form.Group>
                                    </Row>
                                </>
                            ) : null
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default BusinessDynamic;