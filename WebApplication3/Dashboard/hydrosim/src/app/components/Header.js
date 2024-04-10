import React from "react";
import swmShare from "../../../public/swmshare.svg"
import Image from 'next/image'
import Button from '@mui/material/Button';

function Header({ loginState, loginButton}) {

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.25) 5px 0px 6px',
        zIndex: '5',

    }

    function handleLogout() {
        localStorage.removeItem('access_token');
    }

    return (
        <div style={headerStyle}>
            <Image 
                src={swmShare}
                height={200}
                width={200}
                alt='the SwmShare Logo'
                />
            {loginState ? <Button variant="contained" onClick={handleLogout}>Logout</Button> : <Button variant="contained" onClick={loginButton}>Login</Button> }
        </div>
    );
}

export { Header as default };
