import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Image from "next/image";
import swmShare from "../../../public/swmshare.svg";
import appsPicker from "../../../public/appsPicker.svg";
import Logout from "../../../public/logout.svg";
import Wrench from "../../../public/wrench.svg";
import Rain from "../../../public/rain.svg";
import Building from "../../../public/buildingRainGrass.svg";
import Login from "../../../public/login.svg";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
function ResponsiveAppBar({
    pages,
    settings,
    appButton,
    loginButton,
    loginState,
    View,
}) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();

    const viewImages = {
        HydroSim: {
            Image: Building,
            alt: "Icon showing a building with rain and grass",
        },
        StormTab: { Image: Rain, alt: "Icon showing cloud with precipitation" },
    };

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        if (name === null) {
            name = "Guest";
        }

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name[0]}`,
        };
    }

    function handleLogout() {
        localStorage.removeItem("access_token");
        loginButton();
    }

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (viewName) => {
        setAnchorEl(null);
        let view = typeof viewName === "string" ? viewName : View;
        appButton(view);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            sx={{ bgcolor: "primary.veryDark" }}
            width="100%"
            position="static"
        >
            <Container maxWidth="xl">
                <Toolbar
                    style={{ display: "flex", justifyContent: "space-between" }}
                    disableGutters
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "2rem",
                            justifyContent: "space-between",
                        }}
                    >
                        <Image
                            src={swmShare}
                            height={150}
                            width={150}
                            alt="the SwmShare Logo"
                        />
                        {loginState ? (
                            <>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            padding: "0.5rem",
                                            paddingRight: "1rem",
                                            paddingLeft: "1rem",
                                            backgroundColor: "secondary.main",
                                        }}
                                        elevation={40}
                                    >
                                        <Typography
                                            sx={{
                                                textShadow:
                                                    "0px 0px 2px rgba(0, 0, 0, 0.26)",
                                                fontWeight: "light",
                                            }}
                                            color={"black"}
                                            variant={"h5"}
                                        >
                                            {" "}
                                            CREATE | SIMULATE | MODEL | SHARE{" "}
                                        </Typography>
                                    </Paper>
                                    <Paper
                                        sx={{
                                            padding: "0.5rem",
                                            paddingRight: "1rem",
                                            paddingLeft: "1rem",
                                            backgroundColor: "primary.veryDark",
                                        }}
                                        elevation={40}
                                    >
                                        <Typography
                                            sx={{
                                                textAlign: "center",
                                                textShadow:
                                                    "0px 0px 2px rgba(0, 0, 0, 0.26)",
                                                fontWeight: "light",
                                            }}
                                            color={"secondary.light"}
                                            variant={"h7"}
                                        >
                                            {" "}
                                            Stormwater Management Modelling
                                            Toolbox
                                        </Typography>
                                    </Paper>
                                </Box>
                                <IconButton
                                    id="basic-button"
                                    size="large"
                                    aria-controls={
                                        open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    color="inherit"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                >
                                    <Box sx={{backgroundColor:'inherit', display:'flex'} }>
                                        <Image
                                            src={Wrench}
                                            height={40}
                                            width={40}
                                            style={{marginRight:'-1.5rem', marginTop:'-1rem'} }
                                            alt="Icon representing app list"
                                        />                                        <Image
                                            src={appsPicker}
                                            height={50}
                                            width={50}
                                            alt="Icon representing app list"
                                        />
                                    </Box>
                                    
                                </IconButton>
                                <Menu
                                    disableScrollLock={true}
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                        disableScrollLock: "true",
                                        marginThreshold: "null",
                                    }}
                                >
                                    {pages.map((view, idx) => {
                                        return (
                                            <MenuItem
                                                sx={{display:'flex', columnGap:'0.5rem'} }
                                                key={view}
                                                onClick={() => {
                                                    handleClose(view);
                                                }}
                                            >
                                                {view}{" "}
                                                <Image
                                                    src={viewImages[view]['Image']}
                                                    height={30}
                                                    width={30}
                                                    alt={viewImages[view]['alt']}
                                                />
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>{" "}
                            </>
                        ) : (
                            <>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            padding: "0.5rem",
                                            paddingRight: "1rem",
                                            paddingLeft: "1rem",
                                            backgroundColor: "secondary.main",
                                        }}
                                        elevation={40}
                                    >
                                        <Typography
                                            sx={{
                                                textShadow:
                                                    "0px 0px 2px rgba(0, 0, 0, 0.26)",
                                                fontWeight: "light",
                                            }}
                                            color={"black"}
                                            variant={"h5"}
                                        >
                                            {" "}
                                            CREATE | MODEL | SIMULATE | SHARE{" "}
                                        </Typography>
                                    </Paper>
                                    <Paper
                                        sx={{
                                            padding: "0.5rem",
                                            paddingRight: "1rem",
                                            paddingLeft: "1rem",
                                            backgroundColor: "primary.veryDark",
                                        }}
                                        elevation={40}
                                    >
                                        <Typography
                                            sx={{
                                                textAlign: "center",
                                                textShadow:
                                                    "0px 0px 2px rgba(0, 0, 0, 0.26)",
                                                fontWeight: "light",
                                            }}
                                            color={"secondary.light"}
                                            variant={"h7"}
                                        >
                                            {" "}
                                            Stormwater Management Modelling
                                            Toolbox
                                        </Typography>
                                    </Paper>
                                </Box>
                            </>
                        )}

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon
                            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                        />
                    </div>

                    <div>
                        {loginState ? (
                            <IconButton
                                onClick={() => {
                                    appButton("Account");
                                }}
                            >
                                {/* //<Avatar {...stringAvatar(localStorage.getItem('Email'))} /> */}
                            </IconButton>
                        ) : null}

                        {loginState ? (
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={handleLogout}
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    columnGap: "0.5rem",
                                    textAlign: "center",
                                    alignItems: "center",
                                }}
                                size="small"
                            >
                                SIGN OUT{" "}
                                <Image
                                    src={Logout}
                                    height={25}
                                    width={25}
                                    alt="logout button (exit sign)"
                                />
                            </Button>
                        ) : (
                            <Button
                                color="secondary"
                                variant="contained"
                                size="small"
                                onClick={loginButton}
                                style={{
                                    marginLeft: "0.5rem",
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    columnGap: "0.5rem",
                                    textAlign: "center",
                                    alignItems: "center",
                                }}
                            >
                                SIGN IN
                                <Image
                                    src={Login}
                                    height={25}
                                    width={25}
                                    alt="login button (entrance sign)"
                                />
                            </Button>
                        )}
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
