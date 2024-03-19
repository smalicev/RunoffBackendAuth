import React from "react";
import Hoverable from "./Hoverable"
import HydrographList from "./HydrographList"
import Hydrograph from "../hydrograph.mjs";


function Sidebar ( { totals, firstChild, secondChild, Hydrographs, paginatedHydrographs, accordionClick } ) {

  const style = {
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '1rem',
                  justifyContent: 'flex-start',
                  height: '100vh',
                  backgroundColor: 'var(--main-bg-color)',
                  padding: '2rem',
                  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
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
  <div>
    <nav style={style}>
      <div className="sidebar-name-container">
        <h1>Catchment Runoff Calculator</h1>
      </div>
      <ul style={style.ul}>
        <Hoverable>
          <h3>Schematic View (current view)</h3>
        </Hoverable>
        <Hoverable>
          <h3>Documentation (WIP - static page)</h3>
        </Hoverable>
      </ul>

      <h4>Tools</h4>
      <div style={toolStyle}>
      {firstChild ? firstChild : null}
      {secondChild ? secondChild : null}
            </div>
      <h4>Previous Hydrographs</h4>
            <HydrographList accordionClick={accordionClick} paginatedHydrographs={paginatedHydrographs ? paginatedHydrographs: null} Hydrographs={Hydrographs}></HydrographList>

        
      
    </nav>
  </div>
);
}

export { Sidebar as default };
