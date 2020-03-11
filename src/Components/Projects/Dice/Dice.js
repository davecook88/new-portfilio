import * as THREE from 'three';

export default class Dice {
    constructor(type, context, {color = 0xb50004, size = 250} = {}) {
        this.size = size;
        this.color = color;
        this.type = type;
        this.spin = true;
        this.slowDown = false;
        this.showAnswer = false;
        this.axes = {
            x: Math.random() * 10,
            y: Math.random() * 10,
            z: Math.random() * 10
        };
        this.spinSpeed = ((Math.random() * 5) + 2 ) / 100;              
        this.element = this.createDice();
        // Parent scene instance as context
        this.context = context;
    }
    
    finalStates = {
        4: {
            x:0.9,
            y:-0.8,
            z:-0.2
        },
        6: {
            x:0,
            y:0,
            z:0
        },
        8: {
            x:0.5,
            y:0.8,
            z:0
        },
        10: {
            x:-0.6,
            y:-1.9,
            z:0
        },
        12: {
            x:1,
            y:0.7,
            z:0.3
        },
        20: {
            x:0.18,
            y:-0.12,
            z:-0.085
        },
        100: {
          x:-0.6,
          y:-1.9,
          z:0
        }
    }
    createGeometry = () => {       
        const type = this.type;
        switch(type){
            case 4: 
                return new THREE.TetrahedronGeometry(this.size);
            case 6: 
                return new THREE.BoxGeometry(this.size, this.size, this.size, 10, 10, 10);
            case 8: 
                return new THREE.OctahedronGeometry(this.size);
            case 10: 
                return this.createD10();
            case 12: 
                return new THREE.DodecahedronGeometry(this.size);
            case 20: 
                return new THREE.IcosahedronGeometry(this.size);
            case 100: 
                return this.createD10();
            default:
                return THREE.TetrahedronGeometry(100);
        }

    }

    createDice(){
        const material = new THREE.MeshPhongMaterial({
            color: this.color,
            wireframe: false,
            opacity: 0.8,
            side: THREE.DoubleSide,
            vertexColors:THREE.FaceColors,
            flatShading: true,
        });    
        const geometry = this.createGeometry();
        const dice = new THREE.Mesh(geometry, material);

        return dice;
    }

    updateElementRotation() {
        for (let a in this.axes){
            this.element.rotation[a] = this.axes[a];
        }
    }

    spinAllAxes() {
      for (let a in this.axes){
        let axis = this.axes[a];
        this.axes[a] = axis - this.spinSpeed;
        if (this.axes[a] < 0 || this.axes[a] > 100) this.spinSpeed = -this.spinSpeed;
      }
      this.updateElementRotation();
    }

    reduceRotationAllAxes() {
        console.log(this);
      let stopSpinning = true;
        for (let a in this.axes){
            let axis = this.axes[a];
            const finalState = this.finalStates[this.type][a];
            let difference = (axis - finalState) / 75;
            if (difference < 0.005) difference = 0.005
            if (axis - difference > finalState) {
                this.axes[a] = axis - difference;
            } else {
                this.axes[a] = finalState;
            }
            if (this.axes[a] != finalState) stopSpinning = false;
        }
        this.updateElementRotation();
        this.spin = !stopSpinning;

        if (stopSpinning) {
          this.showAnswer = true;
          this.context.updateSpinningStatusInApplication();
        }
    }

    startSpinning(slowDown) {
      this.spin = true;
      this.slowDown = slowDown;
      this.showAnswer = false;
      this.axes = {
            x: Math.random() * 10,
            y: Math.random() * 10,
            z: Math.random() * 10
      };
      if(this.type === 100) this.context.d10.dice.startSpinning(slowDown);
    }


    createD10() {
        let vertices = [];
        
        vertices.push(...[0, 0, -1]);
        for (let i = 0, b = 0; i < 10; ++i, b += Math.PI * 2 / 10) {
            vertices.push(...[Math.cos(b), Math.sin(b), 0.105 * (i % 2 ? 1 : -1)]);
        }      
        vertices.push(...[0, 0, 1]);        

        const faces = [
            1,2,11, 2,3,11, 3,4,11, 4,5,11, 5,6,11, 6,7,11, 7,8,11, 8,9,11, 9,10,11, 10,1,11, 
            1,2,0, 2,3,0, 3,4,0, 4,5,0, 5,6,0, 6,7,0, 7,8,0, 8,9,0, 9,10,0, 10,1,0
            ];
        return new THREE.PolyhedronGeometry(vertices, faces, this.size, 0);
    }          
}

