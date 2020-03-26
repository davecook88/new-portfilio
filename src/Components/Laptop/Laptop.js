import React, { Component } from 'react'
import LaptopScreen from './LaptopScreen'
import './laptop.scss'

const Button = (props) => {
    return (<div className="laptop-key" onClick={()=> props.onClick(props.character)}>
        <span className="laptop-letter">{props.character}</span>
        </div>);
}

export default class Laptop extends Component {
    constructor(props) {
        super(props);
        this.state= {
            screenHeight: null,
            screenWidth:null,
            style:null,
            floatUpStyle: null
        }
    }

    componentDidMount() {
        const style = this.props.style;
        const height = (style.height * 0.85);
        const width = (style.width * 0.9);
        this.setState({screenHeight:height, screenWidth:width});
    }
    
    onKeyClick = (keyPressed) => {        
        let screenText = this.state.text + keyPressed;
        this.setState({text:screenText});
    }


    createKeys(characters){
        return characters.split('').map((char, key) => {
            return (<Button character={char} key={key} onClick={this.onKeyClick}/>);
        })
    }
    getBackgroundColorClass = () => {
        if (this.props.position > 2)  return 'white no-padding';
        return 'black static';
    }   
    
    render() {
        return (
            <div className={`laptop-drawing fixed screen-center` }
                style={this.props.style}>  
                <div className="laptop-screen-outer">
                    <div className="laptop-camera">
                    <div></div>
                    </div>
                    <div 
                        className={`laptop-screen-inner ${this.getBackgroundColorClass()}`}
                        onClick={this.typeText}
                        ref={ (divElement) => { this.divElement = divElement } }
                        >
                        
                        <div id="screen">
                            <LaptopScreen position={this.props.position} screenHeight={this.state.screenHeight} />
                        </div>
                    </div>
                </div>
                <div className="laptop-keyboard">
                    <div className="laptop-keys-box"> 
                        <div className="laptop-keys-space letters">
                            <div className="laptop-keys-row">
                                {this.createKeys('qwertyuiop')}
                            </div>
                            <div className="laptop-keys-row">
                                {this.createKeys('asdfghjkl')}
                            </div>
                            <div className="laptop-keys-row">
                                {this.createKeys('zxcvbnm')}
                            </div>
                        </div>
                        <div className="laptop-keys-space numbers">
                            <div className="laptop-keys-row">
                                {this.createKeys('789')}
                            </div>
                            <div className="laptop-keys-row">
                                {this.createKeys('456')}
                            </div>
                            <div className="laptop-keys-row">
                                {this.createKeys('123')}
                            </div>
                        </div>
                    </div>
                    <div className="laptop-trackpad">   
                    </div>
                </div>
                <div className="laptop-keyboard-base">
                </div>
            </div>
        )
    }
}
