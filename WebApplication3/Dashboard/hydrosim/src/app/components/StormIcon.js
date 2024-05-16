import React from "react";
import stormIcon from "../../../public/storm.svg"
import Image from 'next/image'

export default function StormIcon({empty }) {

    const style = {
        opacity: (empty ? 0.5 : 1),
        borderRadius: '50%',
        zIndex: 15,
        boxShadow: (empty ? '0 0 10px 5px gray' : null)
    }

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

