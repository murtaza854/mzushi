import { MDBDataTable } from 'mdbreact';
import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Heading2 } from '../../../components';

function PaymentHistory(props) {
    const [rows] = useState([]);

    const data = {
        columns: [
            {
                label: 'Amount',
                field: 'amount',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Start Date',
                field: 'startDate',
                sort: 'asc',
                width: 50
            },
            {
                label: 'End Date',
                field: 'endDate',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Paid',
                field: 'paid',
                sort: 'asc',
                width: 50
            },
        ],
        // rows: [
        //     {
        //         name: 'Tiger Nixon',
        //         position: 'System Architect',
        //         office: 'Edinburgh',
        //     },
        // ]
        rows: rows
    };
    return (
        <Container className="dashboard-about box-shadow-dashboard gallery" fluid>
            <Row>
                <Col>
                    <Heading2
                        text="Payment History"
                        classes="text-left"
                    />
                </Col>
            </Row>
            <Row>
                <Form className="form-style margin-global-top-1">
                    <MDBDataTable
                        // striped
                        // bordered
                        // small
                        responsiveLg={true}
                        pagesAmount={8}
                        data={data}
                        fixed={true}
                    />
                </Form>
            </Row>
        </Container>
    );
}

export default PaymentHistory;