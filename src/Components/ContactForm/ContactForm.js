import React from 'react';
import { TextInput, Textarea, Button, Row } from 'react-materialize';

class ContactForm extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          name:'',
          email:'',
          message:'',
      }
      this.URL = "https://script.google.com/macros/s/AKfycbxK2MdwVTDU6snWstKn6yBmlwE1GsqCUDdL38PRMc14eaaPniPf/exec";
      
    }
    changeHandler = (e) => {
        let id = e.target.id;
        let val = e.target.value;
        let s = this.state;
        s[id] = val
        this.setState(s);
    }
    clickHandler = (e) => {
        e.preventDefault();
        this.submitFormData(e);
    }
    setUpXmlHttpRequest() {
        let xhr = new XMLHttpRequest();
        xhr.open('post', this.URL);
        xhr.onload = function() {
            if(xhr.status !== 200)
            {
                return alert("Unexpected response");
            }

            const response = JSON.parse(xhr.responseText);
            if (response.message === 0)
            {
                return console.log(response.error);
            }
            return console.log(response);
        };
        return xhr;
    }
    submitFormData(e){
        const data = {
            timestamp:null,
            name:this.state.name,
            email:this.state.email,
            message:this.state.message,
        }

        let xhr = this.setUpXmlHttpRequest();
        const payload = JSON.stringify(data);
        xhr.send(JSON.stringify(payload));        
    }
    render() {
        return(
            

                    <form  >
                        <Row>
                            <TextInput type='text' 
                                className="input-box" id='name' 
                                placeholder="what's your name?" 
                                onChange={this.changeHandler}
                            />
                            <TextInput type='email' className="input-box" id='email' placeholder="email address" onChange={this.changeHandler} />
                        
                            <Textarea
                                l={10}
                                m={10}
                                s={12}
                                xl={12}
                                id="message" className="input-box" name="message" placeholder="send me a message" onChange={this.changeHandler} 
                            />
                        </Row>
                        <Button id="submitbutton" type="submit" value="submit" onClick={(e) => this.clickHandler(e)}>submit</Button>
                    </form>
        )
    }
}

export default ContactForm;