import React, { Component } from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import './navbar.css';

const Button = (props) => {
    return (<div className="laptop-key">{props.character}</div>)
}

export default class NavbarFull extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         characters:'qwertyuiopasdfghjklzxcvbnm'
    //     }
    // }
    
    render() {
        return (
            <Navbar
                alignLinks="right"
                brand={<a className="brand-logo" href="/">DaveCook</a>}
                className="transparent"
                menuIcon={<Icon>DaveCook</Icon>}
                options={{
                    draggable: true,
                    edge: 'left',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 200,
                    preventScrolling: true
                }}
                >
                <NavItem href="">
                    Getting started
                </NavItem>
                <NavItem href="components.html">
                    Components
                </NavItem>
                </Navbar>
        )
    }
}
