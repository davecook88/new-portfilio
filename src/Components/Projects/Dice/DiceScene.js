import React, { Component } from 'react'
import * as THREE from 'three';
import Dice from './Dice'

const ResultText = (props) => {
    return (
        <h1 
            className={`text-result d${props.type} ${props.classes}`}
            id={`d${props.type}-result-text`}>

        </h1>)
}

export default class DiceScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // context:props.context,
            result: props.result || 1,
            id: props.id || 0,
            diceType: props.diceType || 6,
            d10:props.diceType === 100 ? <DiceScene 
                                            key={`display-d100-d10`} 
                                            context={this} 
                                            diceType={10} 
                                            size={props.size} 
                                            rendererSize={props.rendererSize} 
                                            /> : '',
        }
        // this.id = props.id || 0;
        this.size = this.calculateDiceSize(props.size);
        this.scene = this.createScene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer(props.rendererSize);
        this.dice = new Dice(this.state.diceType, this, {size:this.diceSize});
    }

    componentDidMount(){
        this.scene.add(this.dice.element);
        this.mount.appendChild(this.renderer.domElement);
        this.threeRender();
    }
    addNewDice(){
        if (this.props.clickHandler){
            this.props.clickHandler(this.state.diceType);
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
        return this.state.showResult ? ' show-result text-fade-in' : '';
    }
    hideResult(){
        this.setState({showResult: false});
    }
    showResult() {
        this.setState({showResult: true});
    }
    threeRender = () => {
        requestAnimationFrame(this.threeRender);
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
    render() {
        return (
            
            <div 
                ref={ref => this.mount = ref}
                className={`canvas-box d${this.state.diceType}`}//${this.extraClassNames}
                id={`canvas-box-`}//${toString(this.state.id)}
                onClick={() => this.addNewDice()}
                >
                <ResultText 
                    class={() => this.createResultTextClasses()}
                    type={() => this.state.diceType}
                    >
                        {() => this.state.result}
                </ResultText>
                {this.state.d10}
            </div>
        )
    }
}
