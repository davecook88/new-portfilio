import React, { Component } from 'react'
import './namelogo.scss';
import { Row, Col } from 'react-materialize';

export default class NameLogo extends Component {
  render() {
    return (
      <div >
        
        <Row>
          <div className="logo box first-name  slide-in-right dark-blue-fade">
            <span className="logo-letter " id="Dave">DAVE</span>
          </div>
        </Row>
        
        <Row>
          <div className="logo box last-name slide-in-right light-blue-fade">
            <span className="logo-letter" id="C">COOK</span>
          </div>
        </Row>
    
        {/* <Row>
          <div className="logo subtitle full-row">
            <span className="gren-text darken-4">codes</span>
          </div>
        </Row> */}
      </div>
    )
  }
}
