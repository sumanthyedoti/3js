import {
  BoxBufferGeometry,
  Color,
  Mesh,
  Clock,
  MeshStandardMaterial,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

class World {
  constructor(container) {
    this.container = container;

    this.clock = new Clock();
    /* call functionality */
    this.createScene();
    this.createCamera();
    this.createLights();
    this.createMeshes();
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
    this.mesh = new Mesh(geometry, material);
    this.scene.add(this.mesh);
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

    this.mesh.rotation.z += delta / 2;
    this.mesh.rotation.x += delta / 2;
    this.mesh.rotation.y += delta / 2;
  }

  render() {
    // render, or 'create a still image', of the scene
    this.renderer.render(this.scene, this.camera);
  }
}

export { World };
