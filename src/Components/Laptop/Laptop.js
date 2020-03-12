import React, { Component } from 'react'
import LaptopScreen from './LaptopScreen'
import './laptop.scss'


const Button = (props) => {
    return (<div className="laptop-key" onClick={()=> props.onClick(props.character)}>
        <span className="laptop-letter">{props.character}</span>
        </div>);
}

export default class Laptop extends Component {
    
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
        switch (this.props.screen){
            case 'dice':
                return 'white';
            default:
                return 'black'

        }
    }
    
    

    render() {
        return (
            <div className="laptop-drawing fixed screen-center"  
                style={this.props.style}>  
                <div className="laptop-screen-outer">
                    <div className="laptop-camera">
                    <div></div>
                    </div>
                    <div className={`laptop-screen-inner ${this.getBackgroundColorClass()}`}onClick={this.typeText}>
                        <div id="screen">
                            <LaptopScreen screen={this.props.screen} />
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
