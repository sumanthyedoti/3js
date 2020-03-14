import {
  BoxBufferGeometry,
  Color,
  Mesh,
  Clock,
  HemisphereLight,
  PointLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {ModelLoader} from './ModelLoader';
const textureImage = require('../assets/textures/uv-test-bw.png');
const parrotModel = require('../assets/models/Parrot.glb');
const flamingoModel = require('../assets/models/Flamingo.glb');
const storkModel = require('../assets/models/Stork.glb');

class World {
  constructor(container) {
    this.container = container;

    this.clock = new Clock();
    /* call functionality */
    this.createScene();
    this.createCamera();
    this.createCameraControls();
    this.createLights();
    this.loadModels();
    this.createRenderer();
    this.handleResize();
  }

  createScene() {
    this.scene = new Scene();
    this.scene.background = new Color('skyblue');
  }

  createCamera() {
    const fov = 40;
    const aspect = this.container.clientWidth / this.container.clientHeight;
    const near = 0.1;
    const far = 400;
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    /* camera obj position */
    this.camera.position.set(-120, 80, 100);
  }

  createCameraControls() {
    this.controls = new OrbitControls(this.camera, this.container);
    this.controls.enablePan = false;
    this.controls.enableZoom = true;
    // this.controls.autoRotate = true;
    /* orgit around the point */
    this.controls.target.set(1, 1, 1);
    this.controls.enableDamping = true;
    setInterval(() => {
      this.controls.saveState();
      this.controls.reset();
    }, 4000);
  }

  createLights() {
    const ambientLight = new HemisphereLight(
      'white', // bright sky color
      '#444', // dim ground color
      4, // intensity
    );
    const mainLight = new PointLight('white', 15);
    mainLight.position.set(10, 10, 10);

    this.scene.add(ambientLight, mainLight);
  }

  loadModels() {
    const parrotPosition = new Vector3(0, 0, 40);
    const flamingoPosition = new Vector3(40, -10, -50);
    const storkPosition = new Vector3(-40, -25, -50);
    const modelLoader = new ModelLoader(this.scene);
    modelLoader.load(parrotModel, parrotPosition);
    modelLoader.load(flamingoModel, flamingoPosition);
    modelLoader.load(storkModel, storkPosition);
  }

  createRenderer() {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.physicallyCorrectLights = true; /* PBG */
    // this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    // add the automatically created <canvas> element to the page
    this.container.append(this.renderer.domElement);
  }

  handleResize() {
    const onResize = () => {
      // set the aspect ratio to match the new browser window aspect ratio
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;

      // update the camera's frustum
      this.camera.updateProjectionMatrix();

      // update the size of the renderer AND the canvas
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight,
      );

      this.renderer.setPixelRatio(window.devicePixelRatio);

      // this.renderer.render(this.scene, this.camera); /* not needed with animation loop */
    };

    onResize();
    window.addEventListener('resize', onResize);
  }


  start() {
    this.renderer.setAnimationLoop(() => {
      // Everything inside here will run once per frame
      // update any animations
      this.update();
      // render a new frame
      this.render();
    });
  }

  update() {
    const delta = this.clock.getDelta();
    for (const child of this.scene.children) {
      if (child.userData.update) child.userData.update(delta);
    }
    // this.mesh.rotation.x -= delta / 4;
    // this.mesh.rotation.y += delta / 20;
    // this.mesh.rotation.z += delta / 4;
    this.controls.update();
  }

  render() {
    // render, or 'create a still image', of the scene
    this.renderer.render(this.scene, this.camera);
  }
}

export { World };
