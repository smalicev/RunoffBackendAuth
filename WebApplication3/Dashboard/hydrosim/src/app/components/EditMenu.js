import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import save from "../../../public/save.svg";
import add from "../../../public/add.svg";
import deletesvg from "../../../public/delete.svg";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
function EditMenu({
    editingObject,
    editSubmission,
    saveEdits,
    deleteButton,
    editButton,
}) {
    const [formStateObject, setFormStateObject] = useState(
        editingObject ? editingObject : {}
    );
    const theme = useTheme();

    useEffect(() => {
        setFormStateObject(editingObject);
    }, [editingObject]);

    let privateProperties = [
        "cumulativePrecipitation",
        "timeStep",
        "roughnessCoeff",
        "sParameter",
        "timeToPeak",
        "id",
        "precipitationData",
        "perviousArea",
        "timeOfConcentration",
        "numberOfReservoirs",
        "airportMethod",
        "bransbyWilliamsMethod"
    ];
    let publicNames = {
        name: "Name",
        precipitationDataIntensity: "Precipitation (intensity - mm/hrs)",
        timeData: "Time series (minutes)",
        areaHectares: "Area (hectares)",
        imperviousPercent: "Percent Impervious (%)",
        slopePercent: "Slope Percent (%)",
        curveNumber: "SCS Curve Number",
        flowLength: "Flow length (m)",
        initialAbstraction: 'Initial Abstraction (mm)',
        runoffCoefficient: 'Runoff Coefficient (0 - 1)'
    };

    const EditMenuStyle = {
        display: "flex",
        flexDirection: "column",
        bgcolor: "primary.main",
        rowGap: "0.5rem",
        padding: "2rem",
        textShadow: "0px 0px 2px rgba(0, 0, 0, 0.26)",
        borderRadius: "1rem",
    };

    const editMenuFormStyle = {
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        textAlign: "right",
        fontSize: "1.25rem",
    };

    return (
        <Paper elevation={20} sx={EditMenuStyle}>
            <Typography color="secondary.main" sx={{ fontSize: "2rem" }}>
                {editingObject.name}
            </Typography>
            <form style={editMenuFormStyle}>
                {(formStateObject ? Object.keys(formStateObject) : []).map(
                    (property) => {
                        if (privateProperties.includes(property)) {
                        } else {
                            console.log(property, formStateObject[property])
                            return (
                                <FormControl
                                    key={property}
                                    fullWidth={true}
                                    sx={{ m: 1 }}
                                    variant="filled"
                                    color="secondary"
                                >
                                    <InputLabel
                                        color="secondary"
                                        htmlFor={property}
                                    >
                                        {publicNames[property]}
                                    </InputLabel>
                                    <FilledInput
                                        id={property}
                                        type="text"
                                        label={property}
                                        sx={{
                                            "& .MuiOutlinedInput-notchedOutline":
                                                {
                                                    borderColor: "black",
                                                },
                                            "&:hover > .MuiOutlinedInput-notchedOutline":
                                                {
                                                    borderColor:
                                                        theme.palette.secondary
                                                            .main,
                                                },
                                        }}
                                        value={formStateObject[property]}
                                        onChange={(e) => {
                                            console.log('did change on option select')
                                            setFormStateObject({
                                                ...formStateObject,
                                                [property]: e.target.value,
                                            });
                                        }}
                                    />
                                </FormControl>
                            );
                        }
                    }
                )}
                <Box sx={{ width: '100%', display: 'flex', flexDirection:'row', justifyContent:'space-evenly'} }>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                            console.log(formStateObject)
                            editSubmission(formStateObject);
                            editButton(formStateObject);
                        }}
                        type="button"
                    >
                        
                        <Image
                            src={save}
                            height="10%"
                            width="10%"
                            alt="save icon"
                        />
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                            editSubmission(formStateObject);
                            saveEdits(formStateObject);
                        }}
                        type="button"
                    >
                        NEW{"     "}
                        <Image
                            src={add}
                            height="10%"
                            width="10%"
                            alt="add icon"
                        />
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                            deleteButton(formStateObject);
                        }}
                        type="button"
                    >
                        {"     "}
                        <Image
                            src={deletesvg}
                            height="10%"
                            width="10%"
                            alt="delete icon"
                        />
                    </Button>
                </Box>
                
            </form>
        </Paper>
    );
}

export { EditMenu as default };
