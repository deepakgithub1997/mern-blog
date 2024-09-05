import React from 'react'
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';



const about = () => {
  const container = useRef();

  gsap.registerPlugin(useGSAP);
  useGSAP(
    () => {
      // gsap code here...
      gsap.to('.box', { x: 360 }); // <-- automatically reverted
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <div className='box'></div>
    </div>
  )
}

export default about