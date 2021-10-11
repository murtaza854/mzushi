import { FormControl, Input, InputLabel, FormHelperText, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import api from '../api';
import { useHistory } from 'react-router-dom';
import TreeItem from '@material-ui/lab/TreeItem';

const createTableData = (data) => {
    let { _id, name } = data;
    return { _id, name };
}

const objCheck = (data, value) => {
    return data.find(obj => obj.name.toLowerCase().trim() === value.toLowerCase().trim());
}

const featuresObj = {
    apiTable: `${api}/features/table-data`,
    deleteApi: [`${api}/features/get-by-ids`, `${api}/features/delete`],
    createTableData: createTableData,
    headCells: [
        // { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    ],
    ManyChild: '',
    checkboxSelection: '_id',
    Delete: function (items) {
        let html = [];
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            html.push(
                <TreeItem key={i} nodeId={`${element._id}`} label={`${element.firstName} ${element.lastName} - ${element.email}`} />
            )
        }
        return html;
    },
    editAllowed: false,
    deleteAllowed: true,
    addAllowed: true,
    modelName: 'Features',
    ordering: 'name',
    rightAllign: [],
    Form: function (id, classes) {
        let history = useHistory();

        const [name, setName] = useState({ name: '', helperText: 'Enter name Ex. Wifi', error: false });

        const [featuresArray, setfeaturesArray] = useState([]);
        const [isDisabled, setCanSubmit] = useState(true);
        const [pressedBtn, setPressedBtn] = useState(null);

        useEffect(() => {
            let flag = true;
            if (name.error === true) flag = true;
            else if (name.name.length === 0) flag = true;
            else flag = false;
            setCanSubmit(flag);
        }, [name]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/features/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                          },
                    });
                    const content = await response.json();
                    setfeaturesArray(content.data)
                })();
        }, [isDisabled]);

        function changeName(event) {
            const { value } = event.target;
            setName(prevState => ({ ...prevState, name: value }));
            const obj = objCheck(featuresArray, value);
            if (obj) setName(prevState => ({ ...prevState, helperText: `${obj.name} already exists!`, error: true }));
            else if (value === '') setName(prevState => ({ ...prevState, helperText: 'Name is required!', error: true }));
            else setName(prevState => ({ ...prevState, helperText: 'Enter an name Ex. Wifi', error: false }));
        };

        const onSubmit = async e => {
            e.preventDefault();
            await fetch(`${api}/users/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                  },
                body: JSON.stringify({ name: name.name }),
            });
            // const content = await response.json();
            if (pressedBtn === 1) {
                history.push('/admin/features');
            }
            else {
                setName({ name: '', helperText: 'Enter name Ex. Wifi', error: false });
                history.push('/admin/features/add');
            }
        };

        return (<form onSubmit={onSubmit} autoComplete="off">
            <fieldset>
                <legend>Personal</legend>
                <Row className={classes.rowGap}>
                    <Form.Group as={Col} md={6} controlId="firstName">
                        <FormControl className={classes.formControl}>
                            <InputLabel error={name.error} color="secondary" htmlFor="name">Name</InputLabel>
                            <Input
                                color="secondary"
                                autoComplete="none"
                                value={name.name}
                                type="text"
                                error={name.error}
                                id="name"
                                name="name"
                                onChange={changeName}
                                onBlur={changeName}
                                aria-describedby="name-helper"
                            />
                            <FormHelperText error={name.error} id="name-helper">{name.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                </Row>
            </fieldset>
            <input
                type="text"
                autoComplete="on"
                value=""
                style={{ display: 'none' }}
                readOnly={true}
            />
            <Button className={classes.button} onClick={_ => setPressedBtn(1)} disabled={isDisabled} type="submit" variant="contained" color="primary">
                Save
            </Button>
            <Button onClick={_ => setPressedBtn(2)} disabled={isDisabled} type="submit" variant="contained" color="primary">
                Save and add another
            </Button>
        </form>);
    },
}

export default featuresObj;