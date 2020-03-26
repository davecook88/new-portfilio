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
            {this.props.position !== 0 ? <li><a className="black-text" href="#first">home</a></li> : ''}
            <li><a className="black-text" href="#second">web design</a></li>
            <li><a className="black-text" href="#fourth">automation</a></li>
            <li><a className="black-text" href="#sixth">contact</a></li>
          </ul>
        </div>
        <div className={`nav-line-holder ${this.props.open ? 'closed':''}`} onClick={this.clickHandler}>
          <div className={`white nav-line one ${this.props.open ? 'closed-cross':'open-arrow'}`}></div>
          <div className={`white nav-line two ${this.props.open ? 'closed-cross':'open-arrow'}`}></div>
        </div>
      </div>
    )
  }
}
