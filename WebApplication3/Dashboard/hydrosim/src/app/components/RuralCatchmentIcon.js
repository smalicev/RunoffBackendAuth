import React from "react";
import ruralCatchmentIcon from "../../../public/rural.svg"
import Image from 'next/image'

export default function RuralCatchmentIcon({empty }) {

    const style = {
        opacity: (empty ? 0.5 : 1),
        borderRadius: '50%',
        zIndex: 15,
        boxShadow: (empty? '0 0 10px 5px gray': null)
    }
    
  return (<>
    <Image data-type='catchment'
          src={ruralCatchmentIcon}
      height={70}
          width={70}
          style={style }
      alt = 'A logo of a rural area'/>
    </>
  );
}

