import React from "react";
import HydrographList from "./HydrographList";
import Hydrograph from "../hydrograph.mjs";
import CollapsibleTable from "./CollapsibleTable";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Image from "next/image";
import documentation from "../../../public/documentation.svg";
import NestedModal from "./NestedModal";
import Paper from "@mui/material/Paper";
function Sidebar({
    title,
    tools,
    DataObjectArray,
    accordionClick,
    modalText,
    childModalText,
}) {
    const theme = useTheme();

    const style = {
        backgroundColor: "primary.dark",
        display: "flex",
        color: "secondary.main",
        textShadow: "0px 0px 2px rgba(0, 0, 0, 0.26)",
        flexDirection: "column",
        rowGap: "1rem",
        justifyContent: "flex-start",
        minHeight: "70vh",
        height:'100%',
        padding: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 28px 20px",
        ul: {
            display: "flex",
            flexDirection: "column",
            listStyleType: "none",
            rowGap: "1rem",
        },
    };
    // <CollapsibleTable DataObjectArray={DataObjectArray} display={accordionClick}></CollapsibleTable>

    const toolStyle = {
        display: "flex",
        flexDirection: "row",
        columnGap: "1rem",
        justifyContent: "space-around",
        padding: "1rem",
        borderTop: "2px solid #ffb300",
    };

    return (
        <Paper elevation={10} color="secondary.main" sx={style}>
            <Paper elevation={20} sx={{ color:'secondary.main', backgroundColor:'primary.main', height:'100%', padding:'1.5rem'} }>
                <h1>{title}</h1>
                <ul style={style.ul}>
                    <NestedModal
                        modalText={modalText}
                        childModalText={"tet"}
                        buttonLabel={"Documentation"}
                        icon={
                            <Image
                                src={documentation}
                                height={"3rem"}
                                width={"3rem"}
                                alt="icon of a sheet of paper"
                            />
                        }
                    ></NestedModal>
                </ul>

                {title === "HydroSim" ? (
                    <>
                        <h4>Tools</h4>
                        <div style={toolStyle}>
                            {tools ? tools : null }
                        </div>{" "}
                    </>
                ) : null}
            </Paper>
        </Paper>
    );
}

export { Sidebar as default };
