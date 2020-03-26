import React, { Component } from 'react';
import { face } from '../../static/facepic.js';
import { Row, Col } from 'react-materialize';
import DiceRollerApp from '../Projects/Dice/DiceRollerApp';
import TestThree from '../Projects/ThreeJS/test'
import lakarencita from '../../static/lakarencita.PNG';
import snakegame from '../../static/snakegif.gif';

class OpeningScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            text:face(),
            screenText:[],
                       
        }
        this.intervalId = '';
    }

    componentDidMount(){
        this.typeText();
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    createSkillSections =() => {
        const skills = [
            {
                name:"Excel&VBA",
                percentage:95
            },
            {
                name:"Google scripts",
                percentage:75
            },
            {
                name:"JavaScript",
                percentage:75
            },
            {
                name:"Python",
                percentage:50
            },
            {
                name:"Web development",
                percentage:65
            },
            {
                name:"Java",
                percentage:10
            }

        ];
        const skillsElements = skills.map((s,i) => {
            return this.createSkillAndProgressBar(s.name,s.percentage,i);
        });
        return skillsElements;
    }
    
    createSkillAndProgressBar = (skillName, percentage, id) => {
        const percentageStr = `${percentage}%`;
        const classNames = (() => {
            let active = "";
            if (this.state.activeSkill) {
                if (parseInt(id) === parseInt(this.state.activeSkill)){
                    active = "active-skill"
                } else {
                    active = "inactive-skill"
                }
            }
            return `button-style skill ${active}`;
        })();
        return (
            <div className={classNames} key={skillName} id={id} onClick={this.clickHandler}>
                <div className="skill-name">{skillName}</div>
                <div className="skill-bar">
                    <div className="skill-bar-fill" style={{width: percentageStr}}></div>
                </div>
            </div>        
        )
    }

    typeText = () => {
        const sp = (text,key) => <span key={key} style={{whiteSpace: 'pre-line'}}>{text}</span>;
        const results = this.state.screenText;
        let start = 0;
        let cursor = 0;
        const intervalId = setInterval(() => {
            if (results.length) results.pop();
            const str = this.state.text.slice(start,cursor);
            const span = sp(str,cursor);
            results.push(span);
            this.setState({screenText:results});
            start = Math.floor((cursor / 80));
            cursor += 1;
            if (cursor > this.state.text.length) clearInterval(intervalId);  
        },5);
        
        this.intervalId = intervalId;
    }
    
    render() {
        return (
            <div className="code-text full-height" >
                <Row className="tall-80">
                    <Col s={4} m={3} >
                        <div className="face-pic">
                            <span>{this.props.progress}</span>
                                <span id="typing">
                                    {this.state.screenText}
                                </span>
                            <span className="blink_me" id="cursor"></span>
                        </div>
                    </Col>
                    <Col s={8} m={9}>
                    <div className="main-screen">
                        <span className="code-title">web design - scripting - automation</span>
                        <p className="hide-on-tiny-screens">Four years' experience creating beautiful, responsive websites and providing automation solutions for
                            businesses.
                        </p>
                    </div>
                    </Col>
                    
                    
                </Row>
                <Row>
                    <Col s={12} className="text-center no-padding-on-mobile">
                        {this.createSkillSections()}
                    </Col>                   
                </Row>
            </div>
        )
    }

}
const ImageDiv = (props) => {
    return (
        <img className="lakarencita" 
                        src={props.source} alt="la karencita" 
                        style={{
                            height:`${props.screenHeight + 5}px`,
                            width:`${props.screenWidth + 5}px`,
                            // marginTop: -5 + "px",
                            // marginLeft: -5 + "px"

                        }}></img>
    )
}

export default class LaptopScreen extends Component {
    
    
    showScreen = () => {
        switch(this.props.position) {
            case 0:
                return <OpeningScreen />
            case 1:
                return <TestThree />;
            case 2:
                return <TestThree />;
            case 3:
                return <DiceRollerApp />;
            case 4:
                return <ImageDiv source={lakarencita} screenHeight={this.props.screenHeight} width={this.props.screenWidth} />;
            case 5:
                return <ImageDiv source={snakegame} screenHeight={this.props.screenHeight} width={this.props.screenWidth} />;
            case 6:
                return <ImageDiv source={snakegame} screenHeight={this.props.screenHeight} width={this.props.screenWidth} />;
            default:
                return <div></div>;
        }
    }
    render() {
        return (
            <div 
                
                className={`relative 
                    ${this.props.position > 3 ? 'white' :''}`
                    }>
                {this.showScreen(this.props.position)}

            </div>
        )
    }
}
