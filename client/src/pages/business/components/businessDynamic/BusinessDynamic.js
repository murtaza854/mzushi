import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ButtonTab } from '../../../../components';
import Slider from "react-slick";
import './BusinessDynamic.scss';

function BusinessDynamic(props) {
    const buttons = [
        <ButtonTab
            text="About"
            to={`/${props.categorySlug}/${props.startupSlug}`}
            classes="button-tab-fit-content active-button button-tab-center"
        />,
        // <ButtonTab
        //     text="Timings"
        //     to={`/${props.categorySlug}/${props.startupSlug}`}
        //     classes="button-tab-fit-content button-tab-center"
        // />,
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
                        {/* <Col xs={2}>
                        <ButtonTab
                            text="About"
                            to="/"
                            classes="button-tab-fit-content active-button"
                        />
                    </Col>
                    <Col xs={2}>
                        <YellowButton
                            to="/"
                            text="Lahore"
                            classes="text-uppercase width-high horizontal-center-relative"
                        />
                    </Col>
                    <Col xs={2}>
                        <YellowButton
                            to="/"
                            text="Islamabad"
                            classes="text-uppercase width-high horizontal-center-relative"
                        />
                    </Col>
                    <Col xs={2}>
                        <YellowButton
                            to="/"
                            text="Quetta"
                            classes="text-uppercase width-high horizontal-center-relative"
                        />
                    </Col>
                    <Col xs={2}>
                        <YellowButton
                            to="/"
                            text="Peshawer"
                            classes="text-uppercase width-high horizontal-center-relative"
                        />
                    </Col> */}
                    </Slider>
                    {/* <Col md={11}>
                    <Row>
                        <ButtonTab
                            text="About"
                            to="/"
                            classes="button-tab-fit-content active-button"
                        />
                        <ButtonTab
                            text="Menu"
                            to="/"
                            classes="button-tab-fit-content"
                        />
                        <ButtonTab
                            text="Deals"
                            to="/"
                            classes="button-tab-fit-content"
                        />
                    </Row>
                </Col> */}
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
                        <p className="content-read">
                            {props.description}
                        </p>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default BusinessDynamic;