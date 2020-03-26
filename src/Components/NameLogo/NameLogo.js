import React, { Component } from 'react'
import './namelogo.scss';
import { Row } from 'react-materialize';

export default class NameLogo extends Component {
  render() {
    return (
      <div>
        
        <Row>
          <div className={`${this.props.position === 0 ? 'normal' : 'small'} logo box first-name  slide-in-right dark-blue-fade`}>
            <span className="logo-letter " id="Dave">DAVE</span>
          </div>
        </Row>
        
        <Row>
          <div className={`${this.props.position === 0 ? 'normal' : 'small'} logo box last-name slide-in-right light-blue-fade`}>
            <span className="logo-letter" id="C">COOK</span>
          </div>
        </Row>
{/*     
        <Row>
          <div className="logo subtitle full-row">
            <span className='intro-text'>
                  <p>Don't waste any more time on repetitive tasks.</p>
            </span>
          </div>
        </Row> */}
      </div>
    )
  }
}
