function init(){

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 5;
    camera.position.x = 5;
    camera.position.y = 5;

    camera.lookAt(new THREE.Vector3(0,0,0));

    var renderer = new THREE.WebGLRenderer();

    scene.fog = new THREE.FogExp2(0x000000, 0.1);

    var light = createPointLight(6);
    var light2 = createPointLight(6);
    var plane = createPlane(25);
    var point = createBox(.05,.05,.05);
    var point2 = createBox(.05,.05,.05);
    point.material.transparent = true; //so that we dont see light container
    point.material.opacity = 0;
    point2.material.transparent = true; //so that we dont see light container
    point2.material.opacity = 0;

    plane.position.z = -3;
    plane.position.x = -3;
    plane.position.y = -3;
    plane.rotation.x = Math.PI / 2;
    light.position.y = 1.5;
    light2.position.x = 1.5;
    point.position.y = -1;
    point2.position.y = -1;

    point.name = 'point0';
    point2.name = 'point2';

    scene.add(plane);
    scene.add(point);
    scene.add(point2);
    point2.add(light2);
    point.add(light);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(window.innerColor);
    document.getElementById('webgl').appendChild(renderer.domElement);
    update(renderer, scene, camera);
}

function update (renderer, scene, camera) {
    
    renderer.render(scene, camera);
    var point = scene.getObjectByName('point0');   
    point.rotation.x += 0.01;
    var point2 = scene.getObjectByName('point2');   
    point2.rotation.y += 0.03;


    requestAnimationFrame(function() { //recurisvley calls itself so things get rendered about 60 times a second
        update(renderer, scene, camera);
    });
}

function createPlane(size){
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshPhongMaterial({
        color: 0xa046e0, 
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh; 
}

function createPointLight(intensity){
    var light = new THREE.PointLight(0xbe81eb, intensity);
    return light; 
}

function createBox(w, h, d){
    var geometry = new THREE.BoxGeometry(w,h,d);
    var material = new THREE.MeshPhongMaterial({
        color: 0xf2fcb6
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );

    return mesh; 
}

init();