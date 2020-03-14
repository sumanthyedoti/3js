import { AnimationMixer, Clock } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
class ModelLoader {
  constructor(scene) {
    this.scene = scene;
    this.clock = new Clock();
    this.loader = new GLTFLoader();
  }

  onLoad(gltfData, position) {
    const model = gltfData.scene.children[0];
    const clip = gltfData.animations[0];
    model.scale.set(0.5, 0.5, 0.5);
    model.position.copy(position);
    this.setupAnimation(model, clip);
    this.scene.add(model);
  }

  setupAnimation(model, clip) {
    const mixer = new AnimationMixer(model);
    const action = mixer.clipAction(clip);
    action.play();
    model.userData.update = delta => mixer.update(delta);
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
