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
    <h4>Animated Dice Roller App</h4>
    <p>Custom-made embeddable app for a client's online Shopify store.</p>
    <p>Made with ThreeJS for animating 3D dice shapes, this was developed to be 
      copied and pasted directly into the embeddable content field of the client's Shopify page.
    </p>
    <p>If you have a website with Wordpress, Squarespace, Wix or other website builder but you're looking for
      custom functionality, get in touch.
    </p>
  </div>
)}

const ContentThree = () => {
  return (
  <div >
    <h4>Bespoke websites and interactive CVs</h4>
    <p>Making bespoke websites and landing pages for companies and individuals
    </p>
    <p>If you are looking for a job, what better way to stand out from the crowd than with 
      a web-based interactive CV?
    </p>
  </div>
  )}

const ContentFour = () => {
  return (
    <div >
      <h4>I'm also a dab hand with spreadsheets</h4>
      <p>I've never worked in a business that didn't spend hours each week doing repetitive tasks on spreadsheets 
        because they didn't know there was another way. Most small businesses don't have the budget for a full-time 
        automation specialist - this is where I come in.
      </p>
      <p>Scroll down to see a detailed list of services offered.</p>
    </div>
  )
}

export default class ContentCard extends Component {
  selectContent = () => {
    const type = this.props.type;    
    switch(type){
      case 'jsSkills':
        return <ContentOne  />;
      case 'diceApp':
        return <ContentTwo />
      case 'lakarencita':
        return <ContentThree />
      case 'snakegame':
        return <ContentFour />
      default:
        return <ContentOne />;
    }
  }
  selectColor = () => {
    const type = this.props.type; 
    switch(type){
      case 'jsSkills':
        return 'light-blue';
      case 'diceApp':
        return 'cyan';
      case 'lakarencita':
        return `cyan accent-4`;
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
            this.props.position === 1 || 
            this.props.position === 4 ? 'slide-in' : '' : //If slide
          'scroll'}
          ${this.props.hide ? 'hide' : ''}
          `}> 
          {this.selectContent()}
        </div>
        
    )
  }
}
