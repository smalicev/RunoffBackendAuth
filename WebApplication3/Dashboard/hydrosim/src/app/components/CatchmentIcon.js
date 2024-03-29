import React from "react";
import catchmentIcon from "../../../public/catchment.svg"
import Image from 'next/image'

export default function CatchmentIcon( { style } ) {

  return (<>
    <Image data-type='catchment'
      src={catchmentIcon}
      height={100}
      width={100}
      alt = 'A logo of an urban street with buildings and other infrastructure'
      style={style}/>
    </>
  );
}

