import React from "react";


function EditMenu ( { editingObject, editSubmission } ) {

  let keys = editingObject ? Object.keys(editingObject) : null;
  let values = editingObject ? Object.values(editingObject) : null;

  let privateProperties = ['cumulativePrecipitation', 'timeStep', 'roughnessCoeff', 'sParameter', 'timeToPeak', 'id', 'precipitationData'];
  let publicNames = {
    precipitationDataIntensity: 'Precipitation (intensity - mm/hr)',
    timeData: 'Time series (minutes)',
    name: 'Name or description',
    areaHectares: 'Area (hectares)',
    imperviousPercent: 'Percent Impervious (%)',
    slopePercent: 'Slope Percent (%)',
    curveNumber: 'SCS Curve Number',
    flowLength: 'Flow length (m)'

  }

  const EditMenuStyle = {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    padding: '2rem',
    border: '2px solid rgba(92, 92, 92, 0.404)',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
  }

  const editMenuFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    textAlign: 'right',
    fontSize: '1.25rem'
  }

  const submissionStyle = {
    padding: '1rem',
    alignSelf: 'right',
    fontSize: '1.5rem'

  }

  const inputStyle = {

    fontSize: '1.25rem'

  }


return ( 
  <div style={EditMenuStyle} className="edit-menu">
    <h2>Editing {editingObject.name}</h2>
    <form style={editMenuFormStyle}>
      {keys.map((property,idx) => {

        if (privateProperties.includes(property)) {
        } else {
          return  <label key={property}>{publicNames[property]}: <input style={inputStyle} key={property} name={property} defaultValue={values[idx]}></input></label>
        }
      })}
    <button style={submissionStyle} onClick ={editSubmission} type='button'> Submit Edits and Recalculate </button>
    </form>
  </div>
);
}

export { EditMenu as default };
