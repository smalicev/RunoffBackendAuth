import React from "react";
import Hoverable from "./Hoverable"


function HydrographList( { Hydrographs } ) {

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

    const toolStyle = {
        display: 'flex',
        flexDirection: 'row',
        rowGap: '1rem',
        justifyContent: 'space-around',
        padding: '1rem',
        borderTop: '2px solid rgba(92, 92, 92, 0.404)',
    }


    return (
        <div onClick={() => {
            console.log(Hydrographs)
        }}>
        <p>List is</p>
            {Hydrographs.map((graph) => {
                
                return <span key={graph.Value}>{graph.Value}</span>
        })}
        </div>
    );
}

export { HydrographList as default };
