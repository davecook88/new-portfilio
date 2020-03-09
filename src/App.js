import React from 'react';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import NavbarFull from './Components/Navbar/Navbar.component.js';
import Laptop from './Components/Laptop/Laptop';
import BackgroundImage from './Components/BackgroundImage/BackgroundImage';
import { Controller, Scene } from 'react-scrollmagic';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }

  }
  // handleScroll = () => {;
  //   return console.log(this) ;
  // }
  // componentDidMount() {
  //   window.addEventListener("scroll", this.handleScroll);
  // }
  render() {
    return (
      <div className="App" style={{height:300 + 'vh'}}>
        <NavbarFull />
        <BackgroundImage />
        
        
        <Controller>

          <Scene>
            {(progress, event) => {
              return <Laptop progress={progress}/>
            }}
          </Scene>
        </Controller>

      </div>
  );
    }
}

export default App;
