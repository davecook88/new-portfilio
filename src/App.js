import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { Waypoint } from "react-waypoint";
import calculateInlineStyle from "./Components/Laptop/calculateLaptopStyle";
import NavButton from './Components/NavButton/NavButton';
import Laptop from "./Components/Laptop/Laptop";
import SocialMediaBar from "./Components/SocialMedia/SocialMedia";
import ReviewCarousel from './Components/Reviews/ReviewCarousel'
import { Row, Col, Container } from "react-materialize";
import NameLogo from "./Components/NameLogo/NameLogo";
import "./App.scss";
const smallModifiers = {
  heightModifier: 0.45,
  widthModifier: 0.42,
  leftModifier: 0.1,
  topModifier: 0.2
};
const style = calculateInlineStyle(smallModifiers);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      position: 0,
      laptopStyle: calculateInlineStyle(),
      menuIsOpen:true,
    };
  }
  setPosition(waypoint, {force = false} = {}) {    
    const { position } = this.state;
    const newPosition = force? waypoint : position === waypoint ? waypoint + 1: waypoint;
    console.log(position, waypoint, newPosition);
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
  updateLaptopStyle(modifiers) {
    console.log(modifiers);
    this.setState({
      laptopStyle: calculateInlineStyle(modifiers),
      updated: true
    });
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
        <div className="laptop-wrapper">
          
          <Laptop style={style} position={this.state.position} />
        </div>
        <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(0, {force: true})}}/>
        <section id="first">              
          {this.state.position < 2 ? <ReviewCarousel /> : ''}
        </section>
          <Waypoint scrollableAncestor="window" onEnter={() => {this.setPosition(0)}}/>
        
        <section id="second" className="full-screen"></section>

        <section id="third" className="full-screen"></section>
        <div className="footer-bar teal">
          <Container>
            <Row>
              <Col s={12} m={6}>
                <div className="email-link">
                  <a href="mailto:davecook@hotmail.co.uk">
                    davecook@hotmail.co.uk
                  </a>
                </div>
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