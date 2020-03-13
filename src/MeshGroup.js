import {
  SphereBufferGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
} from 'three';

class MeshGroup {
  constructor() {
    this.group = new Group();

    this.createGeometries();
    this.createMaterials();
    this.createMeshes();
    return this.group; /* when we create a meshGroup instance, we will get back a Group which we can add directly to our scene */
  }

  createGeometries() {
    const sphere = new SphereBufferGeometry(0.25, 8, 8);
    this.geometries = {
      sphere,
    };
  }

  createMaterials() {
    const main = new MeshStandardMaterial({
      color: 'indigo',
      flatShading: true,
    });

    this.materials = {
      main,
    };
  }

  createMeshes() {
    const protoSphere = new Mesh(
      this.geometries.sphere,
      this.materials.main,
    );
    this.group.add(protoSphere);

    for (let i = 0; i < 1; i += 0.05) { /*  i between zero and one for use in the trigonometric function */
      const sphere = protoSphere.clone();
      sphere.position.x = -i * 5;
      sphere.position.y = Math.cos(2 * Math.PI * i);
      sphere.position.z = Math.sin(2 * Math.PI * i);
      sphere.scale.multiplyScalar(0.01 + i);
      this.group.add(sphere);
    }
  }
}

export { MeshGroup };
