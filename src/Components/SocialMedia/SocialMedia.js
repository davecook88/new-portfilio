import React, { Component } from 'react'

class SocialMediaButton extends Component{
    constructor(props){
      super(props);
      this.state = {
        hovered:false,
      }
      this.logo = props.logo;
      this.link = props.link;
    }
    getClassNames = () => {
      let hovered = this.state.hovered ? "spin" : "";
      let name = `fab fa-${this.logo} ${hovered}`;
      return name;
    }
  
    handleHover = () => {
      this.setState({hovered: true}, () => {
        setTimeout(() => {
          this.setState({hovered:false})
        }, 3000)
      })
    }
    render () {
      return (
        <div className="social-media-button" onMouseEnter={this.handleHover}>
          <a className="social-media-link" href={this.link}>
            <i className={this.getClassNames()}></i>
          </a>
        </div>
      )
    }
  }

export default class SocialMediaBar extends Component{
    constructor(props){
      super(props);
      this.logo = props.logo;
      this.accounts = [
        ['github','https://github.com/davecook88'],
        ['codepen','https://codepen.com/DVC888'],
        ['youtube', 'https://youtube.com/lakarencitaMX'],
        ['twitter', 'https://twitter.com/DaveCookUK'],
        ['linkedin', 'https://www.linkedin.com/in/david-cook-a1549ba2/']
      ]
      
    }
    createButtons = () => {
      let elementArray = this.accounts.map((acc) => {
        return <SocialMediaButton key={acc[0]} logo={acc[0]} link={acc[1]} />
      });
      return elementArray;
    }
    getClassNames = (props) => {
      return `social-media-bar  text-center ${props.classes}`
    }
    render () {
      return (
        <div className={this.getClassNames(this.props)}>
          {this.createButtons()}
        </div>
      )
    }
  }