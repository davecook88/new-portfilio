import React, { Component } from 'react';
import { face } from '../../static/facepic.js';
import SocialMediaBar from './../SocialMedia/SocialMedia'
import { Row, Col } from 'react-materialize';
import DiceRollerApp from '../Projects/Dice/DiceRollerApp';
import TestThree from '../Projects/ThreeJS/test'

class OpeningScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            text:face(),
            screenText:[],
            intervalId:null
            
        }
        
    }

    componentDidMount = () => {
        // this.typeText();
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId);
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
        
        this.setState({intervalId: intervalId});  
    }
    
    render() {
        return (
            <div className="code-text full-height" >
                <Row className="tall-80">
                    <Col s={3} >
                        <div className="face-pic">
                            <span>{this.props.progress}</span>
                                <span id="typing">
                                    {this.state.screenText}
                                </span>
                            <span className="blink_me" id="cursor"></span>
                        </div>
                    </Col>
                    <Col s={9}>
                        <div className="main-screen">
                            <span className="code-title">web design - scripting - automation</span>
                            <p>Four years' experience creating beautiful, responsive websites and providing automation solutions for
                                businesses.
                            </p>
                            <ul>
                                <li>Automate repetitive tasks and increase your productivity.</li>
                                <li>Eliminate human error with automation.</li>
                                <li>Integrate online APIs.</li>
                                <li>Improve your efficiency.</li>
                            </ul>
                            <p>
                                Scroll down to see examples of my work.
                            </p>
                        </div>
                    </Col>
                    
                    
                </Row>
                <Row>
                    <Col s={3} className="text-center">
                        <a style={{textDecoration:`none`, fontSize:`12px`}} className="code-text" href="mailto:davecook@hotmail.co.uk">davecook@hotmail.co.uk</a>
                        <SocialMediaBar />
                    </Col> 
                    <Col s={9} className="text-center">
                        {this.createSkillSections()}
                    </Col>                   
                </Row>
            </div>
        )
    }

}

export default class LaptopScreen extends Component {
    showScreen() {
        switch(this.props.screen) {
            case 'start':
                return <OpeningScreen />
            case 'test':
                return <TestThree />;
            case 'dice':
                return <DiceRollerApp />;
            default:
                return <div></div>;
        }
    }
    render() {
        return (
            <div className="relative">
                {this.showScreen()}
            </div>
        )
    }
}
