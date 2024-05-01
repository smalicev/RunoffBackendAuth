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
import Hydrograph from "../hydrograph.mjs";
import { paginate } from "../numericalMethods.mjs"
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
Chart.register(LinearScale);
Chart.register(CategoryScale);

function HydroSimView( { Id, Hydrographs} ) {

  const [catchments, setCatchments] = useState(0);
  const [storms, setStorms] = useState(0);
  const [parent, setParent] = useState(null);
  const [editingModeOn, setEditing] = useState(false);
  const [currentStorm, setCurrentStorm] = useState(null)
  const [currentCatchment, setCurrentCatchment] = useState(null)
  const [currentHydrograph, setCurrentHydrograph] = useState(null)
  const [contextMenuOn, setContextMenu] = useState(false)
  const [context, setCurrentContext] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const [hydrographs, setHydrographs] = useState(Hydrographs);
    const [paginatedHydrographs, setPaginatedHydrographs] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hydrgraphRefTable, setHydrographRefTable] = useState(null);
    const theme = useTheme();

    function hydrographsToRefObject(hydrographs) {
        let refObject = {};

        hydrographs.forEach((hydrographObject) => {
            refObject[hydrographObject.Id] = hydrographObject;
        })
        console.log(refObject)
        return refObject;
    }

    // for first page load
    useEffect(() => {

        if (hydrographs !== null && hydrographs !== undefined) {
            setPaginatedHydrographs(paginate(hydrographs))
            setHydrographRefTable(hydrographsToRefObject(hydrographs))
        }

    }, [hydrographs])


    //for updates 
  useEffect(() => {
      async function submitHydrograph(hydrograph) {
          let hydrographSubmission = await fetch('/api/hydrographs/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hydrograph) })
      }

      if (currentCatchment !== null && currentStorm !== null) {
          let hydrograph = new Hydrograph(0, currentStorm, currentCatchment);
          let submissionHydrograph = { Time: hydrograph.Time.toString(), Value: hydrograph.Value.toString(), userId: Id, StormName: currentStorm.name.toString(), CatchmentName: currentCatchment.name.toString(), DateInserted: (new Date()).toISOString().split('T')[0] }
          setCurrentHydrograph(hydrograph)

          try {
              submitHydrograph(submissionHydrograph);
          } catch(e) {
              console.error('error:', e)
          }

          getHydrographs();
      }

  }, [currentCatchment, currentStorm])


    async function getHydrographs() {
        let userHydrographs = await fetch(`/api/hydrographs?userId=${encodeURIComponent(Id)}`, { method: 'GET' });
        let userHydrographsObj = await userHydrographs.json();
        console.log(userHydrographsObj)
        setHydrographs(userHydrographsObj);

    }

    // grab form inputs without setting states for every single field
    // useRef to store values
  const inputsRef = useRef({});

    const tabStyle = {
        bgcolor: 'primary.main',
        display: 'flex',
        color: 'primary.contrastText',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 28px 20px',
    height: '100vh',
    width: '20%',
    padding: '2rem',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '4rem'
  }

    const HydroSimViewStyle = {
        bgcolor: 'primary.dark',
        display: 'flex',
        color: 'primary.contrastText',
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

    function handleHydrographClick(hydrographId) {
        console.log(hydrographId)
        console.log(hydrgraphRefTable[hydrographId])

        let selectedHydrograph = hydrgraphRefTable[hydrographId];

        setCurrentHydrograph(selectedHydrograph)
    }

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

  function handleAddCatchment() {
    let id = catchments;
    setCatchments(catchments + 1);
    let newCatchment = new Catchment(id, 'Default Catchment')
    setCurrentCatchment(newCatchment);
  } 
  
  async function handleAddStorm() {
    let id = storms;
    setStorms(storms + 1);
    let newStorm = new Storm(id, 'Default Storm')
    setCurrentStorm(newStorm);
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
      console.log(hydrographs)
    if (event.target.className !== 'contextMenu' && contextMenuOn) {
      setContextMenu(false)
    }
      console.log(event.target.className)
      console.log(event.target.value)
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
    labels: typeof currentHydrograph.Time === 'string' ? currentHydrograph.Time.split(',') : currentHydrograph.Time,
    datasets: [ 
      { label: 'Runoff Curve',
            data: typeof currentHydrograph.Value === 'string' ? currentHydrograph.Value.split(',') : currentHydrograph.Value
}
    ]
  } : null;

  /*
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

  {currentHydrograph ? <PieChart chartData={PieData} header={currentHydrograph.name} /> : null}

  */

return ( 
    <DndContext  id="1" onDragEnd={handleDragEnd} onDragStart={handleDragStart} >
      <Box sx = {HydroSimViewStyle} onClick={handleOnClick}>
            <Sidebar accordionClick={handleHydrographClick}
                totals={[{ 'catchments': catchments }, { 'storms': storms }]}
                title={'HydroSim' }
                firstChild={draggableCatchmentMarkup}
                secondChild={draggableStormMarkup}
                DataObjectArray={hydrographs ? hydrographs : Hydrographs ? Hydrographs : []}>
            </Sidebar>
        <div  onContextMenu={handleContextMenu}>
          <Droppable 
            currentStorm={currentStorm} 
            currentCatchment={currentCatchment} 
                    draggableCurrentStorm=
                    {currentStorm ? 
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
                    draggableCurrentCatchment=
                    {currentCatchment ? 
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
        <Box sx={tabStyle} >
                {currentHydrograph ? <LineChart XLabel='Time (minutes)' YLabel='Runoff (m\u00B3)' Context='Simulated runoff hydrograph based on provided storm and catchment' chartData={LineData}
                    header={currentHydrograph.name ? currentHydrograph.name : `${currentHydrograph.StormName} on ${currentHydrograph.CatchmentName}`} />
                    : <h4>Add a catchment and storm to get started. <br /> <br /></h4>}
          {editingModeOn ? <EditMenu editSubmission={handleEditSubmission} editingObject={context}></EditMenu> : null}
          
        </Box>
      </Box>
    </DndContext>
);
}

export { HydroSimView as default };