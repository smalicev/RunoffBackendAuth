﻿import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

export default function DenseXYTable({ XLabel, YLabel, XData, YData }) {

    const theme = useTheme();
    return (
        <TableContainer sx={{ padding: '1rem', backgroundColor:'primary.main', minWidth: 150, maxWidth: 250 }} component={Paper}>
            <Table sx={{ minWidth: 150, maxWidth: 250 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ borderColor: 'black' }}>{XLabel}</TableCell>
                        <TableCell align="right" sx={{ borderColor: 'black' }}>{YLabel}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {XData.map((row,idx) => (
                        <TableRow

                            key={XData[idx]}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{borderColor:'black'}} component="th" scope="row">
                                {XData[idx]}
                            </TableCell>
                            <TableCell sx={{ borderColor: 'black' }} align="right">{YData[idx]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}