import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Paper from "@mui/material/Paper";
export default function BasicForm({ submitButton, formInputs}) {
    // useRef shouldn't be used in callback functions, so how to make many of them?
    // array did not work with MUI Textfield inputRef.
    // just manually make a lot.
    const inputArray = [React.useRef(''), React.useRef(''), React.useRef(''), React.useRef(''), React.useRef(''), React.useRef(''), React.useRef('')]

    return (
        <Paper elevation={20}
            component="form"
            sx={{
                display: 'flex',
                backgroundColor: 'primary.main',
                flexDirection: 'column',
                alignItems: 'center',
                rowGap: '1rem',
                borderRadius: "1rem",
                padding: '2rem',
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">

            {formInputs.varNames.map((variable, idx) => {
                return (<TextField
                    key={formInputs.varNames[idx]}
                    required
                    color='secondary'
                    id="outlined-number"
                    label={formInputs.varLabels[idx]}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputRef={inputArray[idx]}
                />)
            })}

            <TextField
                required
                id="outlined-string"
                color='secondary'
                label='Description'
                type="text"
                inputProps={{ maxLength: 48 }}
                InputLabelProps={{
                    shrink: true,
                }}
                inputRef={inputArray[formInputs.varNames.length]}
            />

            <Button color="secondary"
                variant="contained" onClick={() => {

                let formSubmissionArray = [];

                inputArray.forEach((input, idx) => {

                    formSubmissionArray.push(inputArray[idx].current.value);
                })

                console.log(formSubmissionArray);
                submitButton(formSubmissionArray)

            }}>CALCULATE</Button>
        </Paper>
    );
}