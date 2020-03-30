import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { Waypoint } from "react-waypoint";

import NavButton from './Components/NavButton/NavButton';
import Laptop from "./Components/Laptop/Laptop";
import SocialMediaBar from "./Components/SocialMedia/SocialMedia";
import ReviewCarousel from './Components/Reviews/ReviewCarousel';
import ContentCard from './Components/ContentCard/ContentCard';
import { Row, Col, Container } from "react-materialize";
import { AiFillFileExcel } from 'react-icons/ai';
import { FaGoogle, FaLaptopCode } from "react-icons/fa";
import NameLogo from "./Components/NameLogo/NameLogo";
import ContactForm from "./Components/ContactForm/ContactForm";
import "./App.scss";
import calculateInlineStyle from "../src/Components/Laptop/calculateLaptopStyle";




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      position: 0,
      menuIsOpen:true,
    };
  }
  calculateStyles = () => {
    const bigScreenModifiers = {
      heightModifier: 0.45,
      widthModifier: 0.38,
      leftModifier: 0.1,
      topModifier: 0.2
    };
  
    let smallScreenModifiers = {
      heightModifier: 0.30,
      widthModifier: 1,
      leftModifier: 0,
      topModifier: 0.15,
    };
    let ipadModifiers = {
      heightModifier: 0.30,
      widthModifier: 0.8,
      leftModifier: 0.1,
      topModifier: 0.15,
    };
    const browserWidth = window.screen.width;  
    const modifiers = browserWidth < 600 ? smallScreenModifiers : browserWidth < 800 ? ipadModifiers : bigScreenModifiers;
    let style;
    if (browserWidth < 600) { //is mobile
        if(this.state.position === 0) {
            style = calculateInlineStyle(modifiers);
        } else if (this.state.position < 6 && this.state.position > 0) {
            modifiers.topModifier = 0.075; //scootch up a bit after opening screen
            style = calculateInlineStyle(modifiers);
        } else {
            modifiers.topModifier = -2; // fly up when at the bottom
            style = calculateInlineStyle(modifiers);
        }
    } else { //not mobile
        if (this.state.position < 7) {
          style = calculateInlineStyle(modifiers);
        } else {
          modifiers.topModifier = -2; // fly up when at the bottom
          style = calculateInlineStyle(modifiers);
        }
    }
    console.log(this.state.position);
    console.log(style);
    return style;
  }
  setPosition(waypoint, {force = false} = {}) {    
    const { position } = this.state;
    const newPosition = force? waypoint : position === waypoint ? waypoint + 1: waypoint;
    const menuPosition = newPosition === 0 ? true : false;
    this.setState({ position: newPosition, menuIsOpen:menuPosition });
  }
  setMenuOpenStatus = (newStatus) => {
    if (newStatus === undefined) {
      const newStatus = !this.props.menuIsOpen;
      this.setState({ menuIsOpen: newStatus });
    } else {
      this.setState({ menuIsOpen: newStatus });
    }
  }

  render() {
    return (
      <div className="App">
        <NavButton 
          position={this.state.position}
          open={this.state.menuIsOpen}
          toggleMenu={this.setMenuOpenStatus}
        />
        <div className="logo holder">
          <NameLogo position={this.state.position} />
        </div>
        <div className={`laptop-wrapper`}> 
          
          <Laptop position={this.state.position} style={this.calculateStyles()} />
        </div>
        <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(0, {force: true})}}/>
        <section id="first">              
          {this.state.position < 1 ? <ReviewCarousel /> : ''}
        </section>
        <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(1)}}>
          
          <section id="second" className="full-screen">
            {this.state.position < 3 ? <ContentCard type={'jsSkills'} position={this.state.position} slide={false}/> : ''}
          </section>
        </Waypoint>
        <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(2, {force: true})}}/>
        <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(3, {force: true})}}>
          <section id="third" className="full-screen">
            <ContentCard type={'diceApp'} position={this.state.position} slide={false} />
          </section>
        </Waypoint>
        <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(4, {force: true})}}>
          <section id="fourth" className="full-screen">
          <ContentCard type={'lakarencita'} position={this.state.position} slide={false}/>
            {/* {this.state.position > 3  ? 
                :
                ''} */}
          </section>
        </Waypoint>
        <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(4)}}>
          <section id="fourth" className="full-screen">
            <ContentCard type={'snakegame'} position={this.state.position} slide={false}/>
          </section>
        </Waypoint>
        <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(5)}}/>
        

        <section id="fifth" className="full-screen half-height">
          <Row>
          
            <Col xs={12} m={12}>
              <h4 className="light-blue-text text-center">Additional projects completed</h4>
            </Col>
            <Col s={12} m={4}>
              <div className="card white-text blue padded text-center">
                <h4>Shopify inventory management</h4>
                <p>Let me help you automate listing and shop management by integrating your Shopify API with
                  your current system.
                </p>
              </div>
            </Col>
            <Col s={12} m={4}>
              <div className="card white-text blue padded text-center">
                <h4>Full-stack vocabulary study web app</h4>
                <p>Made with Python, Flask. Web app integrated with the Oxford English Dictionary to 
                  allow users an individualised learning experience.
                </p>
              </div>
            </Col>
            <Col s={12} m={4}>
              <div className="card white-text blue padded text-center">
                <h4>Scheduling system for cover teachers</h4>
                <p>Algorithm written in Google Sheets which compares levels taught and availability for all teachers in a school
                  to select the most appropriate teacher to cover in case of absences.
                </p>
              </div>
            </Col>
            <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(7)}}/>
          </Row>
        </section>
        
        <Row>
                
        <Col xs={12} m={1}></Col>
          <Col xs={6} m={6}>
            <h3 className="teal-text text-center">Get in touch</h3>
            <ContactForm />
          </Col>
          <Col xs={12} m={5}></Col>
        </Row>
        <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(7, {force: true})} }/>
        
        
        <section id="sixth" className="half-screen half-height teal">
          <Container className="icons-container">
            <Row className="icons-row">
              {/* <Col s={12} m={12}/>   */}
              <Col s={12} m={4} >                
                <div className='icon-holder'>
                  <AiFillFileExcel />
                  <div className='small-text'>
                    <p>Spreadsheet automation services</p>
                    <p>Simplifying repetitive tasks for companies around the world.</p>
                  </div>
                </div>
              </Col>  
              <Col s={12} m={4} > 
                <div className='icon-holder'>
                  <FaGoogle />
                  <div className='small-text'>
                    <p>Google Apps Script specialist</p>
                    <p>Scripting and custom web apps for gmail, sheets, calendar and all other Gsuite services.</p>
                  </div>
                </div>
              </Col>  
              <Col s={12} m={4} > 
                <div className='icon-holder'>
                  <FaLaptopCode />
                  <div className='small-text'>
                    <p>Responsive web design</p>
                    <p>Quick turnaround on widgets, landing pages and web apps.</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <div className="footer-bar teal" >
        <div className="footer-bar teal text-center"></div>
          <Container>
            <Row>
              <Col s={12} m={6}>
                <div className="email-link  text-center">
                  <a href="mailto:davecook@hotmail.co.uk">
                    davecook@hotmail.co.uk
                  </a>
                </div>
              </Col>
              <Col s={12} m={6} className=" text-center">
                <SocialMediaBar />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;