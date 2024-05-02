import React from "react";
import stormIcon from "../../../public/storm.svg"
import Image from 'next/image'

export default function StormIcon( { style } ) {



  return (<>
    <Image data-type='storm'
      src={stormIcon}
          height={70}
          width={70}
      alt='A logo of a cloud with rainfall'
      style={style}/>
    </>
  );
}

