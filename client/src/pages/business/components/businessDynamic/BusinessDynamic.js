import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ButtonTab } from '../../../../components';
import './BusinessDynamic.scss';

function BusinessDynamic(props) {
    return (
        <div className="business-dynamic">
            <Row className="justify-content-center">
                <Col md={11}>
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
                </Col>
            </Row>
            <div className="margin-global-top-1" />
            <Row className="justify-content-center">
                <Col md={11}>
                    <Row>
                        <p className="content-read">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Etiam venenatis arcu ut turpis molestie lobortis.Nulla a justo non purus mattis fermentum.In vel felis leo.Quisque imperdiet, libero ac mattis venenatis, turpis lectus laoreet elit, ut interdum elit libero at felis.Etiam laoreet faucibus elit, vel accumsan nisi.Cras ac velit aliquet nunc auctor tristique in a lacus.Sed sollicitudin magna tortor.Maecenas semper euismod sollicitudin.Integer in erat nulla.Curabitur pharetra pharetra lectus, sed ullamcorper ex feugiat vel.Nam vel placerat magna.Morbi faucibus vitae magna a condimentum.Sed aliquet nulla eget neque maximus, eu vestibulum leo ultrices.

                            Ut pulvinar maximus consectetur.Fusce ultricies mi at lacus vestibulum, a finibus felis pretium.Etiam posuere quam est, a vulputate nibh sollicitudin et.Etiam suscipit vehicula nisl ut tincidunt.Praesent lobortis aliquam nisl nec lacinia.Phasellus sed quam porttitor, eleifend odio a, condimentum mi.Nam laoreet feugiat quam.Integer accumsan, lacus quis egestas dictum, sem lorem ultricies libero, eget laoreet urna ex a elit.Quisque semper nisl in volutpat pharetra.Etiam id quam at lacus suscipit congue a blandit elit.Vestibulum tempor lacus ac massa gravida, id facilisis sem facilisis.Interdum et malesuada fames ac ante ipsum primis in faucibus.Vestibulum commodo nunc non semper dapibus.Suspendisse nec purus at metus rhoncus vehicula eget ac lacus.Suspendisse consectetur massa eget ante faucibus, id interdum turpis malesuada.Etiam eget varius neque.Pellentesque ullamcorper sapien augue, a tristique metus pellentesque sed.Duis semper velit at libero iaculis cursus at vitae eros.Aenean.
                        </p>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default BusinessDynamic;