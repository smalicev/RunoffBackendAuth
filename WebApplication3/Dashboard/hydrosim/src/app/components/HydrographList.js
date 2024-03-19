import React from "react";
import Hoverable from "./Hoverable"
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import Hydrograph from "../hydrograph.mjs";
import { useState } from "react"
import { LineWave } from "react-loader-spinner"

function HydrographList({ Hydrographs, paginatedHydrographs, accordionClick }) {
    const [ currentPage, setCurrentPage ] = useState(1);

    const style = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
        justifyContent: 'flex-start',
        height: '100vh',
        backgroundColor: 'var(--main-bg-color)',
        padding: '2rem',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
        ul: {
            display: 'flex',
            flexDirection: 'column',
            listStyleType: 'none',
            rowGap: '1rem',
        },

    }

    function handlePageClick(e) {
        setCurrentPage(e.target.id)
        console.log(paginatedHydrographs)
    }

    const toolStyle = {
        display: 'flex',
        flexDirection: 'row',
        rowGap: '1rem',
        justifyContent: 'space-around',
        padding: '1rem',
        borderTop: '2px solid rgba(92, 92, 92, 0.404)',
    }

    let pageToIndexNum = currentPage ? currentPage - 1 : 0;

    return (
        <> 
            {(Hydrographs && paginatedHydrographs) ?
                <>
                <Accordion key={pageToIndexNum}>
                {paginatedHydrographs[pageToIndexNum].map((graph) => {
                    return <AccordionItem onClick={ accordionClick } key={graph.Id} header={graph.DateInserted}>
                             <span>{graph.CatchmentName} with {graph.StormName}</span>
                            </AccordionItem>
                           
                    })
                }
              </Accordion>

            <div>
                {paginatedHydrographs.map((page, idx) => {
                    return (
                        <button onClick={handlePageClick} key={idx} id={ idx + 1 }>{idx +1}</button>
                )
                })}
            </div> </> : <LineWave></LineWave> }

        
        </>
    );
}

export { HydrographList as default };
