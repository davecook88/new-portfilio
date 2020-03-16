import React, { Component } from 'react'
import * as THREE from 'three';
import Dice from "./Dice";


const ResultText = (props) => {
    return (
        <h1 
            className={`text-result d${props.type} ${props.classes}`}
            id={`d${props.type}-result-text`}>
                {props.value}
        </h1>)
}

export default class DiceScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // context:props.context,
            id: props.id || 0,
            diceType: props.diceType || 6,
            resultTextClasses:'',
            d10:props.diceType === 100 ? this.createD100() : '',
        }
        this.size = this.calculateDiceSize(props.size);
        this.scene = this.createScene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer(props.rendererSize);
    }

    componentDidMount(){
        this.scene.add(this.props.dice.element);
        this.mount.appendChild(this.renderer.domElement);
        this.threeRender();
    }
    addNewDice(){
        if (this.props.clickHandler){
            this.props.clickHandler(this.state.diceType);
            if (this.state.diceType === 100) this.props.clickHandler(10);
        }
    }
    calculateDiceSize(size = 200){
        if (!size) size =  200;
        return this.state.diceType < 7 ? size * 1.2 : size;   
    }
    createCamera() {
        let width = 500;
        let height = 500;	
        let camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 )
        camera.position.z = 400;
        return camera;
    }
    createD100() {
        const dice = new Dice(100,{size:this.props.size});
        return <DiceScene 
            key={`display-d100-d10`} 
            diceType={10} 
            dice={dice}
            rendererSize={this.props.rendererSize} 
            onClick={this.props.addNewDice}
            />;
    }
    createRenderer(size){
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(size,size);
        renderer.domElement.id = 'dice-canvas';
        return renderer;
    }
    createScene() {
        let scene = new THREE.Scene();
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
        directionalLight.position.x = -150;
        directionalLight.position.y = 100;
        directionalLight.position.z = 50;
        scene.add(directionalLight);
        var bottomLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
        bottomLight.position.y = -20;
        bottomLight.position.z = 50;
        scene.background = new THREE.Color( 0xffffff );
        scene.add(bottomLight);
        return scene;
    }
    createResultTextClasses(){
        const classes = this.props.dice.showAnswer ? ' show-result text-fade-in' : '';
        console.log(classes);
        console.log(this.props.dice.showAnswer)
        return classes;
    }
    hideResult(){
        if (this.state.showResult) {
            this.props.showResultsOnPage(false);
            this.setState({showResult: false});
        }
    }
    showResult() {
        if (!this.state.showResult) {
            this.props.showResultsOnPage(true);
            this.setState({showResult: true});
        }
    }
    threeRender = () => {
        requestAnimationFrame(this.threeRender);
        this.renderer.render(this.scene, this.camera);
        if (this.props.dice.slowDown) {
            this.props.dice.reduceRotationAllAxes();
        } else {
            this.props.dice.spinAllAxes();
        }
        if (this.props.dice.showAnswer) {
          this.showResult();
        } else {
          this.hideResult();
        }
    }
    render() {
        return (
            
            <div 
                ref={ref => this.mount = ref}
                className={`canvas-box d${this.props.dice.type}`}//${this.extraClassNames}
                id={`canvas-box-`}//${toString(this.state.id)}
                onClick={() => this.addNewDice()}
                >
                <ResultText 
                    classes={this.state.showResult ? ' show-result text-fade-in' : '' }
                    type={this.props.dice.type}
                    value={this.props.dice.result}
                    >
                        
                </ResultText>
                {this.state.d10}
            </div>
        )
    }
}
