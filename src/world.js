import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshStandardMaterial,
  DirectionalLight,
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
    this.createLights();
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

  createLights() {
    const light = new DirectionalLight('white', 15); /* color, and intensity */
    light.position.set(0, 20, 20); /* position */
    this.scene.add(light);
  }

  createMeshes() {
    const spec = {
      color: 'purple',
    };
    /* geometry */
    const geometry = new BoxBufferGeometry(2, 2, 2);
    /* material */
    const material = new MeshStandardMaterial(spec);
    /* mesh */
    const mesh = new Mesh(geometry, material);
    /* rotation */
    mesh.rotation.set(0.5, -0.5, 0.5);
    this.scene.add(mesh);
  }

  createRenderer() {
    this.renderer = new WebGLRenderer();
    this.renderer.physicallyCorrectLights = true; /* PBG */
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
