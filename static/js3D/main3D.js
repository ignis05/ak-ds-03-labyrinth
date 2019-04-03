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
    camera.position.set(0, 500, 0)
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
    var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D

    // wektory
    var clickedVect = new THREE.Vector3(0, 0, 0); // wektor określający PUNKT kliknięcia
    var directionVect = new THREE.Vector3(0, 0, 0); // wektor określający KIERUNEK ruchu playera

    // #region player movement

    function movePlayer() {
        // console.log(~~player.container.position.clone().distanceTo(clickedVect))
        if (~~player.container.position.clone().distanceTo(clickedVect) > 5) {
            player.container.translateOnAxis(directionVect, 2)
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

        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
            clickedVect = intersects[0].point
            directionVect = clickedVect.clone().sub(player.container.position).normalize()
            var angle = Math.atan2(
                player.container.position.clone().x - clickedVect.x,
                player.container.position.clone().z - clickedVect.z
            )
            player.mesh.rotation.y = Math.PI * 1.5 + angle
        }
    }

    $(document).mousedown(event => {
        movePlayerEnable(event)
        $(document).on("mousemove", event => {
            movePlayerEnable(event)
        })
        $(document).mouseup(event => {
            $(document).off("mousemove")
        })
    })

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

    var clock = new THREE.Clock();

    function render() {
        movePlayer()
        rotateCamera()

        player.model.updateModel(clock)

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    } render()
})