import { FormControl, Input, InputLabel, FormHelperText, Button, InputAdornment, IconButton } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import api from '../api';
import { useHistory } from 'react-router-dom';
import TreeItem from '@material-ui/lab/TreeItem';

const createTableData = (data) => {
    let { _id, firstName, lastName, email } = data;
    return { _id, firstName, lastName, email };
}

const objEmailCheck = (data, value) => {
    return data.find(obj => obj.email.toLowerCase().trim() === value.toLowerCase().trim());
}

const adminUserObj = {
    apiTable: `${api}/admin-user/table-data`,
    deleteApi: [`${api}/admin-user/get-by-ids`, `${api}/admin-user/delete`],
    createTableData: createTableData,
    headCells: [
        // { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
        { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
        { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
        { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
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
    modelName: 'Admin User',
    ordering: 'name',
    rightAllign: [],
    Form: function (id, classes) {
        let history = useHistory();

        const [firstNameState, setFirstNameState] = useState({ name: '', helperText: 'Enter first name Ex. Ahmad', error: false });
        const [lastNameState, setLastNameState] = useState({ name: '', helperText: 'Enter last name Ex. Khan', error: false });
        const [emailState, setEmailState] = useState({ name: '', helperText: 'Enter an email Ex. ahmad@gmail.com', error: false });
        const [passwordState, setPasswordState] = useState({ name: '', showPassword: false, helperText: 'Enter a password', error: false });
        const [confirmPasswordState, setConfirmPasswordState] = useState({ name: '', showPassword: false, helperText: 'Re-type password', error: false });

        const [adminUsersArray, setAdminUsersArray] = useState([]);
        const [isDisabled, setCanSubmit] = useState(true);
        const [pressedBtn, setPressedBtn] = useState(null);

        useEffect(() => {
            let flag = true;
            if (firstNameState.error === true) flag = true;
            else if (firstNameState.name.length === 0) flag = true;
            else if (lastNameState.error === true) flag = true;
            else if (lastNameState.name.length === 0) flag = true;
            else if (emailState.error === true) flag = true;
            else if (emailState.name.length === 0) flag = true;
            else if (passwordState.error === true) flag = true;
            else if (passwordState.name.length === 0) flag = true;
            else if (confirmPasswordState.error === true) flag = true;
            else flag = false;
            setCanSubmit(flag);
        }, [firstNameState, lastNameState, emailState, passwordState, confirmPasswordState]);

        useEffect(() => {
            (
                async () => {
                    const response = await fetch(`${api}/admin-user/table-data`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-store'
                          },
                    });
                    const content = await response.json();
                    setAdminUsersArray(content.data)
                })();
        }, [isDisabled]);

        useEffect(() => {
            (
                () => {
                    if (confirmPasswordState.name !== passwordState.name) setConfirmPasswordState(prevState => ({ ...prevState, helperText: 'Password does not match', error: true }));
                    else setConfirmPasswordState(prevState => ({ ...prevState, helperText: 'Re-type password', error: false }));
                })();
        }, [confirmPasswordState.name, passwordState.name]);

        function changeFirstNameState(event) {
            const { value } = event.target;
            setFirstNameState(prevState => ({ ...prevState, name: value }));
            if (value === '') setFirstNameState(prevState => ({ ...prevState, helperText: 'First name is required!', error: true }));
            else setFirstNameState(prevState => ({ ...prevState, helperText: 'Enter first name Ex. Ahmad', error: false }));
        };
        function changeLastNameState(event) {
            const { value } = event.target;
            setLastNameState(prevState => ({ ...prevState, name: value }));
            if (value === '') setLastNameState(prevState => ({ ...prevState, helperText: 'Last name is required!', error: true }));
            else setLastNameState(prevState => ({ ...prevState, helperText: 'Enter last name Ex. Khan', error: false }));
        };
        function changeEmailState(event) {
            const { value } = event.target;
            setEmailState(prevState => ({ ...prevState, name: value }));
            const obj = objEmailCheck(adminUsersArray, value);
            if (obj) setEmailState(prevState => ({ ...prevState, helperText: `${obj.email} already exists!`, error: true }));
            else if (value === '') setEmailState(prevState => ({ ...prevState, helperText: 'Email is required!', error: true }));
            else setEmailState(prevState => ({ ...prevState, helperText: 'Enter an email Ex. ahmad@gmail.com', error: false }));
        };
        function changePasswordState(event) {
            const { value } = event.target;
            const passwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
            setPasswordState(prevState => ({ ...prevState, name: value }));
            if (!value.match(passwReg)) setPasswordState(prevState => ({ ...prevState, helperText: 'Password must contain atleast 1 lowercase alhpabetical character, atleast 1 uppercase alhpabetical character, atleast 1 numericical character, 1 special character and must be of atleast 8 characters', error: true }));
            else setPasswordState(prevState => ({ ...prevState, helperText: 'Enter a password', error: false }));
        };
        function changeConfirmPasswordState(event) {
            const { value } = event.target;
            setConfirmPasswordState(prevState => ({ ...prevState, name: value }));
        };

        const onSubmit = async e => {
            e.preventDefault();
            await fetch(`${api}/users/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                  },
                body: JSON.stringify({ firstName: firstNameState.name, lastName: lastNameState.name, email: emailState.name, password: passwordState.name }),
            });
            // const content = await response.json();
            if (pressedBtn === 1) {
                history.push('/admin/admin-user');
            }
            else {
                setFirstNameState({ name: '', helperText: 'Enter first name Ex. Ahmad', error: false });
                setLastNameState({ name: '', helperText: 'Enter last name Ex. Khan', error: false });
                setEmailState({ email: '', helperText: 'Enter an email Ex. ahmad@gmail.com', error: false });
                setPasswordState({ password: '', showPassword: false, helperText: 'Enter a password', error: false });
                setConfirmPasswordState({ confirmPassowrd: '', showPassword: false, helperText: 'Re-type password', error: false });
                history.push('/admin/admin-user/add');
            }
        };

        const handleClickShowPassword = () => {
            setPasswordState(prevState => ({ ...prevState, showPassword: !passwordState.showPassword }));
        };
        const handleClickShowPassword1 = () => {
            setConfirmPasswordState(prevState => ({ ...prevState, showPassword: !confirmPasswordState.showPassword }));
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        return (<form onSubmit={onSubmit} autoComplete="off">
            <fieldset>
                <legend>Personal</legend>
                <Row className={classes.rowGap}>
                    <Form.Group as={Col} md={6} controlId="firstName">
                        <FormControl className={classes.formControl}>
                            <InputLabel error={firstNameState.error} color="secondary" htmlFor="firstName">First Name</InputLabel>
                            <Input
                                color="secondary"
                                autoComplete="none"
                                value={firstNameState.name}
                                type="text"
                                error={firstNameState.error}
                                id="firstName"
                                name="firstName"
                                onChange={changeFirstNameState}
                                onBlur={changeFirstNameState}
                                aria-describedby="firstName-helper"
                            />
                            <FormHelperText error={firstNameState.error} id="firstName-helper">{firstNameState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="lastName">
                        <FormControl className={classes.formControl}>
                            <InputLabel error={lastNameState.error} color="secondary" htmlFor="lastName">Last Name</InputLabel>
                            <Input
                                color="secondary"
                                autoComplete="none"
                                value={lastNameState.name}
                                type="text"
                                error={lastNameState.error}
                                id="lastName"
                                name="lastName"
                                onChange={changeLastNameState}
                                onBlur={changeLastNameState}
                                aria-describedby="lastName-helper"
                            />
                            <FormHelperText error={lastNameState.error} id="lastName-helper">{lastNameState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                </Row>
                <Row className={classes.rowGap}>
                    <Form.Group as={Col} md={6} controlId="formGridEmail">
                        <FormControl className={classes.formControl}>
                            <InputLabel error={emailState.error} color="secondary" htmlFor="email">Email</InputLabel>
                            <Input
                                color="secondary"
                                autoComplete="none"
                                error={emailState.error}
                                value={emailState.name}
                                id="email"
                                onChange={changeEmailState}
                                onBlur={changeEmailState}
                                name="email"
                                aria-describedby="email-helper"
                            />
                            <FormHelperText error={emailState.error} id="email-helper">{emailState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                </Row>
            </fieldset>
            <fieldset>
                <legend>Password</legend>
                <Row className={classes.rowGap}>
                    <Form.Group as={Col} md={6} controlId="password">
                        <FormControl className={classes.formControl}>
                            <InputLabel color="secondary" error={passwordState.error} htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={passwordState.showPassword ? 'text' : 'password'}
                                value={passwordState.name}
                                autoComplete="new-password"
                                error={passwordState.error}
                                color="secondary"
                                onChange={changePasswordState}
                                onBlur={changePasswordState}
                                name="password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {passwordState.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText error={passwordState.error} id="password-helper">{passwordState.helperText}</FormHelperText>
                        </FormControl>
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="confirmPassowrd">
                        <FormControl className={classes.formControl}>
                            <InputLabel color="secondary" error={confirmPasswordState.error} htmlFor="confirmPassowrd">Confirm Password</InputLabel>
                            <Input
                                id="confirmPassowrd"
                                type={confirmPasswordState.showPassword ? 'text' : 'password'}
                                value={confirmPasswordState.name}
                                autoComplete="new-password"
                                color="secondary"
                                onChange={changeConfirmPasswordState}
                                onBlur={changeConfirmPasswordState}
                                name="confirmPassowrd"
                                error={confirmPasswordState.error}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword1}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {confirmPasswordState.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText error={confirmPasswordState.error} id="confirmPassowrd-helper">{confirmPasswordState.helperText}</FormHelperText>
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

export default adminUserObj;