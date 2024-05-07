'use client'
import React, {useState, useRef, useEffect} from "react";
import Image from 'next/image'
import styles from "../page.module.css";
import Sidebar from "./Sidebar.js";
import Chart from "chart.js/auto";
import { LinearScale, CategoryScale, LineElement, Legend, Tooltip } from "chart.js";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import EditMenu from "./EditMenu";
import Hoverable from "./Hoverable"
import { paginate } from "../numericalMethods.mjs";
import ChicagoStorm from "../tabulateChicago";
import BasicForm from "./BasicForm";
import sherman from "../../../public/sherman.svg"
import DenseXYTable from "./DenseXYTable";
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert';
import BasicCard from "./BasicCard";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
Chart.register(LinearScale);
Chart.register(CategoryScale);

function StormTabView( { Id, Storms} ) {

  const [parent, setParent] = useState(null);
  const [editingModeOn, setEditing] = useState(false);
  const [contextMenuOn, setContextMenu] = useState(false)
    const [context, setCurrentContext] = useState(false)
    const [currentStorm, setCurrentStorm] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null })
  const [storms, setStorms] = useState(Storms);
    const [stormRefTable, setStormRefTable] = useState(arrayToRefObject(Storms));
    const [currentValues, setCurrentValues] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const submissionStates = ['Success', 'Error', 'Server Error', 'Unknown']
    const theme = useTheme();
    const inputsRef = useRef({});
    function arrayToRefObject(arrayOfObjects) {
        let refObject = {};

        arrayOfObjects.forEach((object) => {
            refObject[object.Id] = object;
        })

        return refObject;
    }

    let formVariables = {
        varNames: ['Timestep', 'Duration', 'a', 'b', 'c', 'TimeToPeak'],
        varLabels: [ `Timestep (minutes)`, `Duration (minutes)`,`Variable 'a'`, `Variable 'b'`, `Variable 'c'`, `Time-to-peak (minutes)`],
    }

    function createStorm(formData) {
        let storm = new ChicagoStorm(
            Number(formData[0]),
            Number(formData[1]),
            Number(formData[2]),
            Number(formData[3]),
            Number(formData[4]),
            Number(formData[5]),
            formData[6],);
        storm.generateTab()
        setCurrentStorm(storm)
    }



    function handleStormClick(stormId) {
        console.log(storms)
        console.log(stormId)
        console.log(stormRefTable)
        console.log(stormRefTable[stormId])

        let selectedStorm = stormRefTable[stormId];
        setCurrentStorm(selectedStorm)
    }


    async function submitStorm() {
        let submissionStorm = { Time: currentStorm.time.toString(), Value: currentStorm.intensity.toString(), userId: Id, StormDescription: currentStorm.description.toString(), DateInserted: (new Date()).toISOString().split('T')[0] }
        try {
            let Stormsubmission = await fetch('/api/Storms/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submissionStorm) })
               console.log(Stormsubmission)
            if (Stormsubmission.status === 200) {
                setSubmissionStatus('Success')
                getStorms()
                setStormRefTable(arrayToRefObject(storms))
            } else if (Stormsubmission.status === 400) {
                setSubmissionStatus('Error')
            } else {
                setSubmissionStatus('Server Error')
            }
        } catch(error) {
            console.log(error)
        }
        
    }

    function submissionMessageController() {
        switch (submissionStatus) {
            case null:
                return null;
                break;
            case 'Success':
                return <Alert style={alertStyle} severity="success">Data saved.</Alert>
                break;  
            case 'Error':
                return <Alert style={alertStyle} severity="error">Input error - please check your inputs.</Alert>
                break;
            case 'Server Error':
                return < Alert style={alertStyle} severity="error" >Server error: service temporarily unavailable.</Alert>;
                break;
            default:
                return <Alert style={alertStyle} severity="error">Something unexpected occured. Please try again later.</Alert>
        }
    }


    async function getStorms() {
        try {
            let userStorms = await fetch(`/api/Storms?userId=${encodeURIComponent(Id)}`, { method: 'GET' });
            let userStormsObj = await userStorms.json();
            setStorms(userStormsObj);
            setStormRefTable(arrayToRefObject(storms))
        } catch (error) {
            console.log(error)
        }
    }


    const alertStyle = {
        display: 'block'
    }

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

    const StormTabViewStyle = {
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

  function handleEditSubmission() {

    let currentID = context.id;
    setEditing(false); {
      let newStorm = new ChicagoStorm(currentID,
                      inputsRef.current.name,
                      inputsRef.current.timeData.split(',').map((val)=> Number(val)),
                      inputsRef.current.precipitationDataIntensity.split(',').map((val)=> Number(val)))

      setCurrentStorm(newStorm);
    }

  }


  function handleOnClick(event) {
    if (event.target.className !== 'contextMenu' && contextMenuOn) {
      setContextMenu(false)
    }
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

  const LineData = currentStorm ?  {
      labels: typeof currentStorm.Time === 'string' ? currentStorm.Time.split(',') : currentStorm.time,
    datasets: [ 
      { label: 'Hyetograph (Chicago Storm Distribution)',
            data: typeof currentStorm.Value === 'string' ? currentStorm.Value.split(',') : currentStorm.intensity
}
    ]
  } : null;


return ( 
      <Box sx={StormTabViewStyle} onClick={handleOnClick}>
        <Sidebar accordionClick={handleStormClick} DataObjectArray={storms}
        title='StormTab'>
        </Sidebar>
        <Container>
                <Image data-type='sherman'
                  src={sherman}
                  height={200}
                  width={200}
                  alt='The Sherman I-D equation'/>
            <BasicForm formInputs={formVariables} submitButton={createStorm}></BasicForm>
        </Container>
        <Box sx={tabStyle} >
            {currentStorm ? <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', rowGap:'2rem' }}>
                <LineChart chartData={LineData} header={currentStorm.StormDescription} XLabel={'Time (minutes)'} YLabel={'Intensity (mm/hr)'} Context={'Rainfall Hyetograph based on provided inputs'}></LineChart>
                <BasicCard Title='Description' TextInput={currentStorm.StormDescription}></BasicCard>
                <DenseXYTable XLabel={'Time (minutes)'} YLabel={' Rainfall Intensity (mm/hr)'} XData={typeof currentStorm.Time === 'string' ? currentStorm.Time.split(',') : currentStorm.time} YData={typeof currentStorm.Value === 'string' ? currentStorm.Value.split(',') : currentStorm.intensity}></DenseXYTable>
                {currentStorm.Id ? null : <Button variant='contained' onClick={submitStorm}>SAVE</Button>}
                {submissionMessageController()}
            </div>
                : null}
          {editingModeOn ? <EditMenu editingObject={context}></EditMenu> : null}
        </Box>
      </Box>
);
}

export { StormTabView as default };