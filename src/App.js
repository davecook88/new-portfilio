import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import NavbarFull from "./Components/Navbar/Navbar.component.js";
import { Waypoint } from "react-waypoint";
import calculateInlineStyle from "./Components/Laptop/calculateLaptopStyle";
import Laptop from "./Components/Laptop/Laptop";
import SocialMediaBar from "./Components/SocialMedia/SocialMedia";
import { Row, Col, Container } from "react-materialize";
import NameLogo from "./Components/NameLogo/NameLogo";
import "./App.scss";
const smallModifiers = {
  heightModifier: 0.45,
  widthModifier: 0.42,
  leftModifier: 0.1,
  topModifier: 0.02
};
const style = calculateInlineStyle(smallModifiers);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false,
      position: 0,
      laptopStyle: calculateInlineStyle()
    };
  }
  setPosition(obj) {
    console.log(obj);
    this.setState({ position: 1 });
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
        <div className="logo holder">
          <NameLogo position={this.state.position} />
        </div>
        <div className="laptop-wrapper">
          <Laptop style={style} position={this.state.position} />
        </div>
        
        <section id="first">
          <div>
            <ul>
              <li>Automate repetitive tasks and increase your productivity.</li>
              <li>Eliminate human error with automation.</li>
              <li>Integrate online APIs.</li>
              <li>Improve your efficiency.</li>
            </ul>
            <p>Scroll down to see examples of my work.</p>
          </div>
        </section>


        <section id="second" className="full-screen"></section>
        <Waypoint onEnter={props => {
          if (props.event) console.log(props);
        } }></Waypoint>
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
