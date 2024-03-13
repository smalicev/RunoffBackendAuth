import React, {useState} from "react";

export default function Hoverable(props) {
  const [hover, setHover] = useState(false);
  
  function handleMouseEnter() {
    setHover(true);
  }

  function handleMouseLeave() {
    setHover(false);
  }


  const style = hover ? {
    backgroundColor: 'rgba(0, 255, 179, 0.216)',

    borderRadius: props.style ? props.style.borderRadius : undefined,
    boxShadow: props.style ? props.style.boxShadow : undefined,

  } : undefined;


  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={style}>
      {props.children}
    </div>
  );
}