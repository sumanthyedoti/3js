import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

class World {
  constructor(container) {
    this.container = container;
    /* call functionality */
    this.createScene();
    this.createCamera();
    this.createMeshes();
    this.createRenderer();
  }

  createScene() {
    this.scene = new Scene();
    this.scene.background = new Color('skyblue');
  }

  createCamera() {
    const fov = 40;
    const aspect = this.container.clientWidth / this.container.clientHeight;
    const near = 0.1;
    const far = 100;
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    /* camera obj position */
    this.camera.position.set(0, 0, 10);
  }

  createMeshes() {
    /* geometry */
    const geometry = new BoxBufferGeometry(2, 2, 2);
    /* material */
    const material = new MeshBasicMaterial();
    /* mesh */
    const mesh = new Mesh(geometry, material);
    this.scene.add(mesh);
  }

  createRenderer() {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // add the automatically created <canvas> element to the page
    this.container.append(this.renderer.domElement);
  }

  start() {
    this.renderer.render(this.scene, this.camera);
  }
}

export { World };
