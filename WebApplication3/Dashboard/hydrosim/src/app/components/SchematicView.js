'use client'
import React, {useState, useRef, useEffect} from "react";
import Image from 'next/image'
import styles from "../page.module.css";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable.jsx";
import { Droppable } from "./Droppable.jsx";
import Sidebar from "./Sidebar.js";
import Storm from "../storm.mjs";
import Catchment from "../catchment.mjs";
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale, LineElement, Legend, Tooltip } from "chart.js";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import EditMenu from "./EditMenu";
import ContextMenu from "./ContextMenu";
import StormIcon from "./StormIcon"
import CatchmentIcon from "./CatchmentIcon"
import Hoverable from "./Hoverable"

Chart.register(LinearScale);
Chart.register(CategoryScale);

function SchematicView ( ) {


  const hydrographs = ['0']
  const [catchments, setCatchments] = useState(0);
  const [storms, setStorms] = useState(0);
  const [parent, setParent] = useState(null);
  const [editingModeOn, setEditing] = useState(false);
  const [currentStorm, setCurrentStorm] = useState(null)
  const [currentCatchment, setCurrentCatchment] = useState(null)
  const [currentHydrograph, setCurrentHydrograph] = useState(null)
  const [contextMenuOn, setContextMenu] = useState(false)
  const [context, setCurrentContext] = useState(false)
  const [mousePosition, setMousePosition] = useState({x:null, y:null})



  useEffect(() => {
    const savedStorm = localStorage.getItem('currentStorm');
    const savedCatchment = localStorage.getItem('currentCatchment');
    console.log(savedStorm)
    if (savedStorm) {
      setCurrentStorm(JSON.parse(savedStorm))
    }

    if (savedCatchment) {
      setCurrentCatchment(JSON.parse(savedCatchment))
    }
  }, [])


  const inputsRef = useRef({});

  const tabStyle = {
    backgroundColor: 'var(--main-bg-color)',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
    height: '100vh',
    width: '20%',
    padding: '2rem',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '4rem'
  }

  const schematicViewStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
  }

  function grabFormInputs() {
    let form = document.querySelector('form')
    let labels = form.children;

    for (let i = 0; i < labels.length -1 ; i ++) {
      inputsRef.current[labels[i].children[0].name] = labels[i].children[0].value;
    }
    console.log(inputsRef)

  }

  const draggableCatchmentMarkup = (
    <Draggable id='addCatchment'>
      <Hoverable style= { {borderRadius: '10%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',}}>
        <CatchmentIcon style={ { borderRadius: '50%', zIndex: 15}}></CatchmentIcon>
      </Hoverable>
    </Draggable>
    
  );
  const draggableStormMarkup = (
    <Draggable id='addStorm'> 
      <Hoverable style= { {borderRadius: '10%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',}}>
        <StormIcon style={ { borderRadius: '50%', zIndex: 15 }}></StormIcon>
      </Hoverable>
    </Draggable>
  );

  function handleContextMenu(event) {
    event.preventDefault();
    setEditing(false);
    console.log(event.target.dataset.type)
    setContextMenu(false);
    const {over} = event;

    if (event.target.dataset.type === 'storm') {
      setCurrentContext(currentStorm)
      setMousePosition({x: event.clientX, y: event.clientY})
      setContextMenu(true);
    } else if (event.target.dataset.type === 'catchment') {
      setCurrentContext(currentCatchment)
      setMousePosition({x: event.clientX, y: event.clientY})
      setContextMenu(true);
    } else {
    }

  }

  function pullHydrograph(containerHydrograph) {
    setCurrentHydrograph(containerHydrograph)
  }

  function handleAddCatchment() {
    let id = catchments;
    setCatchments(catchments + 1);
    let newCatchment = new Catchment(id, 'Default Catchment')
    setCurrentCatchment(newCatchment);
    localStorage.setItem('currentCatchment', JSON.stringify(newCatchment))
  } 
  
  async function handleAddStorm() {
    let id = storms;
    setStorms(storms + 1);
    let newStorm = new Storm(id, 'Default Storm')
    setCurrentStorm(newStorm);
    localStorage.setItem('currentStorm', JSON.stringify(newStorm))
      try {
          let response = await fetch('api/Users',
              {
                  method: 'POST',
                  headers: { "Content-Type": 'application/json' }, body: JSON.stringify({ name: 'jasonTEst', password: 'testpassword' })
              })
          let textResponse = await response.text();
          console.log(textResponse);
      } catch {
          throw new Error('Problem with POST request')
      }
  }

  function handleEditSubmission() {
    grabFormInputs();
    let currentID = context.id;
    setEditing(false);
    if (context === currentStorm) {
      let newStorm = new Storm(currentID,
                      inputsRef.current.name,
                      inputsRef.current.timeData.split(',').map((val)=> Number(val)),
                      inputsRef.current.precipitationDataIntensity.split(',').map((val)=> Number(val)))

      setCurrentStorm(newStorm);
      localStorage.setItem('currentStorm', JSON.stringify(newStorm))
    } else if (context === currentCatchment) {
      let newCatchment = new Catchment(currentID,
                          inputsRef.current.name,
                          Number(inputsRef.current.areaHectares),
                          Number(inputsRef.current.imperviousPercent),
                          Number(inputsRef.current.slopePercent),
                          Number(inputsRef.current.curveNumber),
                          Number(inputsRef.current.flowLength))
      setCurrentCatchment(newCatchment);
      localStorage.setItem('currentCatchment', JSON.stringify(newCatchment))
    }

  }


  function handleOnClick(event) {
    if (event.target.className !== 'contextMenu' && contextMenuOn) {
      setContextMenu(false)
    }
    console.log(event.target.className)
    if (event.target.className === 'contextMenu edit') {
      setEditing(false)
      setEditing(true)
    }

    if (event.target.className === 'contextMenu delete') {
      if (context === currentCatchment) {
        setCurrentCatchment(null);
      } else if (context === currentStorm) {
        setCurrentStorm(null);
      }
    }
  }

  function handleDragStart(event) {
    setEditing(false)
  }

  function handleDragEnd(event) {
    const {over} = event;
    let handlerPick = null;

    if (over === null && event.active.id.slice(0,5) === 'storm') {
      setCurrentStorm(null);
      return
    } else if (over === null && event.active.id.slice(0,9) === 'catchment') {
      setCurrentCatchment(null);
      return
    }

    if (event.active.id === 'addStorm') {
      handlerPick = handleAddStorm;
    } else if (event.active.id === 'addCatchment') {
      handlerPick = handleAddCatchment;
    }

    setParent(over ? over.id : null);
    (over ? handlerPick ? handlerPick() : null : null)
  }


  const LineData = currentHydrograph ?  {
    labels: currentHydrograph.finalRunoffTimeSeries,
    datasets: [ 
      { label: 'Runoff Curve',
    data: currentHydrograph.finalRunoffIncremental}
    ]
  } : null;

  const PieData = currentHydrograph ? {
    labels: [
      `Runoff (m\u00B3)`,
      `Losses (m\u00B3)`,
    ],
    datasets: [{
      label: 'Runoff Comparison (m\u00B3)',
      data: [currentHydrograph.totalLosses, (currentHydrograph.totalRunoff - currentHydrograph.totalLosses)],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
      ],
      hoverOffset: 4
    }]
  } : null;

return ( 
    <DndContext  id="1" onDragEnd={handleDragEnd} onDragStart={handleDragStart} >
      <div style = {schematicViewStyle} onClick={handleOnClick}>
        <Sidebar  totals={[{'catchments': catchments}, {'storms': storms}]} firstChild={draggableCatchmentMarkup} secondChild={draggableStormMarkup}>
        </Sidebar>
        <div  onContextMenu={handleContextMenu}>
          <Droppable func={pullHydrograph} 
            currentStorm={currentStorm} 
            currentCatchment={currentCatchment} 
            draggableCurrentStorm={ currentStorm ? 
                                                <Hoverable style= { {borderRadius: '10%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',}}> 
                                                  <Draggable 
                                                    data-type='storm'
                                                    id={'storm-' + currentStorm.id}>
                                                    <div className={styles.icon} data-type='storm'>
                                                      <StormIcon data-type='storm' style={ { borderRadius: '50%' } } >
                                                      </StormIcon>
                                                    </div>
                                                  </Draggable>
                                                </Hoverable> : null} 
            id={'0'} 
            draggableCurrentCatchment={ currentCatchment ? 
                                                <Hoverable style= { {borderRadius: '10%', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',}}> 
                                                  <Draggable
                                                    data-type='catchment'
                                                    id={'catchment-' + currentCatchment.id}>
                                                      <div className={styles.icon} data-type='catchment'>
                                                        <CatchmentIcon data-type='catchment' style={ { borderRadius: '50%' } }>
                                                          </CatchmentIcon>
                                                      </div>
                                                  </Draggable>
                                                </Hoverable> : null}>
          </Droppable>


          
          {contextMenuOn ? <ContextMenu contextObject={context} mousePosition={mousePosition}></ContextMenu>: null}
        </div>
        <div style={tabStyle} >
          {currentHydrograph ? <LineChart chartData={LineData} header={currentHydrograph.name} /> : <h4>Add a catchment and storm to get started. <br /> <br /></h4>}
          {currentHydrograph ? <PieChart chartData={PieData} header={currentHydrograph.name} /> : null}
          {editingModeOn ? <EditMenu editSubmission={handleEditSubmission} editingObject={context}></EditMenu> : null}
          
        </div>
      </div>
    </DndContext>
);
}

export { SchematicView as default };