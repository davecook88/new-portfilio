import * as THREE from 'three';
import React, { Component } from 'react';
//Diceroller class contains records and methods to link the application together
        //Which dice are showing, if they are spinning, results etc.
        class DiceRoller{
            constructor() {
              this._diceRows = {}
              this._resultsText = [];
              this._scenes = {};
              this.stillSpinning = true;
              this.resultBox = document.getElementById("result-box");
              this.modifier = 0;
              this.upToDate = false;
            }
  
            applyResultsToPage() {
              const scenes = this._scenes;
              let resultsString = '';
              let grandTotal = 0;
              for (let s in scenes) {
                let total = 0;
                let currentDice = scenes[s];
                resultsString += `${s}: `;
                currentDice.forEach(scene => {
                  let r = scene.result;
                  if (scene.type === 100) {
                    r = parseInt(r) + scene.d10.result;
                  }
                  if (r == 20) {
                    resultsString += `<strong style="color:#b50004">${r}</strong> `;
                  } else {
                    resultsString += `${r} `;
                  }
                  total += r;
                });
                if (currentDice.length > 1) {
                  resultsString += `<br> Total: ${total} <br> `
                } else {
                  resultsString += `<br>`;
                }
                grandTotal += total;              
              }
              if (this.modifier) resultsString += `<br>Modifier: ${this.modifier}\n`
              resultsString += `<br><strong>Grand Total: ${parseInt(grandTotal) + parseInt(this.modifier)}</strong> <hr>\n`;
              this.addResult(resultsString);
              this.upToDate = true;
            }
  
            addResult(result){
              this._resultsText.unshift(result);
              this.updateResultsText();
            }
  
            clearLastResult() {
              this._resultsText.shift();
              this.updateResultsText();
            }
  
            updateResultsText(){
              this.resultBox.innerHTML = this._resultsText.join("");
            }
  
            checkIfAllDiceStoppedSpinning(){
              let stopped = true;
              for (let s in this._scenes) {
                this._scenes[s].forEach(scene =>{
                  stopped = scene.dice.showAnswer;
                });
              }
              this.stillSpinning = !stopped;
              if (stopped) {
                this.stillSpinning = false;
                this.updatePageIfNeeded();
              }
              return stopped;
            }
  
            diceHasBeenAdded(dice){
              return this._diceRows.hasOwnProperty(dice);
            }
  
            addOneDice(dice){            
              this.setDiceNumber(dice,1);
            }
            minusOneDice(dice){            
              this.setDiceNumber(dice,-1);
            }
            setDiceObject(obj) {
              this._diceRows = obj;
            }
            getDiceObject(){
              return {...dr._diceRows };
            }
            getNumberOfDice(dice){
              let number = 0;
              if (this.diceHasBeenAdded(dice)) {
                number = this._diceRows[dice].quantity || 0;
              }
              return number;
            }
  
            setDiceNumber(dice,adjustment){
              if (this._diceRows.hasOwnProperty(dice)) {
                let quantity = this._diceRows[dice].quantity || 0;
                if (quantity + adjustment > 0) {
                  quantity += adjustment;
                } else {
                  quantity = 0;
                }
                this._diceRows[dice].quantity = quantity;
              } else {
                if (adjustment < 0) adjustment = 0;
                this._diceRows[dice] = {
                  quantity: adjustment,
                  value: parseInt(dice.slice(1,)),
                  results:[]
                };
              }
              this.updateAnimatedDice();
            }
  
            reset() {
              this._diceRows = {};
              this._scenes = {};
              this._resultsText = [];
              this.updateResultsText();
              const animationBox = document.getElementById('animations');
              animationBox.innerHTML = "";
            }
  
            getScenesByDice(dice){
              return this._scenes[dice] || [];
            }
  
            setScenesByDice(dice,scenes){
              this._scenes[dice] = scenes;
            }
  
            slowDownAllDice() {
              for (let s in this._scenes) {
                let scene = this._scenes[s];
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
              const animationBox = document.getElementById('animations');
              for (let d in this._diceRows){
                if (realDice.includes(d)){
                  const diceNumber = parseInt(d.slice(1,));
                  const scenesSoFar = this._scenes[d] || [];
                  const numberOfDice = this.getNumberOfDice(d);
                  if (scenesSoFar.length < numberOfDice){
                    let scene = new DiceScene(animationBox,diceNumber, this);
                    scene.render();
                    let scenesArray = this.getScenesByDice(d);
                    scenesArray.push(scene);
                    this.setScenesByDice(d,scenesArray);
                  } else if (scenesSoFar.length > numberOfDice){
                    while (scenesSoFar.length > numberOfDice) {
                      scenesSoFar[scenesSoFar.length - 1].parent.firstElementChild.remove();
                      scenesSoFar.pop();
                    }
                  }
                  this.updateDiceQuantity(d);
                }              
              }
            }
  
            updateDiceQuantity(dicetype){
              const displayNumber = document.getElementById(`${dicetype}-quantity`);
              if (displayNumber) displayNumber.innerText = this._diceRows[dicetype].quantity;
            }
  
            updatePageIfNeeded() {
              if (!this.upToDate) this.applyResultsToPage();
            }
            
          }
  
  
          class Dice {
            constructor(type, context, {color = 0xb50004, size = 250} = {}) {
                this.size = size;
                this.color = color;
                this.type = type;
                this.spin = true;
                this.slowDown = false;
                this.showAnswer = false;
                this.axes = {
                    x: Math.random() * 10,
                    y: Math.random() * 10,
                    z: Math.random() * 10
                };
                this.spinSpeed = ((Math.random() * 5) + 2 ) / 100;              
                this.geometry = this.createGeometry(type)
                this.element = this.createDice();
                // Parent scene instance as context
                this.context = context;
            }
            shapes = {
                4: THREE.TetrahedronGeometry,
                6: THREE.BoxGeometry,
                8: THREE.OctahedronGeometry,
                10: this.createD10.bind(this),
                12: THREE.DodecahedronGeometry,
                20: THREE.IcosahedronGeometry,
                100: this.createD10.bind(this),
            }
            finalStates = {
                4: {
                    x:0.9,
                    y:-0.8,
                    z:-0.2
                },
                6: {
                    x:0,
                    y:0,
                    z:0
                },
                8: {
                    x:0.5,
                    y:0.8,
                    z:0
                },
                10: {
                    x:-0.6,
                    y:-1.9,
                    z:0
                },
                12: {
                    x:1,
                    y:0.7,
                    z:0.3
                },
                20: {
                    x:0.18,
                    y:-0.12,
                    z:-0.085
                },
                100: {
                  x:-0.6,
                  y:-1.9,
                  z:0
                }
            }
            createGeometry(type){
                let geometry;
                if (type == 6) {
                    geometry = new this.shapes[type](this.size, this.size, this.size, 10, 10, 10);             
                } else if (type == 10 || type == 100) {
                    geometry = this.shapes[type]();
                } else {
                    geometry = new this.shapes[type](this.size);  
                }
                return geometry;
            }
  
            createDice(){
                const material = new THREE.MeshPhongMaterial({
                    color: this.color,
                    wireframe: false,
                    opacity: 0.8,
                    side: THREE.DoubleSide,
                    vertexColors:THREE.FaceColors,
                    flatShading: true,
                });    
  
                const dice = new THREE.Mesh(this.geometry, material);
  
                return dice;
            }
  
            updateElementRotation() {
                for (let a in this.axes){
                    this.element.rotation[a] = this.axes[a];
                }
            }
  
            spinAllAxes() {
              for (let a in this.axes){
                let axis = this.axes[a];
                this.axes[a] = axis - this.spinSpeed;
                if (this.axes[a] < 0 || this.axes[a] > 100) this.spinSpeed = -this.spinSpeed;
              }
              this.updateElementRotation();
            }
  
            reduceRotationAllAxes() {
              let stopSpinning = true;
                for (let a in this.axes){
                    let axis = this.axes[a];
                    const finalState = this.finalStates[this.type][a];
                    let difference = (axis - finalState) / 75;
                    if (difference < 0.005) difference = 0.005
                    if (axis - difference > finalState) {
                        this.axes[a] = axis - difference;
                    } else {
                        this.axes[a] = finalState;
                    }
                    if (this.axes[a] != finalState) stopSpinning = false;
                }
                this.updateElementRotation();
                this.spin = !stopSpinning;
  
                if (stopSpinning) {
                  this.showAnswer = true;
                  this.context.updateSpinningStatusInApplication();
                }
            }
  
            startSpinning(slowDown) {
              this.spin = true;
              this.slowDown = slowDown;
              this.showAnswer = false;
              this.axes = {
                    x: Math.random() * 10,
                    y: Math.random() * 10,
                    z: Math.random() * 10
              };
              if(this.type === 100) this.context.d10.dice.startSpinning(slowDown);
            }
  
  
            createD10() {
                let vertices = [];
                
                vertices.push(...[0, 0, -1]);
                for (let i = 0, b = 0; i < 10; ++i, b += Math.PI * 2 / 10) {
                    vertices.push(...[Math.cos(b), Math.sin(b), 0.105 * (i % 2 ? 1 : -1)]);
                }      
                vertices.push(...[0, 0, 1]);        
  
                const faces = [
                    1,2,11, 2,3,11, 3,4,11, 4,5,11, 5,6,11, 6,7,11, 7,8,11, 8,9,11, 9,10,11, 10,1,11, 
                    1,2,0, 2,3,0, 3,4,0, 4,5,0, 5,6,0, 6,7,0, 7,8,0, 8,9,0, 9,10,0, 10,1,0
                    ];
                return new THREE.PolyhedronGeometry(vertices, faces, this.size, 0);
            }          
        }
  
          class DiceScene{
            constructor(parentElement, diceType, context, result=1, id=0,
              {
                cameraPerspective = 80, 
                rendererSize = 120,
                extraClassNames = '',
                diceSize= 200
              } = {})
              {
                this.id = id;
                this.rendererSize=rendererSize;  
                this.extraClassNames=extraClassNames; 
                this.diceSize = diceType < 7 ? diceSize * 1.2 : diceSize;        
                this.parent = parentElement;
                this.type = diceType;
                this.result = result;
                this.scene = this.createScene();
                this.cameraPerspective = cameraPerspective;
                this.camera = this.createCamera();
                this.renderer = this.createRenderer();        
                this.canvasBox = this.createCanvasBox();
                this.resultText = this.createResultText();
                this.dice = new Dice(diceType, this, {size:this.diceSize});
                this.scene.add(this.dice.element);
                //Passing in the diceRoller instance to update once all dice have stopped spinning.
                this.context = context;
                if (diceType === 100) {
                  this.d10 = new DiceScene(this.canvasBox,10,this.context,0,0,
                  {
                    diceSize:this.diceSize,
                    rendererSize:this.rendererSize,
                    extraClassNames: this.extraClassNames,
                    
                  });
                  this.d10.render();
                  this.result = this.calculateResult(result);
                }
                this.state = {
                  hideResultClass:''
                }
            }
            calculateResult(result){
              if (this.type !== 100) {
                this.result = result;
              } else {
                this.d10.setResult(result % 10); 
                this.result =  Math.floor(result/10) + '0';
              }            
            }
            createResultText() {
              return (<h1 
                      className={`text-result d${this.type} ${this.hideResultClass}`}
                      id={`d${this.type}-result-text`}>
                        {this.result}
                    </h1>)
            }
            createCanvasBox() {
              const canvasBox = (
                <div 
                  className={`canvas-box ${this.extraClassNames}`}
                  id={`canvas-box-${this.id}`}
                  >
                    {this.resultText}
                    {this.renderer.domElement}
                </div>
                )
                return canvasBox;
            }
            createCamera() {
              let width = 500;
              let height = 500;	
              let camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 )
                //let camera = new THREE.PerspectiveCamera(this.cameraPerspective, 150/150, 1, 10000);
                camera.position.z = 400;
                return camera;
            }
            createRenderer(){
                var renderer = new THREE.WebGLRenderer();
                var windowWidth=window.innerWidth;
                var em = parseFloat(getComputedStyle(document.body).fontSize);
                renderer.setSize(this.rendererSize,this.rendererSize);
                renderer.domElement.id = 'dice-canvas';
                return renderer;
            }
            createScene() {
                let scene = new THREE.Scene();
                var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
                directionalLight.position.y = 100;
                directionalLight.position.z = 50//750;
                directionalLight.position.x = -150;
                scene.add(directionalLight);
                var bottomLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
                // bottomLight.position.x = 150 //750;
                bottomLight.position.y = -20//750;
                bottomLight.position.z = 50//750;
                scene.background = new THREE.Color( 0xffffff );
                
                scene.add(bottomLight);
                return scene;
            }
  
            setResult(result) {
                this.calculateResult(result);
                this.resultText.innerText = this.result;
            }
  
            hideResult = () => {
              const classes = this.state.hideResultClass.split(' ');
              const filteredClasses = classes.filter((c) => c !== "show-result" && "text-fade-in")
              this.setState({hideResultClass:filteredClasses.join(' ')});
            }
  
            showResult  = () =>  {
                let classList = this.state.hideResultClass;
                if (classList.indexOf('show-result') === -1) {
                    classList += ' show-result text-fade-in';
                    this.setState({hideResultClass:classList});
                }
            }
  
            render = () => {
                requestAnimationFrame(this.render);
                this.renderer.render(this.scene, this.camera);
                if (this.dice.slowDown) {
                    this.dice.reduceRotationAllAxes();
                } else {
                    this.dice.spinAllAxes();
                }
                if (this.dice.showAnswer) {
                  this.showResult();
                } else {
                  this.hideResult();
                }
            }
  
            updateSpinningStatusInApplication() {
              this.context.checkIfAllDiceStoppedSpinning();
            }
        }
  
          const dr = new DiceRoller();
          // const start = () => {
          //   const diceNumbers = [4,6,8,10,12,20,100];
          //   const imgBox = document.getElementById('img-box');
          //   diceNumbers.forEach((d,i) => {
          //     const holderDiv = document.createElement('div'); 
          //     holderDiv.classList = ("holder-div title");
          //     holderDiv.setAttribute("id", `d${d}-button`);
          //     holderDiv.setAttribute("onclick", `diceClickHandler(event)`);
          //     const diceName = document.createElement('div');
          //     diceName.classList.add("dicename-div");
          //     diceName.setAttribute("id", `d${d}-text`);
          //     diceName.innerText = `d${d}`;
          //     holderDiv.append(diceName);
          //     imgBox.append(holderDiv);
          //     const diceScene = new DiceScene(holderDiv,d, this,1,-i,
          //                                     {
          //                                       rendererSize:d === 100 ? 50 : 100,
          //                                       cameraPerspective:90,
          //                                       diceSize:220
          //                                     })
          //     diceScene.canvasBox.setAttribute('id', `d${d}-canvas-box`);
          //     diceScene.canvasBox.children[1].setAttribute('id', `d${d}-dice-canvas`);
          //     if (d === 100) {
          //       diceScene.d10.canvasBox.setAttribute('id', `d${d}-d10-canvas-box`);
          //       diceScene.d10.canvasBox.children[0].setAttribute('id', `d${d}-d10-text-result`);
          //       diceScene.d10.canvasBox.children[1].setAttribute('id', `d${d}-d10-dice-canvas`);
          //     }
          //     diceScene.render();
          //   });
            
  
          //   //add custom dice
          //   const holderDiv = document.createElement('div');
          //   holderDiv.classList = ("holder-div title");
          //   const imgDiv = document.createElement('div');
          //   imgDiv.classList.add("img-div");
          //   imgDiv.setAttribute("id", `custom-img-div`);
          //   const customInput = document.createElement('input');
          //   customInput.setAttribute("id", `custom-input`);
          //   customInput.setAttribute("onchange", "customDiceOnChange(event)");
          //   imgDiv.append(customInput);
          //   const diceName = document.createElement('div');
          //   diceName.classList = "dicename-div custom-dicename";
          //   diceName.setAttribute("id", `custom-text`);
          //   diceName.innerText = "d?";
          //   const addButton = document.createElement('div');
          //   addButton.classList = "button custom-dice";
          //   addButton.innerText = "add"
          //   addButton.setAttribute("onclick", `diceClickHandler(event)`);
          //   addButton.setAttribute("id", `d?`);
          //   holderDiv.append(diceName);
          //   holderDiv.append(imgDiv);
          //   holderDiv.append(addButton)
  
          //   imgBox.append(holderDiv);
          // }
  
          const modifierChange = (e) => {
            const upDown = e.target.id.split('-')[1];
            let modEl = document.getElementById('modifier');
            if (upDown === 'up') dr.modifier++;
            if (upDown === 'down') dr.modifier--;
            modEl.innerText = dr.modifier;
          }
  
          const addDice = (diceName) => {
            dr.addOneDice(diceName);
          }
          const minusDice = (diceName) => {
            if (dr.getNumberOfDice(diceName) == 0) return;
            dr.minusOneDice(diceName);
          }
  
  
          function addRow(diceName) {
            const rowDiv = document.createElement('div');
            rowDiv.classList = `row slide ${diceName}`;
            const innerHtml = `
      <div class="cell d-name">${diceName}</div>
      <div class="cell d-quantity-select">
        <div class="cell d-quantity" id="${diceName}-quantity">1</div>
        <div class="cell d-select">
          <div class="selector dice" onclick="arrowClick(event)" id="${diceName}-up">
              /\\
            </div>
            <div class="selector dice" onclick="arrowClick(event)" id="${diceName}-down">
              \\/
            </div>
        </div>
      </div>` 
            rowDiv.innerHTML = innerHtml;
            document.getElementById("dice-table").append(rowDiv);
          }
  
          function arrowClick(e) {
            const idArray = e.target.id.split("-");
            const diceName = idArray[0];
            const upDown = idArray[1];
            if (upDown === "up") addDice(diceName);
            if (upDown === "down") minusDice(diceName);
          }
  
          function diceClickHandler(e) {
            const diceName = e.target.id.split("-")[0];
            if (isNaN(diceName.slice(1, ))) {
              alert(`${diceName} isn't a dice`);
              return;
            }
            if (dr.diceHasBeenAdded(diceName)) {
              addDice(diceName);
            } else {
              dr.addOneDice(diceName);
              addRow(diceName);
            }
          }
  
          function customDiceOnChange(e) {
            const string = e.srcElement.value;
            if (isNaN(string)) {
              alert("Please enter a number");
              return;
            }
            const diceNumber = document.getElementsByClassName('custom-dicename')[0];
            document.getElementsByClassName('custom-dice')[0].setAttribute("id", `d${string}`);
            diceNumber.innerText = `d${string}`;
          }
  
          function changeNumber(e) {
            const el = e.target;
            const rowEl = e.target.parentNode.parentNode;
            const childIndex = el.className == 'selector dice' ? 2 : 4;
            const numberCell = rowEl.children[childIndex];
  
            if (el.innerText === '/\\') numberCell.innerText++;
            if (el.innerText === '\\/') numberCell.innerText--;
          }
  
          function roll() {
            dr.upToDate = false;
            dr.slowDownAllDice(); 
            const diceObj = dr.getDiceObject();
            if (Object.keys(diceObj).length === 0 && diceObj.constructor === Object) {
              alert('Please select dice to roll');
              return;
            }
            for (let d in diceObj) {
              let scenes = dr.getScenesByDice(d);
              let currentDice = diceObj[d];
              let diceCount = 0;
              while (diceCount < currentDice.quantity) {
  
                const result = Math.ceil(Math.random() * currentDice.value);
                currentDice.results.push(result);
                scenes[diceCount].setResult(result);
                diceCount++;
              }
              diceObj[d] = currentDice;
            }
            dr.setDiceObject(diceObj);
            // applyResults(diceObj);
            let undoButton = document.getElementById('undo-button');
            undoButton.classList = "button";
  
          }
  
          function reset() {
            var rows = document.getElementsByClassName('row slide');
            for (let i = rows.length - 1; i >= 0 ; i--) {
              rows[i].parentNode.removeChild(rows[i]);
            }
            dr.reset();
            let resultBox = document.getElementById('result-box');
            resultBox.innerText = '';
            let undoButton = document.getElementById('undo-button');
            undoButton.classList = "button hide";
          }
  
          // const applyResults = (diceObj) => {
          //   const allResultsBox = document.getElementById("result-box");
          //   const modifier = document.getElementById("modifier").innerText;
          //   let resultsString = '';
          //   let grandTotal = 0;
          //   for (let d in diceObj) {
          //     let total = 0;
          //     let currentDice = diceObj[d];
          //     let resultsBox = document.getElementById(`${d}-results`);
          //     resultsBox.innerText = currentDice.results;
          //     resultsString += `${d}: `
          //     currentDice.results.forEach((r) => {
          //       if (r == 20) {
          //         resultsString += `<strong style="color:#b50004">${r}</strong> `;
          //       } else {
          //         resultsString += `${r} `;
          //       }
          //       total += r;
          //     })
  
          //     if (currentDice.results.length > 1) {
          //       resultsString += `<br> Total: ${total} <br> `
          //     } else {
          //       resultsString += `<br>`;
          //     }
          //     grandTotal += total;
          //   }
          //   if (modifier) resultsString += `<br>Modifier: ${modifier}\n`
          //   resultsString += `<br><strong>Grand Total: ${parseInt(grandTotal) + parseInt(modifier)}</strong> <hr>\n`;
          //   dr.addResult(resultsString);
          //   allResultsBox.innerHTML = RESULTS_TEXT.join("");
          // }
  
          // const removeLastRollResults = () =>{
          //   const allResultsBox = document.getElementById("result-box");
          //   dr.clearLastResult();
          //   dr.rollAllDice();
          //   allResultsBox.innerHTML = RESULTS_TEXT.join("");
          // }
  
          // start();

const createDiv = (classname) => <div className={classname}></div>;



const diceImage = (d,i) => {
  function diceClickHandler(e) {
    const diceName = e.target.id.split("-")[0];
    if (isNaN(diceName.slice(1, ))) {
      alert(`${diceName} isn't a dice`);
      return;
    }
    if (dr.diceHasBeenAdded(diceName)) {
      addDice(diceName);
    } else {
      dr.addOneDice(diceName);
      addRow(diceName);
    }
  }
  const diceScene = new DiceScene(this,d, this,1,-i,
    {
      rendererSize:d === 100 ? 50 : 100,
      cameraPerspective:90,
      diceSize:220
    })
  diceScene.render();
  return(
    <div     
      className="holder-div title" 
      id={`d${d}-button`}
      onclick={diceClickHandler}>
        <div 
          className="dicename-div" 
          id={`d${d}-text`}>
            d4
        </div>
        {diceScene.scene.canvasBox}
      </div>
  )
}
export default class DiceRollerApp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        imgBox: createDiv('img-box'),
        imgElements:[]
      }
      this.start();
    }

    start = () => {
      const diceNumbers = [4,6,8,10,12,20,100];
      const imgBox = this.state.imgBox;
      const imgElements = [];
      diceNumbers.forEach((d,i) => {
        const img = diceImage(d,i);
        imgElements.push(img);
      });
      this.setState({imgElements:imgElements});

      //add custom dice
      const holderDiv = document.createElement('div');
      holderDiv.classList = ("holder-div title");
      const imgDiv = document.createElement('div');
      imgDiv.classList.add("img-div");
      imgDiv.setAttribute("id", `custom-img-div`);
      const customInput = document.createElement('input');
      customInput.setAttribute("id", `custom-input`);
      customInput.setAttribute("onchange", "customDiceOnChange(event)");
      imgDiv.append(customInput);
      const diceName = document.createElement('div');
      diceName.classList = "dicename-div custom-dicename";
      diceName.setAttribute("id", `custom-text`);
      diceName.innerText = "d?";
      const addButton = document.createElement('div');
      addButton.classList = "button custom-dice";
      addButton.innerText = "add"
      addButton.setAttribute("onclick", `diceClickHandler(event)`);
      addButton.setAttribute("id", `d?`);
      holderDiv.append(diceName);
      holderDiv.append(imgDiv);
      holderDiv.append(addButton)

      imgBox.append(holderDiv);
    }


    render() {
        return(
        <div class="dice-body">
        <div class="title-box">
          <h1 class="main-title">DICE SIMULATOR</h1>
          <p>Click on the dice to select.</p>
          {this.state.imgBox}
          {this.state.imgElements}
          <div class="buttons-box">
            <div class="button" id="reset-button" onclick="reset(event)">reset</div>
            <div class="modifier-box">

              <div class="title">Modifier</div>
              <div class="modifier arrow" id="modifier-down" onclick="modifierChange(event)"> &lt;  </div>
              <div class="modifier number" id="modifier">0</div>
              <div class="modifier arrow" id="modifier-up" onclick="modifierChange(event)"> &gt;  </div>
            </div>
            <div class="button" id="button" onclick="roll(event)">roll</div>
            <div class="button hide" id="undo-button" onclick="removeLastRollResults()">undo</div>
          </div>
        </div>
        <div class="animation-window col-sm-12" id="animations"></div>
        <div class="table col-md-6 col-sm-12" id="dice-table">

          <div class="row title-row">
            <div class="cell d-name title">dice</div>
            <div class="cell d-quantity-select title">
              number
            </div>
          </div>
        </div>
        <div id="result-box" class="col-md-6 col-sm-12">

        </div>
      </div>
      
    )}
}