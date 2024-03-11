// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
//import * as THREE from 'three';
//import CubeModule from './threejs-components/CubeModule';

//const scene = new THREE.Scene();
//const cubeModule = new CubeModule();

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'balloons_vr', parent, {
    // Add custom options here
	  cursorVisibility: 'visible',
	  nativeModules: [ /*cubeModule*/ ],
	  //enableHotReload: true,
	  //scene: scene,
      ...options,
  });

	/*const cube = new THREE.Mesh(
		new THREE.SphereBufferGeometry( 1, 32, 16 ),
		new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: scene.background } )
	);
	cube.position.z = -4;
	scene.add(cube);
	cubeModule.init(cube);*/

  vr.render = function(timestamp) {
    // Any custom behavior you want to perform on each frame goes here
	  /*const seconds = timestamp / 1000;
	  cube.position.x = 0 + (1 * (Math.cos(seconds)));
	  cube.position.y = 0.2 + (1 * Math.abs(Math.sin(seconds)));*/
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
