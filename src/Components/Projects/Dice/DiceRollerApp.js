import React, * as react from "react";
import "./dice.css";
import DiceScene from "./DiceScene";
import Dice from "./Dice";
import { Col, Row} from "react-materialize";

export default class DiceRollerApp extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      _dice:[],
      _resultsText: [],
      _scenes: [],
      _results: [],
      topRow:[],
      stillSpinning: true,
      modifier: 0,
      showResults: false
    };
  }
  componentDidMount() {
    const elementArray = this.populateTopRowOfDisplayDice();
    this.setState({topRow:elementArray});
  }
  
  applyResultsToPage() {
    const resultsOutput = () => {
      let results = [];
      for (let d in this.state._dice){
        results.push(`${this.state._dice[d].type}: ${this.state._results[d]}`)
      }
      return <p>{results.join(', ')}</p>
    }
    const totalOutput = () => {
      const total = this.state._results.reduce((a,b) => a + b);
      return `Total: ${total}`;
    }
    const grandTotalOutput = ()=>{
      const total = this.state._results.reduce((a,b) => a + b);
      return total + this.state.modifier;
    }
    return (<div>
      <div className="individual-dice-results">{resultsOutput()}</div>
      <div className="total">{totalOutput()}</div>
      <div className="modifier">{`Modifier: ${this.state.modifier}`}</div>
      <div className="grand-total"><strong>{grandTotalOutput()}</strong></div>
    </div>)
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
      _dice: [],
      _scenes: [],
      _results:[],
      stillSpinning: true,
      modifier: 0,
      showResults: false
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
    for (let d in state._dice) {
      let dice = state._dice[d];
      dice.startSpinning(true);
    }
  }
  rollAllDice() {
    for (let s in this._scenes) {
      let scene = this._scenes[s];
      scene.forEach(s => s.dice.startSpinning(false));
    }
  }

  modifierChange(n) {
    let state = this.state;
    state.modifier += n;
    this.setState(state);
  }
  populateTopRowOfDisplayDice() {
    const diceNumbers = [6, 8, 10, 12, 20];
    let scenesArray = diceNumbers.map(d => {
      const dice = new Dice(d, {size:200})
      return (
        <DiceScene
          key={`display-d${d}`}
          dice={dice}
          // context={this}
          diceType={dice.type}
          // size={150}
          rendererSize={d === 100 ? 25 : 50}
          clickHandler={this.handleClickDisplayDice}
        />
      );
    });
    return scenesArray;
  }
  handleClickDisplayDice = d => {
    let state = this.state;
    const rendererSize = d === 100 ? 30 : 60;
    const dice = new Dice(d,{size:250})
    const newDiceScene = (
      <DiceScene
        key={`d${d}${state._scenes.length}`}
        dice={dice}
        rendererSize={rendererSize}
        showResultsOnPage={this.showResultsOnPage}
      />
    );
    state._scenes.push(newDiceScene);
    state._dice.push(dice);
    this.setState(state);
  };
  roll() {
    let state = this.state;
    state._results = [];
    this.slowDownAllDice();
    if (state._dice.length === 0) {
      alert("Please select dice to roll");
      return;
    }
    for (let d in state._dice) {
      let currentDice = state._dice[d];
      const result = Math.ceil(Math.random() * currentDice.type);
      state._results.push(result);
      currentDice.setResult(result);
    }
    this.setState(state);
  }
  showResultsOnPage = (bool) => {
    this.setState({showResults:bool});
  }
  render() {
    return (
      <div className="dice-app">
        <div className="title-box">
          <span className="main-title-dice">DND DICE ROLLER</span>

          <div id="img-box">{this.state.topRow}</div>
          <div className="buttons-box">
            <div
              className="button"
              id="reset-button"
              onClick={() => this.reset()}
            >
              reset
            </div>
            <div className="modifier-box">
              <div className="title">Modifier</div>
              <div
                className="modifier arrow"
                id="modifier-down"
                onClick={() => this.modifierChange(-1)}
              >
                &lt;
              </div>
              <div className="modifier number" id="modifier">
                {this.state.modifier}
              </div>
              <div
                className="modifier arrow"
                id="modifier-up"
                onClick={() => this.modifierChange(1)}
              >
                &gt;
              </div>
            </div>
            <div className="button" id="button" onClick={() => this.roll()}>
              roll
            </div>
          </div>
          <Row>
            <Col s={8}>
              <div className="animation-window col-sm-12" id="animations">
                {this.state._scenes}
              </div>
            </Col>
            <Col s={4}>
              {this.state.showResults ? this.applyResultsToPage() : ''}
            </Col>
          </Row>
        </div>
        
      </div>
    );
  }
}
