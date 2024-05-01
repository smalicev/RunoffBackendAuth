import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

function Row({ row, displayButton }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.DateInserted}
                </TableCell>
                <TableCell align="right">{row.CatchmentName}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ maxWidth:'120px', paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Time</TableCell>
                                        <TableCell>{row.CatchmentName ? 'Catchment Name' : 'Storm Description'}</TableCell>
                                        {row.StormName ? <TableCell align="right">Storm Name</TableCell> : null}
                                    </TableRow>
                                </TableHead>
                                <TableBody> 
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                            {row.DateInserted}
                                            </TableCell>
                                        <TableCell>{row.CatchmentName || row.StormDescription}</TableCell>
                                        {row.StormName ? <TableCell align="right">{row.StormName}</TableCell> : null}
                                        <TableCell align="right"> <Button variant='contained' onClick={() => displayButton(row.Id) }>Display</Button></TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

/* Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};
*/

export default function CollapsibleTable({ DataObjectArray, display }) {

    const theme = useTheme();


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {DataObjectArray.map((object) => (
                            <Row displayButton={display} key={object.Id} row={object} />
                        ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
}