import React from "react";
import swmShare from "../../../public/swmshare.svg"
import Image from 'next/image'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ResponsiveAppBar from "./ResponsiveAppBar";

function Header({ loginState, loginButton, accountViewButton, appViews, setView, appView}) {


    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        minWidth: '100%',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.25) 5px 0px 6px',
        zIndex: '5',
    }

    return (
        <div style={headerStyle}>
                <ResponsiveAppBar loginButton={loginButton} loginState={loginState} appButton={setView} pages={appViews} View={appView}  settings={['test']}></ResponsiveAppBar>
        </div>
    );
}

export { Header as default };




