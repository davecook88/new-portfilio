import React, { Component } from "react";
import * as THREE from "three";
export default class TestThree extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    console.log(this.mount);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 250, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth / 5, window.innerHeight /7 );
    // document.body.appendChild( renderer.domElement );
    this.mount.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry( 5, 5, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe:true } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
      <div ref={ref => this.mount = ref}/>
    )
  }
}