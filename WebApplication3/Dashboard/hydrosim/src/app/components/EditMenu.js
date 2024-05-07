import React from "react";
import { useState } from "react";
import Register from "./Register";
import Hoverable from "./Hoverable";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Paper from '@mui/material/Paper';
import Image from 'next/image'
import save from "../../../public/save.svg"
import { useTheme } from '@mui/material/styles';
import { Typography } from "@mui/material";
function EditMenu({ editingObject, editSubmission, saveEdits}) {
    const [formStateObject, setFormStateObject] = useState(editingObject ? editingObject : 5)
  let keys = editingObject ? Object.keys(editingObject) : null;
  let values = editingObject ? Object.values(editingObject) : null;
  const theme = useTheme();


    

  let privateProperties = ['cumulativePrecipitation', 'timeStep', 'roughnessCoeff', 'sParameter', 'timeToPeak', 'id', 'precipitationData'];
    let publicNames = {
        name: 'Name',
    precipitationDataIntensity: 'Precipitation (intensity - mm/hr)',
    timeData: 'Time series (minutes)',
    areaHectares: 'Area (hectares)',
    imperviousPercent: 'Percent Impervious (%)',
    slopePercent: 'Slope Percent (%)',
    curveNumber: 'SCS Curve Number',
    flowLength: 'Flow length (m)'

    }


  const EditMenuStyle = {
    display: 'flex',
      flexDirection: 'column',
      bgcolor: 'primary.main',
    rowGap: '1rem',
      padding: '2rem',
      textShadow: '0px 0px 2px rgba(0, 0, 0, 0.26)',
      borderRadius: '1rem'
  }

  const editMenuFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    textAlign: 'right',
    fontSize: '1.25rem'
  }



return ( 
    <Paper elevation={20} sx={EditMenuStyle}>
        <Typography sx={{ fontSize: 'small', marginBottom: '-1rem', letterSpacing: '0.15rem', textShadow: '0px 0px 3px rgba(0, 0, 0, 0.56)', } }>
            Editing
        </Typography>
        <Typography color='secondary.main' sx={{ fontSize: '2rem' }} >{editingObject.name}</Typography>
    <form style={editMenuFormStyle}>
      {keys.map((property,idx) => {

        if (privateProperties.includes(property)) {
        } else {
            return <FormControl key={property} fullWidth={true} sx={{ m: 1 }} variant="filled" color='secondary' value={formStateObject[property]} onChange={(e) => {
                setFormStateObject({ ...formStateObject, [property]: e.target.value });
            }
          }>
                <InputLabel color='secondary' htmlFor={property}>{publicNames[property]}</InputLabel>
                        <FilledInput 
                            id={property}
                            type='text'
                            label={property}
                            defaultValue={editingObject[property]}
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'black',
                                },
                                "&:hover > .MuiOutlinedInput-notchedOutline": {
                                    borderColor: theme.palette.secondary.main
                                }
                            }}
                        />
                 </FormControl>
        }
      })}
            <Button fullWidth={true} color='secondary' variant="contained" onClick={() => editSubmission(formStateObject)} type='button'>Recalculate </Button>
            <Button color='secondary' variant="contained" onClick={() => saveEdits(formStateObject)} type='button'><Image src={save}
                                                                                                                                                height='10%'
                                                                                                                                                width='10%'
                                                                                                                                                alt='save icon'/> 
                                                                                                                                                </Button>
    </form>
  </Paper>
);
}

export { EditMenu as default };
