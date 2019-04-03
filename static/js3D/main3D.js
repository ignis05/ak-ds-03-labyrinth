var scene;
var render;
$(document).ready(async function () {

    // #region initial
    $(window).on("resize", () => {
        camera.aspect = $(window).width() / $(window).height()
        camera.updateProjectionMatrix()
        renderer.setSize($(window).width(), $(window).height())
    })

    scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
        45,    // kąt patrzenia kamery (FOV - field of view)
        $(window).width() / $(window).height(),   // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1,    // minimalna renderowana odległość
        10000    // maxymalna renderowana odległość od kamery 
    );
    // camera.position.set(300, 100, 300)
    camera.position.set(0, 600, 0)
    camera.lookAt(scene.position)

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xffffff);
    renderer.setSize($(window).width(), $(window).height());
    //shadows
    //renderer.shadowMap.enabled = true
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    $("#root").append(renderer.domElement);
    // #endregion initial

    let grid = new Grid(2500)
    grid.addTo(scene)

    // var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    // orbitControl.addEventListener('change', function () {
    //     renderer.render(scene, camera)
    // });

    let uiFunctions = ["lights"]
    var ui = new UI(uiFunctions)

    var net = new Net()
    var map = await net.loadlevel()
    var level = new Level(ui, map)


    // player
    var player = new Player()
    await player.loadModel(Settings.playerGeometryURL, Settings.playerMaterialURL)
    player.model.setAnimation("stand")
    player.addTo(scene)
    player.container.position.x = level.hexagons[0].position.x
    player.container.position.z = level.hexagons[0].position.z


    // raycaster
    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2()
    $(root).mousedown(event => {
        movePlayerEnable(event)
        activateAlly(event)
        $(document).on("mousemove", event => {
            movePlayerEnable(event)
        })
        $(document).mouseup(event => {
            $(document).off("mousemove")
        })
    })

    $(root).mousemove(event => {
        highlightAlly(event)
    })

    // wektory
    var clickedVect = new THREE.Vector3(0, 0, 0); // wektor określający PUNKT kliknięcia
    var directionVect = new THREE.Vector3(0, 0, 0); // wektor określający KIERUNEK ruchu playera

    // #region player movement

    function movePlayer() {
        // console.log(~~player.container.position.clone().distanceTo(clickedVect))
        if (~~player.container.position.clone().distanceTo(clickedVect) > 5) {
            player.container.translateOnAxis(directionVect, 4)
            player.container.position.y = 0

            camera.position.x = player.container.position.x + (200 * Math.sin(camAngle))
            camera.position.z = player.container.position.z + (200 * Math.cos(camAngle))
            camera.lookAt(player.container.position)
        }
        else { //on arrive
            player.model.setAnimation("stand")
        }
    }


    function movePlayerEnable(event) {
        player.model.setAnimation("run")
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0 && intersects[0].object.name == "floor") {
            clickedVect = intersects[0].point
            directionVect = clickedVect.clone().sub(player.container.position).normalize()
            var angle = Math.atan2(
                player.container.position.clone().x - clickedVect.x,
                player.container.position.clone().z - clickedVect.z
            )
            player.mesh.rotation.y = Math.PI * 1.5 + angle
        }
    }
    // #endregion player movement

    // #region camera movement
    var camLeft = false
    var camRight = false
    var camAngle = 0

    document.addEventListener("keydown", e => {
        switch (e.code) {
            case "KeyA": case "ArrowLeft":
                camLeft = true
                break
            case "KeyD": case "ArrowRight":
                camRight = true
                break
        }
    })
    document.addEventListener("keyup", e => {
        switch (e.code) {
            case "KeyA": case "ArrowLeft":
                camLeft = false
                break
            case "KeyD": case "ArrowRight":
                camRight = false
                break
        }
    })
    function rotateCamera() {
        if (camLeft) {
            camAngle -= 0.05
        }
        if (camRight) {
            camAngle += 0.05
        }
        camera.position.x = player.container.position.x + (200 * Math.sin(camAngle))
        camera.position.z = player.container.position.z + (200 * Math.cos(camAngle))
        camera.lookAt(player.container.position)
    }
    // #endregion camera movement

    // #region allies
    var allies = []
    for (let hexagon of level.hexagons) { // ally spawns
        if (Math.round(Math.random())) {
            let ally = new Ally();
            await ally.loadModel(Settings.allyGeometryURL, Settings.allyMaterialURL)
            ally.addTo(scene)
            let x = hexagon.position.x
            let z = hexagon.position.z
            ally.container.position.set(x, 0, z)
            ally.model.setAnimation("stand")
            allies.push(ally)
        }
    }

    function activateAlly(event) {
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(scene.children, true);
        // console.log(intersects);

        if (intersects.length > 0) {
            if (intersects[0].object.name == "ally") {
                console.log("clicked ally");
                let ally = allies.find(ally => ally.mesh.uuid == intersects[0].object.uuid)
                console.log(ally);
                if (true) { // placeholder for range check
                    ally.follow = true
                    player.allies.push(ally)
                }
            }
        }
    }

    function moveAllies() {
        player.allies.forEach((ally, iterator) => {
            ally.vector = player.container.position
            ally.directionVect = ally.vector.clone().sub(ally.container.position).normalize()
            let angle = Math.atan2(
                ally.container.position.clone().x - ally.vector.x,
                ally.container.position.clone().z - ally.vector.z
            )
            ally.mesh.rotation.y = Math.PI * 1.5 + angle
            if (~~ally.container.position.clone().distanceTo(ally.vector) > (50 * (iterator + 1))) {
                ally.container.translateOnAxis(ally.directionVect, 3.5)
                ally.container.position.y = 0
                ally.model.setAnimation("run")
            }
            else {
                ally.model.setAnimation("stand")
            }
        })
    }

    function highlightAlly(event) {
        allies.forEach(ally=>{
            ally.ring.visible = false
        })
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(scene.children, true);
        // console.log(intersects);

        if (intersects.length > 0) {
            if (intersects[0].object.name == "ally") {
                let ally = allies.find(ally => ally.mesh.uuid == intersects[0].object.uuid)
                if (player.allies.indexOf(ally) == -1) { // if not following
                    ally.ring.visible = true
                }
            }
        }
    }
    // #endregion

    function render() {
        movePlayer()
        rotateCamera()
        player.model.updateModel()

        moveAllies()
        allies.forEach(ally => {
            ally.model.updateModel()
        })

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    } render()
})