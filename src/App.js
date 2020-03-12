import React from 'react';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import NavbarFull from './Components/Navbar/Navbar.component.js';
import calculateInlineStyle from './Components/Laptop/calculateLaptopStyle';
import Laptop from './Components/Laptop/Laptop';
import { Controller, Scene } from 'react-scrollmagic';
import './App.scss';
const smallModifiers = {
  heightModifier:0.55,
  widthModifier:0.52,
  leftModifier:0.1,
  topModifier:0.1
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
      <div className="App" style={{height:300 + 'vh'}}>
        <NavbarFull />
        
        <Controller>
        <section id="first" className="full-screen world-map">
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
                  <div className="outer-textbox teal right">

                  </div>
                </section>)
            }}

            
          </Scene>          
        </Controller>

      </div>
  );
    }
}

export default App;
