import React from "react";
import "../stylesheets/navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SideBar from './SideBar';
import TextRecognition from "./TextRecognition";
import VoiceRecognition from "./VoiceRecognition";
import Profile from "./Profile";



const NavBar = () => {

  return (
     <Navbar expand="lg" className="bg-body-tertiary mainNav">
     <Container>
       <Navbar.Brand href="/" className="navBrand">Vortex</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
         <Nav className="me-auto navCont">
          
            <SideBar/>
            <TextRecognition/>
            <VoiceRecognition/>
            <Profile/>

         </Nav>
       </Navbar.Collapse>
     </Container>
   </Navbar>
  )
}

export default NavBar