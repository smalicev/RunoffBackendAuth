import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default function BasicForm({ submitButton, formInputs}) {
    // useRef shouldn't be used in callback functions, so how to make many of them?
    // array did not work with MUI Textfield inputRef.
    // just manually make a lot.
    const inputArray = [React.useRef(''), React.useRef(''), React.useRef(''), React.useRef(''), React.useRef(''), React.useRef(''), React.useRef('')]

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            style={{ display: 'flex', flexDirection: 'column' }}>

            {formInputs.varNames.map((variable, idx) => {
                return (<TextField
                    key={formInputs.varNames[idx]}
                    required
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
                label='Description'
                type="text"
                inputProps={{ maxLength: 48 }}
                InputLabelProps={{
                    shrink: true,
                }}
                inputRef={inputArray[formInputs.varNames.length]}
            />

            <Button variant='contained' onClick={() => {

                let formSubmissionArray = [];

                inputArray.forEach((input, idx) => {

                    formSubmissionArray.push(inputArray[idx].current.value);
                })

                console.log(formSubmissionArray);
                submitButton(formSubmissionArray)

            }}>CALCULATE</Button>
        </Box>
    );
}