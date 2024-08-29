import React from 'react'
import './css/FingerprintLoader.css'
import FVideo from './video/finperprint_scan.mp4'

const FingerprintLoader = () => {
  return (
   <div className="loader-overlay">
     <div className="loader-container">
    <video autoPlay loop muted className="loader-video">
      <source src={FVideo} type="video/mp4" />
     
      Your browser does not support the video tag.
    </video>
    <div className="loader-text">Processing The Fingerprint</div>
  </div>
   </div>
  )
}

export default FingerprintLoader