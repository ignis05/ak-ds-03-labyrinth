var scene;
var render;
$(document).ready(function () {

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
    camera.position.set(300, 100, 300)
    camera.lookAt(scene.position)

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize($(window).width(), $(window).height());

    $("#root").append(renderer.domElement);
    // #endregion initial

    new Grid(2500)

    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
        renderer.render(scene, camera)
    });

    new Level()

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    } render()
})