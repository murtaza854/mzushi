import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Heading2 } from '../../../components';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { arrayBufferToBase64 } from '../../../helperFunctions/arrayBufferToBase64';
import './Gallery.scss'
import { AiOutlineDelete } from 'react-icons/ai';
import api from '../../../api';

function Gallery(props) {
    const [rows, setRows] = useState([]);

    const deleteImage = useCallback(
        async fileName => {
            const response = await fetch(`${api}/startup/delete-image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                withCredentials: true,
                body: JSON.stringify({ fileName })
            });
            const content = await response.json();
            if (content.data) {
                const rowsTemp = rows.filter(function (obj) {
                    return obj.fileName !== fileName;
                });
                setRows(rowsTemp);
            }
        },
        [rows],
    )

    useEffect(() => {
        const rowsTemp = [];
        props.images.forEach(element => {
            console.log(element);
            const base64Flag = `data:${element.image.contentType};base64,`;
            const imagePath = base64Flag + arrayBufferToBase64(element.image.data.data);
            rowsTemp.push({
                fileName: element.fileName,
                image: <img
                    src={imagePath}
                    alt={element.fileName}
                />,
                action: <div onClick={_ => deleteImage(element.fileName)} className="delete-icon">
                    <AiOutlineDelete className="icon" />
                </div>,
                _id: element._id
            });
        });
        setRows(rowsTemp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.images])

    const data = {
        columns: [
            {
                label: 'File Name',
                field: 'fileName',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Image',
                field: 'image',
                sort: 'asc',
                width: 50
            },
            {
                label: 'Action',
                field: 'action',
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
                        text="Gallery"
                        classes="text-left"
                    />
                </Col>
                <Col>
                    <Row>
                        <Link className="icon-link" to="/dashboard/account/gallery/add">
                            <IoIosAddCircleOutline className="icon" />
                        </Link>
                    </Row>
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

export default Gallery;