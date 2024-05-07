import React, {useState} from "react";
import { useTheme } from '@mui/material/styles';
export default function Hoverable(props) {
  const [hover, setHover] = useState(false);
    const theme = useTheme();

    let defaultStyle = props.defaultStyle;
    let hoverStyle = props.style;

  function handleMouseEnter() {
    setHover(true);
  }

  function handleMouseLeave() {
      setHover(false);
  }


    const style = hover ? {
        ...defaultStyle,
        backgroundColor: theme.palette.primary.dark,
        border: hoverStyle ? hoverStyle.border : undefined,
        borderRadius: hoverStyle ? hoverStyle.borderRadius : undefined,
        boxShadow: hoverStyle ? hoverStyle.boxShadow : undefined,

  } : defaultStyle;


  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={style}>
      {props.children}
    </div>
  );
}