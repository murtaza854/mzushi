import React, { useContext, useState } from 'react';
import { Login, AdminLayout } from '../admin';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import './Admin.scss';
import UserContext from '../contexts/userContext';


function Admin(props) {
    const [darkState, setDarkState] = useState(false);
    const user = useContext(UserContext);
    const darkTheme = createTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#90bede',
                contrastText: 'rgba(255,255,255,0.87)',
            },
            secondary: {
                main: '#f7d43e',
            },
            background: {
                //   default: '#ffffff',
                //   paper: '#ededed',
            },
            error: {
                main: '#c31200',
            },
        },
        typography: {
            fontFamily: 'Raleway',
        },
    });
    const lightTheme = createTheme({
        palette: {
            type: 'light',
            primary: {
                main: '#90bede',
                contrastText: 'rgba(255,255,255,0.87)',
            },
            secondary: {
                main: '#f7d43e',
            },
            background: {
                //   default: '#ffffff',
                //   paper: '#ededed',
            },
            error: {
                main: '#c31200',
            },
        },
        typography: {
            fontFamily: 'Raleway',
        },
    });
    const currentTheme = darkState ? darkTheme : lightTheme;
    return (
        <ThemeProvider theme={currentTheme}>
            {/* <Login setToken={setToken} title="Mzushi: Admin Login" /> */}
            {!user.userState ? (
                <Login user={user} title="Mzushi: Admin Login" />
            ) : (
                <AdminLayout user={user} darkState={darkState} setDarkState={setDarkState} title="Mzushi: Dashboard" />
            )}
        </ThemeProvider>
    );
}

export default Admin;