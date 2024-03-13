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
  const [currentHydrograph, setCurrentHydrograph] = useState (null)

  let currentStorm = props.currentStorm;
  let currentCatchment = props.currentCatchment;
  let draggableCurrentStorm = props.draggableCurrentStorm;
  let draggableCurrentCatchment = props.draggableCurrentCatchment;

  const calcHydrograph = useMemo(() => setCurrentHydrographAndCalculate(), [currentStorm, currentCatchment]);
  

  function setCurrentHydrographAndCalculate() {
    if (currentStorm === null || currentCatchment === null) {
      return
    } else {
      setCurrentHydrograph(new Hydrograph(0,currentStorm, currentCatchment));
    }
  }

  const pushHydrograph = useMemo(() => props.func(currentHydrograph), [currentHydrograph])
  
  const style = {
    border: isOver ? '0.25rem solid rgba(0, 0, 0, .05)' : undefined,
    backgroundColor: isOver ? 'rgba(0, 0, 0, .3)' : undefined,
    borderRadius: '1rem'
  };
  
  
  return (
    <div ref={setNodeRef} style={style} >
      <div className={styles.hydrographContainer}>
            <div className={styles.catchmentSlot}> {draggableCurrentCatchment ? draggableCurrentCatchment : <CatchmentIcon style={ { opacity:0.5, borderRadius: '50%',  boxShadow: '0 0 10px 5px gray' } } ></CatchmentIcon>}</div>
            <div className={styles.stormSlot}> {draggableCurrentStorm ? draggableCurrentStorm : <StormIcon style={ { opacity: 0.5, border: 'solid 1px gray', borderRadius: '50%',  boxShadow: '0 0 10px 5px gray'} }></StormIcon>}</div>
              {(currentCatchment && currentStorm) ? <div className={styles.textSlot}>{currentStorm.name} on <br /> the {currentCatchment.name} catchment.</div > : <div className={styles.textSlot}>Runoff Hydrograph <br />  <br /> Drag & drop both catchment and storm icons to get started!</div> }
      </div>
    </div>
  );
}
