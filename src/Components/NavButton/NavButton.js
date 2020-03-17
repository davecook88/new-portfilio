import React, { Component } from 'react';
import './navbutton.scss'

export default class NavButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:true,
    }
  }
  render() {
    return (
      <div className="navbutton">
        <div className="menu-bar">
          <ul>
            {this.props.position !== 0 ? <li>home</li> : ''}
            <li>web design</li>
            <li>automation</li>
            <li>about</li>
            <li>contact</li>
          </ul>
        </div>
        <div className="nav-line-holder" onClick={this.props.toggleMenu}>
          <div className={`white nav-line one ${this.props.open ? 'closed-cross' : 'open-arrow'}`}></div>
          <div className={`white nav-line two ${this.props.open ? 'closed-cross' : 'open-arrow'}`}></div>
        </div>
      </div>
    )
  }
}
