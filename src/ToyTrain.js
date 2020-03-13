import {
  CylinderBufferGeometry,
  BoxBufferGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
} from 'three';

class ToyTrain {
  constructor() {
    this.group = new Group();

    this.createGeometries();
    this.createMaterials();
    this.createMeshes();
    return this.group; /* when we create a meshGroup instance, we will get back a Group which we can add directly to our scene */
  }

  createGeometries() {
    const cabin = new BoxBufferGeometry(2, 2.25, 1.5);

    const nose = new CylinderBufferGeometry(0.75, 0.75, 3, 10);

    const windows = new CylinderBufferGeometry(0.3, 0.3, 1.6, 4);

    // we can reuse a single cylinder geometry for all 4 wheels
    const wheel = new CylinderBufferGeometry(0.4, 0.4, 1.75, 16);

    // different values for the top and bottom radius creates a cone shape
    const chimney = new CylinderBufferGeometry(0.3, 0.1, 0.5);

    this.geometries = {
      cabin,
      nose,
      windows,
      wheel,
      chimney,
    };
  }

  createMaterials() {
    const body = new MeshStandardMaterial({
      color: 'firebrick',
      flatShading: true,
    });

    const detail = new MeshStandardMaterial({
      color: 'darkslategray',
      flatShading: true,
    });

    this.materials = {
      body,
      detail,
    };
  }

  createMeshes() {
    const cabin = new Mesh(this.geometries.cabin, this.materials.body);
    cabin.position.set(1.5, 0.4, 0);

    const chimney = new Mesh(this.geometries.chimney, this.materials.detail);
    chimney.position.set(-2, 0.9, 0);

    const nose = new Mesh(this.geometries.nose, this.materials.body);
    nose.position.x = -1;
    nose.rotation.z = Math.PI / 2;

    const windows = new Mesh(this.geometries.windows, this.materials.detail);
    windows.position.x = 1.4;
    windows.position.y = 1.1;
    windows.rotation.x = Math.PI / 2;
    windows.rotation.y = Math.PI / 4;

    const smallWheelRear = new Mesh(this.geometries.wheel, this.materials.detail);
    smallWheelRear.position.y = -0.5;
    smallWheelRear.rotation.x = Math.PI / 2;
    const smallWheelCenter = smallWheelRear.clone();
    smallWheelCenter.position.x = -1;
    const smallWheelFront = smallWheelRear.clone();
    smallWheelFront.position.x = -2;

    const bigWheel = smallWheelRear.clone();
    bigWheel.position.set(1.5, -0.1, 0);
    bigWheel.scale.set(2, 1.25, 2);

    this.group.add(
      nose,
      cabin,
      windows,
      chimney,
      smallWheelRear,
      smallWheelCenter,
      smallWheelFront,
      bigWheel,
    );
  }
}

export { ToyTrain };
