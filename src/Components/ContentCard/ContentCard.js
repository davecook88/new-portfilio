import React, { Component } from 'react'
import {FaReact} from "react-icons/fa";
import {DiJqueryLogo} from "react-icons/di";
import {IoLogoJavascript} from "react-icons/io";
import '../ContentCard/contentcard.scss';

const ContentOne = () => {
  return (
    <div >
            <p>Experienced with a variety of JavaScript frameworks. Including:</p>
            <ul>
              <li><FaReact/>ReactJS</li>
              <li><DiJqueryLogo />jQuery</li>
              <li><IoLogoJavascript />ThreeJS</li>
            </ul>
            <p>And still learning more every day...</p>
    </div>
  )
}
const ContentTwo = () => {
  return (
  <div >
    <h4>Animate Dice Roller App</h4>
    <p>Custom-made embeddable app for a client's online Shopify store.</p>
    <p>Made with ThreeJS for animating 3D dice shapes, this was developed to be 
      copied and pasted directly into the embeddable content field of the client's Shopify page.
    </p>
    <p>If you have a website with Wordpress, Squarespace, Wix or other website builder but you're looking for
      custom functionality, get in touch.
    </p>
  </div>
)}
export default class ContentCard extends Component {
  selectContent = () => {
    const type = this.props.type;    
    switch(type){
      case 'jsSkills':
        return <ContentOne color='light-blue' />;
      case 'diceApp':
        return <ContentTwo color='cyan' />;
      default:
        return <ContentOne color='light-blue'/>;
    }
  }
  selectColor = () => {
    const type = this.props.type; 
    switch(type){
      case 'jsSkills':
        return 'light-blue';
      case 'diceApp':
        return 'cyan';
      default:
        return 'light-blue';
    }
  }
  render() {
    return (
        <div className={
          `card 
          ${this.selectColor()} 
          content 
          ${this.props.slide ? 
            this.props.position === 1 ? 'slide-in' : '' : //If slide
          'scroll'}`}> 
          {this.selectContent()}
        </div>
        
    )
  }
}
