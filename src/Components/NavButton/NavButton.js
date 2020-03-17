import React, { Component } from 'react';
import './navbutton.scss'

export default class NavButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:true,
    }
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(){
    const newState = !this.props.open;
    console.log(newState);
    this.props.toggleMenu(newState);
  }
  render() {
    return (
      <div className="navbutton">
        <div className={`menu-bar ${this.props.open ? '' : 'closed'}`}>
          <ul>
            {this.props.position !== 0 ? <li>home</li> : ''}
            <li>web design</li>
            <li>automation</li>
            <li>about</li>
            <li>contact</li>
          </ul>
        </div>
        <div className={`nav-line-holder ${this.props.open ? '' : 'closed'}`} onClick={this.clickHandler}>
          <div className={`white nav-line one ${this.props.open ? 'open-arrow':'closed-cross'}`}></div>
          <div className={`white nav-line two ${this.props.open ? 'open-arrow':'closed-cross'}`}></div>
        </div>
      </div>
    )
  }
}
