import React, {useMemo, useState} from "react";
import {useDroppable} from '@dnd-kit/core';
import styles from "../page.module.css";
import Hydrograph from "../hydrograph.mjs";
import CatchmentIcon from "../components/CatchmentIcon"
import StormIcon from "../components/StormIcon"

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  let currentStorm = props.currentStorm;
  let currentCatchment = props.currentCatchment;
  let draggableCurrentStorm = props.draggableCurrentStorm;
  let draggableCurrentCatchment = props.draggableCurrentCatchment;

    const containerStyle = {
        border: isOver ? '0.1rem solid rgba(0, 0, 0, 1)' : undefined,
        backgroundColor: isOver ? 'rgba(0, 0, 0, 1)' : undefined,
        boxShadow: isOver ? 'rgba(0, 0, 0, 0.25) 15px 20px 38px, rgba(0, 0, 0, 0.22) 0px 20px 20px' : undefined,
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: '2rem',
        padding: '2rem',
        width: '35rem',
        height: '12rem',
        backgroundColor: 'rgba(225, 222, 228, 0.808)',
        borderRadius: '1rem',
        opacity: '0.9'
    }
  
  
  return (
      <div ref={setNodeRef} style={{display:'flex', justifyContent:'center'} }>
          <div style={containerStyle}>
            <div className={styles.catchmentSlot}> {draggableCurrentCatchment ? draggableCurrentCatchment : <CatchmentIcon style={ { opacity:0.5, borderRadius: '50%',  boxShadow: '0 0 10px 5px gray' } } ></CatchmentIcon>}</div>
            <div className={styles.stormSlot}> {draggableCurrentStorm ? draggableCurrentStorm : <StormIcon style={ { opacity: 0.5, border: 'solid 1px gray', borderRadius: '50%',  boxShadow: '0 0 10px 5px gray'} }></StormIcon>}</div>
      </div>
    </div>
  );
}
