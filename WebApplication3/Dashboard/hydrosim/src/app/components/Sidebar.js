import React from "react";
import Hoverable from "./Hoverable"
import HydrographList from "./HydrographList"
import Hydrograph from "../hydrograph.mjs";
import CollapsibleTable from "./CollapsibleTable";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

function Sidebar ( { title, firstChild, secondChild, DataObjectArray, accordionClick } ) {
    const theme = useTheme();


    const style = {
                    bgcolor: 'primary.main',
        display: 'flex',
                    color:'primary.contrastText',
                  flexDirection: 'column',
                  rowGap: '1rem',
                  justifyContent: 'flex-start',
                  height: '100vh',
                  margin: '5px',
                  padding: '2rem',
                  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 28px 20px',
                  ul: { display: 'flex',
                        flexDirection: 'column',
                        listStyleType: 'none',
                        rowGap: '1rem',
                      },

                }

  const toolStyle = {
                      display: 'flex',
                      flexDirection: 'row',
                      rowGap: '1rem',
                      justifyContent: 'space-around',
                      padding: '1rem',
                      borderTop: '2px solid rgba(92, 92, 92, 0.404)',
                    }

    return ( 
    
        <Box
            sx={style}        >
    
      <div className="sidebar-name-container">
                <h1>{title}</h1>
      </div>
      <ul style={style.ul}>
        <Hoverable>
                    <h3>Documentation</h3>
        </Hoverable>
      </ul>

            {title === 'HydroSim' ?  <><h4>Tools</h4>
                                      <div style={toolStyle}>
                                      {firstChild ? firstChild : null}
                                      {secondChild ? secondChild : null}
                                        </div> </>
                                        : null}
             <CollapsibleTable DataObjectArray={DataObjectArray} display={accordionClick}></CollapsibleTable>
            

        
      
    </Box>
);
}

export { Sidebar as default };
