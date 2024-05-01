import React from "react";
import swmShare from "../../../public/swmshare.svg"
import Image from 'next/image'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

function Account({exitAccountViewButton}) {

    const headerStyle = {
        position: 'fixed',
        left: '50%',
        bottom: '50%',
        transform: 'translate(-50%, 50%)',
        display: 'flex',
        width: '30%',
        flexDirection: 'column',
        rowGap: '3rem',
        zIndex: '12'
    }


    return (
        <div style={headerStyle}>
            <Button size='large' variant='contained' onClick={exitAccountViewButton }>Back to Dashboard</Button>
            <ul>
                <li>Email</li>
                <li>{localStorage.getItem('Email')}</li>
                <li>History</li>
                <li>Placeholder</li>
            </ul>
            
        </div>
    );
}

export { Account as default };




