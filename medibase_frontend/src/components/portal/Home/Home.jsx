import React from 'react'
import Banner from './components/Banner'
import Logins from './components/Logins'
import './css/Home.css'
import Info from './components/Info'

const Home = () => {
  return (
   
     <div className="scrollHomeContainer">
       <section className='section' ><Banner/></section>
      <section className='homePageDescContainer' style={{ overflow: "hidden", height: "100vh"}}><Info/></section>
      <section className = 'homePageLoginContainer' style={{ overflow: "hidden", height: "100vh"}}><Logins/></section>
     </div>
  );
}

export default Home