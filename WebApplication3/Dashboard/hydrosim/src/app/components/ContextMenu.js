import React from "react";
import styles from "../page.module.css"
import Hoverable from "./Hoverable";


function ContextMenu ( { contextObject, mousePosition, editOnClick, deleteOnClick } ) {

  const contextMenuStyle = {
    top: mousePosition.y,
    left: mousePosition.x,
    'zIndex': 10,
    position: 'absolute',
    backgroundColor: 'var(--main-bg-color)',
    padding: '0.5rem',
    fontSize: '1.5rem'
  }

  const ulStyle = {
    listStyleType: 'none',
  }

  const liStyle = {
    borderTop: 'solid 1px rgba(92, 92, 92, 0.404)',
    borderBottom: 'solid 1px rgba(92, 92, 92, 0.404)'

  }

return ( 
  contextObject ? 
  <div style={contextMenuStyle}>
      <ul style={ulStyle}>
        <Hoverable>
          <li style={liStyle} className='contextMenu edit'>Edit {contextObject.name}</li>
        </Hoverable>
        <Hoverable>
          <li style={liStyle} className='contextMenu delete'>Delete {contextObject.name}</li>
        </Hoverable>
      </ul>
  </div> : null
);
}

export { ContextMenu as default };