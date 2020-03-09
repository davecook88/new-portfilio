import React, { Component } from 'react';
import { face } from '../../static/facepic.js';
import SocialMediaBar from './../SocialMedia/SocialMedia'
import { Row, Col } from 'react-materialize';


class OpeningScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            text:face(),
            screenText:[]
        }
    }

    componentDidMount = () => {
        this.typeText();
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
        
             
    }
    
    render() {
        return (
            <div className="code-text" >
                <Row>
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
                    <Col s={2}>
                        <div className="skills-screen" style={{height:`75%`, width:`15%`}}>
                        </div>
                    </Col>
                    
                </Row>
                <Row>
                    <Col s={12}>
                        <SocialMediaBar />
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
                return <OpeningScreen />;
            default:
                return <OpeningScreen />;
        }
    }
    render() {
        return (
            <div>
                {this.showScreen()}
            </div>
        )
    }
}
