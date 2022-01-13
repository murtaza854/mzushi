import React, { useContext, useEffect, useState } from 'react';
import { Login, AdminLayout } from '../admin';
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import './Admin.scss';
import AdminContext from '../contexts/adminContext';
import api from '../api';


function Admin(props) {
    const [darkState, setDarkState] = useState(false);
    const [adminState, setAdminState] = useState(null);
    const [loading, setLoading] = useState(true);
    const admin = useContext(AdminContext);
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

    useEffect(() => {
      (
        async () => {
          try {
            const response = await fetch(`${api}/admin-user/logged-in`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              withCredentials: true,
            });
            const content = await response.json();
            const admin = content.data;
            const { displayName, email, emailVerified } = admin;
            setAdminState({ displayName, email, emailVerified });
            setLoading(false);
          } catch (error) {
            setAdminState(null);
            setLoading(false);
          }
        })();
    }, []);

    if (loading) return <div></div>;

    return (
        <AdminContext.Provider value={{ adminState: adminState, setAdminState: setAdminState }}>
            <ThemeProvider theme={currentTheme}>
                {/* <Login setToken={setToken} title="Mzushi: Admin Login" /> */}
                {adminState ? (
                    <Login user={admin} title="The Sew Story: Admin Login" />
                ) : (
                    <AdminLayout user={admin} darkState={darkState} setDarkState={setDarkState} title="Mzushi: Dashboard" />
                )}
            </ThemeProvider>
        </AdminContext.Provider >
    );
}

export default Admin;