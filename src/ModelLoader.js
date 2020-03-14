import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class ModelLoader {
  constructor(scene) {
    this.scene = scene;
    this.loader = new GLTFLoader();
  }

  onLoad(gltfData, position) {
    const model = gltfData.scene.children[0];
    model.scale.set(0.5, 0.5, 0.5);
    model.position.copy(position);
    this.scene.add(model);
  }

  // called if the loader encounters and error
  onError(errorData) {
    console.error(errorData);
  }

  load(modal, position) {
    this.loader.load(
      modal,
      (gltfData) => this.onLoad(gltfData, position),
      null,
      this.onError,
    );
  }
}
export { ModelLoader };
