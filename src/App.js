import React from 'react';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import NavbarFull from './Components/Navbar/Navbar.component.js';
import calculateInlineStyle from './Components/Laptop/calculateLaptopStyle';
import Laptop from './Components/Laptop/Laptop';
import SocialMediaBar from './Components/SocialMedia/SocialMedia';
import { Controller, Scene } from 'react-scrollmagic';
import {Row, Col, Container } from 'react-materialize';
import NameLogo from './Components/NameLogo/NameLogo';
import './App.scss';
const smallModifiers = {
  heightModifier:0.45,
  widthModifier:0.42,
  leftModifier:0.1,
  topModifier:0.02
  };
const style = calculateInlineStyle(smallModifiers);
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      updated:false,
      laptopStyle:calculateInlineStyle()
    }
  }

  updateLaptopStyle(modifiers) {
    console.log(modifiers);
    this.setState({laptopStyle:calculateInlineStyle(modifiers), updated:true});
  }
  render() {
    return (
      <div className="App">
        {/* <NavbarFull /> */}
        
        <Controller>
          <Scene duration={200}>
            <div className="logo holder">
              <NameLogo />
            </div>
          </Scene>
          <Scene duration={200}>
          <div>
              <ul>
                  <li>Automate repetitive tasks and increase your productivity.</li>
                  <li>Eliminate human error with automation.</li>
                  <li>Integrate online APIs.</li>
                  <li>Improve your efficiency.</li>
              </ul>
              <p>
                  Scroll down to see examples of my work.
              </p>
          </div>
          </Scene>
          <section id="first" className="full-screen">
          </section>
          <Scene offset={0} duration={200} classToggle="no-static">
            <div className="laptop-wrapper">
              <Laptop style={style} screen={'start'}/>
            </div>
          </Scene >
          <Scene offset={200} duration={600} classToggle="fade-in">
            <div className="laptop-wrapper faded">
              <Laptop style={style} screen={'dice'}/>
            </div>
          </Scene>
          <Scene duration={600} offset={200} pin classToggle="slide-in-right">
            {()=>{
              return (
                <section id="second" className="full-screen padded">
                  <div className="outer-textbox orange lighten-2 right">

                  </div>
                </section>)
            }}

            
          </Scene>          
        </Controller>
        <div className="footer-bar teal">
          <Container>          
            <Row>
              <Col s={12} m={6}>
                <a href="mailto:davecook@hotmail.co.uk" className="email-link">davecook@hotmail.co.uk</a>
              </Col>
              <Col s={12} m={6}>
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
