import React from 'react'
import IVideo from './video/iris_scan.gif'
import './css/FingerprintLoader.css'

const IrisiLoader = () => {
  return (
    <div className="loader-overlay">
    <div className="loader-container">
      <img src={IVideo} alt="Loading..." className="loader-iris-image" />
      <div className="loader-text">Processing Iris</div>
    </div>
  </div>
  )
}

export default IrisiLoader