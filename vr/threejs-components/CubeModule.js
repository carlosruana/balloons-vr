import * as THREE from 'three';
import { Module } from 'react-vr-web';

export default class CubeModule extends Module {
	constructor() {
		super('CubeModule');
	}
	init(cube) {
		this.cube = cube;
	}
	changeCubeColor(color) {
		this.cube.material.color = new THREE.Color(color);
	}
}