import React, * as react from "react";
import './dice.css';
import DiceScene from "./DiceScene";

export default class DiceRollerApp extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      _diceRows: {},
      _resultsText: [],
      _scenes: [],
      stillSpinning: true,
      modifier: 0,
      upToDate: false
    };
  }
  applyResultsToPage() {
    const scenes = this.state._diceRows;
    let results = [];
    let grandTotal = 0;
    for (let s in scenes) {
      let total = 0;
      let currentDice = scenes[s];
      var resultsArray = currentDice.map((scene, i) => {
        let r = scene.result;
        if (scene.type === 100) {
          r = parseInt(r) + scene.d10.result;
        }
        if (r === 20) {
          return (
            <strong style={{ color: 0xb50004 }} key={i}>
              {r}
            </strong>
          );
        } else {
          return <span key={i}>{r}</span>;
        }
        total += r;
      });
      const resultHolder = (
        <div key={`results-${s}`}>
          {resultsArray}
          {currentDice.length > 1 ? <div> Total: ${total} </div> : ""}
        </div>
      );
      results.push(resultHolder);
      grandTotal += total;
    }
    const ModifierDiv = () => this.state.modifier ? (
      <div className="modifier-result">Modifier: {this.state.modifier}</div>
    ) : (
      <div></div>
    );
    const GrandTotalElement  = () => (
      <p>
        <strong>
          Grand Total: ${parseInt(grandTotal) + parseInt(this.state.modifier)}
        </strong>
      </p>
    );

    // this.setState({ upToDate: true });
    return (
      <div>
        {results}
        <ModifierDiv />
        <GrandTotalElement />
      </div>
    );
  }
  checkIfAllDiceStoppedSpinning() {
    let stopped = true;
    for (let s in this.state._scenes) {
      for (let i = 0; i < this.state._scenes[s].length; i++) {
        stopped = this.state._scenes[s][i].dice.showAnswer;
      }
    }
    this.stillSpinning = !stopped;
    if (stopped) {
      this.setState({ stillSpinning: false });
      this.updatePageIfNeeded();
    }
    return stopped;
  }
  diceHasBeenAdded(dice) {
    return this.state._diceRows.hasOwnProperty(dice);
  }
  setDiceNumber(dice, adjustment) {
    let state = this.state;
    if (state._diceRows.hasOwnProperty(dice)) {
      let quantity = state._diceRows[dice].quantity || 0;
      if (quantity + adjustment > 0) {
        quantity += adjustment;
      } else {
        quantity = 0;
      }
      state._diceRows[dice].quantity = quantity;
    } else {
      if (adjustment < 0) adjustment = 0;
      const newDiceObj = {
        quantity: adjustment,
        value: parseInt(dice.slice(1)),
        results: []
      };
      state._diceRows[dice] = newDiceObj;
    }
    this.setState(state);
    this.updateAnimatedDice();
  }
  addOneDice(dice) {
    this.setDiceNumber(dice, 1);
  }
  minusOneDice(dice) {
    this.setDiceNumber(dice, -1);
  }
  setDiceObject(obj) {
    let state = this.state;
    state._diceRows = obj;
    this.setState(state);
  }
  getDiceObject() {
    return { ...this.state._diceRows };
  }
  getNumberOfDice(dice) {
    let number = 0;
    if (this.diceHasBeenAdded(dice)) {
      number = this.state._diceRows[dice].quantity || 0;
    }
    return number;
  }
  reset() {
    this.setState({
      _diceRows: {},
      _resultsText: [],
      _scenes: {},
      stillSpinning: true,
      modifier: 0,
      upToDate: false
    });
  }
  getScenesByDice(dice) {
    const scenes = this.state._scenes[dice];
    return scenes || [];
  }
  setScenesByDice(dice, scenes) {
    let state = this.state;
    state._scenes[dice] = scenes;
    this.setState(state);
  }
  slowDownAllDice() {
    let state = this.state;
    for (let s in state._scenes) {
      let scene = state._scenes[s];
      scene.forEach(s => s.dice.startSpinning(true));
    }
  }
  rollAllDice() {
    for (let s in this._scenes) {
      let scene = this._scenes[s];
      scene.forEach(s => s.dice.startSpinning(false));
    }
  }
  updateAnimatedDice = () => {
    const realDice = ['d4','d6','d8','d10','d12','d20','d100'];
    let state = this.state;
    // const animationBox = document.getElementById('animations');
    for (let d in state._diceRows){
      if (realDice.includes(d)){
        const diceNumber = parseInt(d.slice(1,));
        const scenesSoFar = state._scenes[d] || [];
        const numberOfDice = this.getNumberOfDice(d);
        if (scenesSoFar.length < numberOfDice){
          let scene = new DiceScene(this,diceNumber, this);
          let scenesArray = this.getScenesByDice(d);
          scenesArray.push(scene);
          this.setScenesByDice(d,scenesArray);
        } else if (scenesSoFar.length > numberOfDice){
          while (scenesSoFar.length > numberOfDice) {
            scenesSoFar.pop();
          }
        }
      }              
    }
  }
  modifierChange(n){
    let state = this.state;
    state.modifier += n;
    this.setState(state);
  }
  populateTopRowOfDisplayDice(){
    const diceNumbers = [4,6,8,10,12,20,100];
    let scenesArray = diceNumbers.map(d => {
      return  <DiceScene 
                key={`display-d${d}`} 
                context={this} 
                diceType={d} 
                size={150} 
                rendererSize={d === 100 ? 30 : 60} 
                clickHandler={this.handleClickDisplayDice}
                />;
    });
    return scenesArray;
  }
  handleClickDisplayDice = (d) => {
    let state = this.state;
    const newDiceScene = <DiceScene 
                            key={`d${d}${state._scenes.length}`} 
                            context={this} 
                            diceType={d} 
                            size={150} 
                            rendererSize={d === 100 ? 30 : 60} 
                            
                            />;
    
    state._scenes.push(newDiceScene);
    this.setState(state);
    console.log(this.state);
  }
  render() {
    return (
      <div className="dice-app">
        <div className="title-box">
          <span className="main-title-dice">DND DICE ROLLER</span>
          
          <div id="img-box">{this.populateTopRowOfDisplayDice()}</div>
            <div className="buttons-box">
            <div className="button" id="reset-button" onClick={() => this.reset()}>reset</div>
            <div className="modifier-box">
              <div className="title">Modifier</div>
              <div className="modifier arrow" id="modifier-down" onClick={() => this.modifierChange(-1)}>&lt;</div>
              <div className="modifier number" id="modifier">{this.state.modifier}</div>
              <div className="modifier arrow" id="modifier-up" onClick={() => this.modifierChange(1)}>&gt;</div>
            </div>
            <div className="button" id="button" onClick={() => this.roll}>roll</div>
        </div>
        <div className="animation-window col-sm-12" id="animations">{this.state._scenes}</div>
        <div className="table col-md-6 col-sm-12" id="dice-table">

          <div className="result-row title-row">
            <div className="cell d-name title">dice</div>
            <div className="cell d-quantity-select title">
              number
            </div>
          </div>
        </div>
        {this.applyResultsToPage()}

        </div>

        
      </div>
    );
  }
}
