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
const container = document.querySelector('#scene-container');
/* create scene */
const scene = new Scene();
scene.background = new Color('skyblue');

/*  Create a Camera */
const fov = 40;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 100;
const camera = new PerspectiveCamera(fov, aspect, near, far);
/* camera obj position */
camera.position.set(0, 0, 10);
/* geometry */
const geometry = new BoxBufferGeometry(2, 2, 2);
/* material */
const material = new MeshBasicMaterial();
/* mesh */
const mesh = new Mesh(geometry, material);
scene.add(mesh);
/* renderer */
const renderer = new WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
// render, or 'create a still image', of the scene
renderer.render(scene, camera);
