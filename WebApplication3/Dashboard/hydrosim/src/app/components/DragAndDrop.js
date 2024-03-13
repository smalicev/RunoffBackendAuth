import React, {useState} from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable } from "./Draggable.jsx";
import { Droppable } from "./Droppable.jsx";


export default function DragAndDrop () {

    const [parent, setParent] = useState(null);
    const draggableMarkup = (
      <Draggable id="draggable">Drag me</Draggable>
    );
  
    return (
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}

          <Droppable key='A' id='A'>
            {parent === 'A' ? draggableMarkup : 'Drop here'}
          </Droppable>
      </DndContext>
    );
  
    function handleDragEnd(event) {
      const {over} = event;
  
      // If the item is dropped over a container, set it as the parent
      // otherwise reset the parent to `null`
      setParent(over ? over.id : null);
    }
};
