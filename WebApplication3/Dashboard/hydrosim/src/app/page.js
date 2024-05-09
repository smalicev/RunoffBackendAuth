"use client";

import Chart from "chart.js/auto";
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar.js";
import HydroSimView from "./components/HydroSimView.js";
import { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { LineWave } from "react-loader-spinner";
import Header from "./components/Header";
import Account from "./components/Account";
import StormTabView from "./components/StormTabView";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { red } from "@mui/material/colors";
import Storm from "./storm.mjs";
import Catchment from "./catchment.mjs";
import Footer from "./components/Footer";
export default function Home() {
    const [hasToken, setHasToken] = useState(false);
    const [userObject, setUserObject] = useState(null);
    const [authResponse, setAuthResponse] = useState(false);
    const [hydrographs, setHydrographs] = useState(null);
    const [storms, setStorms] = useState(null);
    const [catchments, setCatchments] = useState(null);
    const [isRegistering, setRegistering] = useState(false);
    const [accountView, setAccountView] = useState(false);
    const [appView, setAppView] = useState(null);
    const appViews = ["HydroSim", "StormTab"];
    // switch case for each app in render tree

    const primaryColour = "#455a60";
    const secondaryColour = "#ffb300";

    const theme = createTheme({
        components: {
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        color: secondaryColour,
                        "&$error": {
                            color: secondaryColour,
                        },
                    },
                },
            },

            MuiTypography: {
                styleOverrides: {
                    root: {
                        fontFamily: 'inherit'
                    }
                }
            },

            MuiAutocomplete: {
                styleOverrides: {
                    popper: {
                        backgroundColor: secondaryColour,
                    },
                    listbox: {
                        backgroundColor: secondaryColour,
                    },
                },
            },

            MuiMenu: {
                styleOverrides: {
                    list: {
                        '&[role="menu"]': {
                            backgroundColor: secondaryColour,
                            color: "black",
                            textShadow: "0px 0px 2px rgba(0, 0, 0, 0.26)",
                        },
                    },
                },
            },

            MuiInputBase: {
                styleOverrides: {
                    input: {
                        color: "black",
                    },
                },
            },

            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: "black",
                        textShadow: "0px 0px 2px rgba(0, 0, 0, 0.26)",
                    },
                },
            },
        },
        palette: {
            primary: {
                littleLight: '#546e75',
                main: primaryColour,
                veryDark: '#273235'
            },
            secondary: {
                main: secondaryColour,
            },
        },
    });

    const mainStyle = {
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.dark",
        color: "primary.contrastText",
        height: '100%',
    };

    function loginButton() {
        setHasToken(false);
        setRegistering(false);
    }

    function logoutButton() {
        setHasToken(false);
        setRegistering(false);
    }

    function setView(viewName) {
        setAppView(viewName);
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
                return storms ? (
                    <HydroSimView
                        Id={authResponse.Id}
                        Storms={storms}
                        Catchments={catchments}
                        Hydrographs={hydrographs}
                    ></HydroSimView>
                ) : (
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress size="4rem" color="secondary" />
                    </Box>
                );
                break;
            case "HydroSim":
                return storms ? (
                    <HydroSimView
                        Id={authResponse.Id}
                        Storms={storms}
                        Catchments={catchments}
                        Hydrographs={hydrographs}
                    ></HydroSimView>
                ) : (
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CircularProgress size="4rem" color="secondary" />
                    </Box>
                );
                break;
            case "Account":
                return (
                    <Account
                        exitAccountViewButton={exitAccountViewButton}
                    ></Account>
                );
                break;
            case "StormTab":
                return (
                    <StormTabView
                        Id={authResponse.Id}
                        Storms={storms}
                    ></StormTabView>
                );
                break;
        }
    }

    const handleHasToken = async (token) => {
        try {
            let identity = await fetch("/api/Account/UserInfo", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            let Authresponse = await identity.json();
            let nameSave = localStorage.setItem("Email", Authresponse["Email"]);
            setAuthResponse(Authresponse);
            //let userHydrographs = await fetch(`/api/hydrographs?userId=${encodeURIComponent(Authresponse.Id)}`, { method: 'GET' });
            //let userHydrographsObj = await userHydrographs.json();
            //setHydrographs(userHydrographsObj);

            let userCatchments = await fetch(
                `/api/UrbanCatchments?userId=${encodeURIComponent(Authresponse.Id)}`,
                { method: "GET" }
            );
            let serverCatchmentsArray = await userCatchments.json();

            let userCatchmentsArray = serverCatchmentsArray.map(
                (catchmentObj) => {
                    return new Catchment(
                        catchmentObj.Id,
                        catchmentObj.CatchmentDescription,
                        Number(catchmentObj.ImperviousPercent),
                        Number(catchmentObj.SlopePercent),
                        Number(catchmentObj.CurveNumber),
                        Number(catchmentObj.FlowLength)
                    );
                }
            );

            setCatchments(userCatchmentsArray);

            let userStorms = await fetch(
                `/api/Storms?userId=${encodeURIComponent(Authresponse.Id)}`,
                { method: "GET" }
            );
            let serverStormsArray = await userStorms.json();

            let userStormsArray = serverStormsArray.map((stormObj) => {
                return new Storm(
                    stormObj.Id,
                    stormObj.StormDescription,
                    stormObj.Time.split(",").map((value) => Number(value)),
                    stormObj.Value.split(",").map((value) => Number(value))
                );
            });

            setStorms(userStormsArray);

            console.log(storms);
        } catch (error) {
            console.log(error);
        }
    };

    // The empty array argument makes it only check on mount, not rerender
    useEffect(() => {
        let token = localStorage.getItem("access_token");
        if (token !== null && token !== undefined && token !== "undefined") {
            setHasToken(true);
            handleHasToken(token);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={mainStyle}>
                <Header
                    loginState={hasToken ? true : false}
                    appView={appView}
                    loginButton={loginButton}
                    accountViewButton={accountViewButton}
                    appViews={appViews}
                    setView={setView}
                ></Header>
                {hasToken === true ? (
                    authResponse ? (
                        viewController()
                    ) : (
                        <HydroSimView></HydroSimView>
                    )
                ) : (
                    <Login
                        isRegistering={isRegistering}
                        handleNotRegistering={() => {
                            setRegistering(false);
                        }}
                        handleRegistering={() => setRegistering(true)}
                    ></Login>
                )}
                <Footer/>
            </Box>
        </ThemeProvider>
    );
}
