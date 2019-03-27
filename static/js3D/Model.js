class Model {
    constructor() {
        this.container = new THREE.Object3D()
        this.mixer = null
    }

    loadModel(urlModel, urlMaterial) {
        return new Promise(resolve => {
            var modelMaterial = new THREE.MeshBasicMaterial(
                {
                    map: new THREE.TextureLoader().load(urlMaterial),
                    //color: 0xff0000,
                    morphTargets: true // ta własność odpowiada za animację materiału modelu
                });

            var loader = new THREE.JSONLoader();
            loader.load(urlModel, geometry => {
                var model = new THREE.Mesh(geometry, modelMaterial) //meshModel
                model.name = "skeleton";
                var box = new THREE.Box3().setFromObject(model);
                //console.log(box.getSize(new THREE.Vector3()).y);
                //model.rotation.y = 0; // ustaw obrót modelu
                model.scale.set(1, 1, 1); // ustaw skalę modelu
                model.position.y = box.getSize(new THREE.Vector3()).y / 2; // ustaw pozycje modelu
                scene.add(model);

                this.mixer = new THREE.AnimationMixer(model)

                //dodanie modelu do kontenera
                this.container.add(model)

                // zwrócenie kontenera
                resolve(this.container);
            })
        })
    };


    // update mixera

    updateModel() {
        if (this.mixer) this.mixer.update(delta)
    }

    //animowanie postaci

    setAnimation() {
        this.mixer.clipAction("run").play();
    }

}