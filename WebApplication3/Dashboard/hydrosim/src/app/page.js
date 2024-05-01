'use client'

import Chart from "chart.js/auto";
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar.js";
import HydroSimView from "./components/HydroSimView.js"
import { useState, useEffect } from "react";
import Register from "./components/Register"
import Login from "./components/Login";
import { LineWave } from "react-loader-spinner";
import Header from "./components/Header";
import Account from "./components/Account";
import StormTabView from "./components/StormTabView";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
export default function Home() {
    const [hasToken, setHasToken] = useState(true);
    const [userObject, setUserObject] = useState(null);
    const [authResponse, setAuthResponse] = useState(null);
    const [hydrographs, setHydrographs] = useState(null);
    const [Storms, setStorms] = useState(null);
    const [isRegistering, setRegistering] = useState(false);
    const [accountView, setAccountView] = useState(false);
    const [appView, setAppView] = useState(null);
    const appViews = ['HydroSim', 'StormTab', 'Account'];
    // switch case for each app in render tree

    const primaryColour = '#455a60';
    const secondaryColour = '#ffb300';

    const theme = createTheme({
        components: {
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        color: secondaryColour,
                        "&$error": {
                            color: secondaryColour
                        }
                    }
                }
            },

            MuiInputBase: {
                styleOverrides: {
                    input: {
                        color: 'black'
                    }
                }
            },

            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: 'black',
                        textShadow: '0px 0px 2px rgba(0, 0, 0, 0.26)'
                    }
                }
            }
        },
        palette: {
            primary: {
                main: primaryColour,
            },
            secondary: {
                main: secondaryColour,
            },
        },
    });


    const mainStyle = {
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'primary.dark',
        color: 'primary.contrastText',
        height: '100vh'
    }

    function loginButton() {
        setHasToken(false);
        setRegistering(false);
    }

    function logoutButton() {
        setHasToken(false);
        setRegistering(false);
    }


    function setView(viewName) {
        setAppView(viewName)
    }

    function accountViewButton() {
        setAppView(true);
    }

    function exitAccountViewButton() {
        setAccountView(false);
        }

    function viewController() {

        switch (appView) {
            case null:
              return  (hydrographs ? <HydroSimView Id={authResponse.Id} Hydrographs={hydrographs}></HydroSimView>
                    : <LineWave wrapperStyle={{ margin: 'auto', left: '35%', top: '35%' }} height='400' width='400'> </LineWave>)
                break
            case 'HydroSim':
                return (hydrographs ? <HydroSimView Id={authResponse.Id} Hydrographs={hydrographs}></HydroSimView>
                    : <LineWave wrapperStyle={{ margin: 'auto', left: '35%', top: '35%' }} height='400' width='400'> </LineWave>)
                break
            case 'Account':
                return (<Account exitAccountViewButton={exitAccountViewButton}></Account>);
                break
            case 'StormTab':
                return (<StormTabView Id={authResponse.Id} Storms={Storms}></StormTabView>)
                break
        }
    }

        const handleHasToken = async (token) => {

            try {
                let identity = await fetch('/api/Account/UserInfo', { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
                let Authresponse = await identity.json();
                let nameSave = localStorage.setItem('Email', Authresponse['Email']);
                console.log(Authresponse)
                setAuthResponse(Authresponse);
                let userHydrographs = await fetch(`/api/hydrographs?userId=${encodeURIComponent(Authresponse.Id)}`, { method: 'GET' });
                let userHydrographsObj = await userHydrographs.json();
                setHydrographs(userHydrographsObj);
                let userStorms = await fetch(`/api/Storms?userId=${encodeURIComponent(Authresponse.Id)}`, { method: 'GET' });
                let userStormsObj = await userStorms.json();
                setStorms(userStormsObj)
                

            } catch (error) {
                console.log(error)
            }
        }

    // The empty array argument makes it only check on mount, not rerender
    useEffect(() => {
        let token = localStorage.getItem('access_token');
        if (token !== null && token !== undefined && token !== 'undefined') {
            setHasToken(true);
            handleHasToken(token);
        }
    }, [])



    return (
        <ThemeProvider theme={theme}>
            <Box sx={mainStyle}>
                <Header loginState={hasToken ? true : false} appView={appView} loginButton={loginButton} accountViewButton={accountViewButton} appViews={appViews} setView={setView}></Header>
                {hasToken === true ?
                    (authResponse ? viewController() : <HydroSimView></HydroSimView>)
                    :
                    (<Login isRegistering={isRegistering} handleNotRegistering={() => { setRegistering(false) }} handleRegistering={() => setRegistering(true)}></Login>)}

            </Box>
      </ThemeProvider>
  );
}