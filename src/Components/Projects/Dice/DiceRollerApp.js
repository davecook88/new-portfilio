import React, { Component } from 'react';
import DiceScene from './DiceScene';

export default class DiceRollerApp extends Component {
    render() {
        return (
            <div>
                <DiceScene 
                    context={this}
                    diceType={6}
                    size={200}
                    rendererSize={120}
                />
            </div>
        )
    }
}
