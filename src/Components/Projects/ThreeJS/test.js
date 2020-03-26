import React, { Component } from "react";
import { FaHtml5,FaBootstrap, FaCss3, FaSass, FaReact, FaPython, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { DiMaterializecss, DiJqueryLogo, DiSqllite, DiPostgresql, DiMongodb} from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io";
import { Container, Row } from "react-materialize"
import './logos.scss';


export default class TestThree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      colorIndex:0
    }
    this.intervalId = null;
  }
  componentDidMount() {
    this.intervalId =  setInterval(() => {
      
      let state = this.state;
      state.colorIndex = state.colorIndex === 4 ?  0 : ++state.colorIndex;
      this.setState(state)
    },1000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalId); 
  }

  createColorClass() {
    const colors = ["teal",'blue', 'indigo','cyan','lime']
    let {colorIndex} = this.state;
    return colors[colorIndex];
  }
  
  render() {
    return (
      <Container className="logos">
        <Row>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1 `}>
            <FaHtml5  />
            <div className='small-text'>html</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <FaCss3  />
            <div className='small-text'>css</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <FaSass  />
            <div className='small-text'>sass</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <DiMaterializecss  />
            <div className='small-text'>materialize</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <FaBootstrap  />
            <div className='small-text'>bootstrap</div>
          </div>
        </Row>
        <Row>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <IoLogoJavascript  />
            <div className='small-text'>javascript</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <FaNodeJs  />
            <div className='small-text'>node</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <FaReact  />
            <div className='small-text'>react</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <DiJqueryLogo  />
            <div className='small-text'>jquery</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <FaPython  />
            <div className='small-text'>python</div>
          </div>
        </Row>
        <Row>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <DiSqllite  />
            <div className='small-text'>sqlite</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <DiPostgresql  />
            <div className='small-text'>postgresql</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <DiMongodb  />
            <div className='small-text'>mongodb</div>
          </div>
          <div className={`logo-holder ${this.createColorClass()}-text text-accent-1`}>
            <FaGitAlt  />
            <div className='small-text'>git</div>
          </div>

        </Row>
      </Container>
    )
  }
}