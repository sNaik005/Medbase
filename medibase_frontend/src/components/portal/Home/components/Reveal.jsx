import React, { useEffect, useRef } from 'react'
import {motion, useInView , useAnimation} from 'framer-motion'

const Reveal = ({children, width = "fit-content"}) => {
    const ref = useRef(null);

    const isInView = useInView(ref, {once: false})
    

    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(()=>{
       if(isInView){
        mainControls.start("visible");
        slideControls.start("visible")
       }

    }, [isInView])
  return (
    <div ref={ref} style={{position: 'relative', width, overflow:'hidden'}}>
        <motion.div
        variants={{
            hidden : {opacity: 0 , y:75},
            visible : {opacity: 1 , y: 0}
        }}
        initial = "hidden"
        animate = {mainControls}
        transition={{duration: 1, delay: 0.4}}
        >{children}</motion.div>
        <motion.div
            variants = {{
                hidden : {left : 0},
                visible : { left : "100%"}
            }}
            initial = "hidden"
            animate = {slideControls}
            transition = {{duration : 1 , ease: "easeIn" }}
            style={{
                position: "absolute",
                top: 4,
                bottom: 4,
                left: 0,
                right: 0,
                background: "#e7eb23",
                zIndex: 20
            }}
            >
        </motion.div>

    </div>
  )
}

export default Reveal