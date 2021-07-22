import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Typography, Divider, makeStyles, Button } from '@material-ui/core';
import { Col, Container, Row } from 'react-bootstrap';
import { categoryObj, productBrandObj, productCategoryObj, productSubCategoryObj, countryObj, provinceObj, cityObj, areaObj, adminUserObj, adPackageObj } from '../../db'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const useStyles = makeStyles((theme) => ({
    title: {
        flex: '1 1 100%',
        marginBottom: 10
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        marginBottom: 15
    },
    highlight: {
        color: '#c31200'
    },
    marginTopAll: {
        marginTop: 15
    },
    delete: {
        backgroundColor: '#c31200',
        color: 'white',
        marginRight: 15,
        '&:hover': {
            background: 'black',
        },
    },
    tree: {
        flexGrow: 1,
        paddingTop: 15,
        paddingBottom: 15
    },
}));

function DeleteConfirmation(props) {
    const location = useLocation();
    let history = useHistory();
    const { model } = useParams();
    const classes = useStyles();

    let deleteFetch = {};
    if (model === 'category') deleteFetch = categoryObj;
    else if (model === 'product-brand') deleteFetch = productBrandObj;
    else if (model === 'product-category') deleteFetch = productCategoryObj;
    else if (model === 'product-sub-category') deleteFetch = productSubCategoryObj;
    else if (model === 'country') deleteFetch = countryObj;
    else if (model === 'province') deleteFetch = provinceObj;
    else if (model === 'city') deleteFetch = cityObj;
    else if (model === 'area') deleteFetch = areaObj;
    else if (model === 'admin-user') deleteFetch = adminUserObj;
    else if (model === 'ad-package') deleteFetch = adPackageObj;

    const [modelName, setModelName] = useState('');
    const [selected, setSelected] = useState([]);
    const [length, setLength] = useState(0);
    const [text, setText] = useState('element');
    const [text1, setText1] = useState('The element is listed below:');
    const [items, setItems] = useState([]);

    useEffect(() => {
        (
            async () => {
                try {
                    const selected = location.state.selected;
                    setModelName(location.state.modelName);
                    setLength(selected.length);
                    setSelected(selected)
                    let query = selected.join(',');
                    if (query !== '') query = `?id=${query}`;
                    const response = await fetch(`${deleteFetch.deleteApi[0]}${query}`, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const content = await response.json();
                    console.log(content.data)
                    setItems(content.data);
                } catch (error) {
                    history.push('/admin');
                }
            })();
    }, [location, deleteFetch.deleteApi, history]);

    useEffect(() => {
        if (length > 1) {
            setText('elements');
            setText1('All the elements are listed below:')
        }
    }, [length]);

    const deleteConfirmed = async e => {
        const response = await fetch(`${deleteFetch.deleteApi[1]}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: items, ids: selected }),
        });
        const content = await response.json();
        history.push({
            pathname: `/admin/${model}`,
            state: { content: content, length: length }
        });
    }
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Typography className={classes.title} variant="h3">
                        Confirm Deletion
                        <Divider />
                    </Typography>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Typography>
                        Are you sure you want to delete <b className={classes.highlight}>{length} {text}</b> and its dependencies (if any) of {modelName}?
                    </Typography>
                </Col>
            </Row>
            <Row className={classes.marginTopAll}>
                <Col>
                    <Typography>
                        {text1}
                    </Typography>
                </Col>
            </Row>
            <Row className={classes.marginTopAll}>
                <Col className={classes.demo}>
                    <TreeView
                        className={classes.tree}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        {deleteFetch.Delete(items)}
                    </TreeView>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={deleteConfirmed} type="submit" variant="contained" className={classes.delete}>
                        Delete
                    </Button>
                    <Button onClick={_ => history.push(`/admin/${model}`)} type="submit" variant="contained" color="secondary">
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DeleteConfirmation;