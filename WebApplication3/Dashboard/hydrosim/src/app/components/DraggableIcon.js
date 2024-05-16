import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable.jsx";
import { Droppable } from "./Droppable.jsx";
import Sidebar from "./Sidebar.js";
import Storm from "../storm.mjs";
import StormIcon from "./StormIcon";
import CatchmentIcon from "./CatchmentIcon";
import RuralCatchmentIcon from "./RuralCatchmentIcon";
import Hoverable from "./Hoverable";

import { paginate } from "../numericalMethods.mjs";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";


export default function DraggableIcon({ name, type = null }) {
    const iconTable = {
       UrbanCatchment: <CatchmentIcon></CatchmentIcon>,
        RuralCatchment: <RuralCatchmentIcon></RuralCatchmentIcon>,
        Storm: <StormIcon></StormIcon>,
    };

    return (
        <Draggable id={type ? type+name : name}>
            <Hoverable
                defaultStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "0.2rem solid rgba(0,0,0,0)",
                }}
                style={{
                    border: "0.2rem solid black",
                    borderRadius: "50%",
                    boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
                }}
            >
                {iconTable[name]}
            </Hoverable>
        </Draggable>
    );
}
