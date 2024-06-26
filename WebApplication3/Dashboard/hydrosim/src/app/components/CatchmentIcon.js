import React from "react";
import catchmentIcon from "../../../public/catchment.svg"
import Image from 'next/image'

export default function CatchmentIcon({empty }) {

    const style = {
        opacity: (empty ? 0.5 : 1),
        borderRadius: '50%',
        zIndex: 15,
        boxShadow: (empty? '0 0 10px 5px gray': null)
    }
    
  return (<>
    <Image data-type='catchment'
      src={catchmentIcon}
      height={70}
          width={70}
          style={style }
      alt = 'A logo of an urban street with buildings and other infrastructure'/>
    </>
  );
}

