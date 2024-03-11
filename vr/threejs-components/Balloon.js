import * as THREE from 'three';

var geometry = new THREE.SphereBufferGeometry( 100, 32, 16 );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: scene.background } );

var mesh = new THREE.Mesh( geometry, material );
mesh.position.x = Math.random() * 10000 - 5000;
mesh.position.y = Math.random() * 10000 - 5000;
mesh.position.z = Math.random() * 10000 - 5000;
mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;

return mesh;