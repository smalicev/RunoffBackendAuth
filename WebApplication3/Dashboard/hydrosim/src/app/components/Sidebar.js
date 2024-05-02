import React from "react";
import HydrographList from "./HydrographList"
import Hydrograph from "../hydrograph.mjs";
import CollapsibleTable from "./CollapsibleTable";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Image from 'next/image'
import documentation from "../../../public/documentation.svg"
import NestedModal from "./NestedModal"

function Sidebar ( { title, firstChild, secondChild, DataObjectArray, accordionClick, modalText, childModalText } ) {
    const theme = useTheme();


    const style = {
                    backgroundColor: 'primary.main',
                    display: 'flex',
        color: 'black',
        textShadow: '0px 0px 2px rgba(0, 0, 0, 0.26)',
                  flexDirection: 'column',
                  rowGap: '1rem',
                  justifyContent: 'flex-start',
                  height: '100vh',
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
                      columnGap: '1rem',
                      justifyContent: 'space-around',
                      padding: '1rem',
                      borderTop: '2px solid #ffb300',
                    }

    return ( 
    
        <Box color='secondary.main'
            sx={style}>
    
      <h1>{title}</h1>
      <ul style={style.ul}>
                <NestedModal modalText={modalText} childModalText={'tet' } buttonLabel={'Documentation'} icon={<Image
                    src={documentation}
                    height={'3rem'}
                    width={'3rem'}
                    alt='icon of a sheet of paper'
                /> }> 
                                
                </NestedModal>
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
