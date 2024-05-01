import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BasicCard({Title, TextInput}) {
    return (
        <Card sx={{ minWidth: 175,  maxWidth: 325 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {Title}
                </Typography>
                <Typography variant="body2">
                    {TextInput}
                </Typography>
            </CardContent>
        </Card>
    );
}