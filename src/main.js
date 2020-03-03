import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { World } from './world';

function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // create a new three.js scene
  const world = new World(container);
  world.start();
}
main();
