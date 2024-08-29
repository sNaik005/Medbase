import React from 'react'
import '../css/Home.css'
import Reveal from './Reveal'
const Info = () => {
  return (
    <div className='infoContainer'>
       <Reveal>
       <h3 className='infoText'>
        Medibase simplifies lifelong medical record management with precision and security. Utilizing a unique identifier system, it offers seamless access for both individual users and medical organizations. 
        </h3>
       </Reveal>

        <Reveal>
        <h3 className="infoText">
        Its hospital interface, powered by advanced biometric technology, ensures swift patient identification and immediate access to vital medical information.
        </h3>
        </Reveal>

        <Reveal>
        <h3 className="infoText">
        Additionally, it facilitates to add new medical records.
        </h3>
        </Reveal>
    </div>
  )
}

export default Info