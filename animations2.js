var clock = new THREE.Clock();
var origin = new THREE.Vector3(0,0,0);
var raycaster = new THREE.Raycaster();
var xCord=0.0, yCord=0.0;
var mouseDown = false;
var frameCount=0;
var fps = 60;
var mouse_ = new THREE.Vector2();
var keyCode = 0;
var rotateY = 0;
var move = 0;    
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 15;
var pos = new THREE.Vector3(0,0,0.5);

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light1 = new THREE.PointLight( 0xffffff, 4, 20 );
light1.position.set( -4, 8, 4);
var light2 = new THREE.PointLight( 0xffffff, 10, 15 );
light2.position.set( 4, 8, 4);
var light5 = new THREE.PointLight( 0xffffff, 4, 15 );
light5.position.set( 0, 0, 15);

light1.castShadow = true;
light2.castShadow = true;
// scene.add( light1 );
scene.add( light2 );
//Set up shadow properties for the light
light1.shadow.mapSize.width = 512;  // default
light1.shadow.mapSize.height = 512; // default
light1.shadow.camera.near = 0.5;       // default
light1.shadow.camera.far = 500      // default

scene.add( light5 );

var mouse, ray;
mouse = new THREE.Vector3( 0, 0, 0 );
ray = new THREE.Ray( camera.position );
var grid = [], plane;

var geometryDoDecaHedron = new THREE.TetrahedronGeometry(2, 2);
var materialDoDecaHedron = new THREE.MeshLambertMaterial( {color: 0x550000/*, emissive: 0xff0000, emissiveIntensity: 5*/ } );
var dodecaHedron = new THREE.Mesh( geometryDoDecaHedron, materialDoDecaHedron );

dodecaHedron.castShadow = true;
dodecaHedron.receiveShadow = false;
scene.add( dodecaHedron );

var geometry = new THREE.PlaneGeometry( 50, 50, 32, 32);
var material = new THREE.MeshPhongMaterial( {color: 0x555500, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
plane.rotateX (Math.PI/2);
plane.translateZ (4);
plane.receiveShadow = true;
scene.add( plane );

var plane2 = new THREE.Mesh( geometry, material );
plane2.rotateX (Math.PI/2);
plane2.translateZ (-4);
plane2.receiveShadow = true;
scene.add( plane2 );

var render = function () {
    requestAnimationFrame(render);
    updateStats();
    renderer.render(scene, camera);
}
var yCordinate = 0;
function updateStats( ) {
    raycaster.setFromCamera( mouse_, camera );	
    dodecaHedron.rotation.y += 0.05;
    yCordinate+=0.1;
    dodecaHedron.position.y = Math.sin(yCordinate);
    camera.rotateY(rotateY*0.01);
    light5.rotateY(rotateY*0.01);
    camera.translateOnAxis(camera.getWorldDirection(),move*0.04);
    light5.translateOnAxis(camera.getWorldDirection(),move*0.04);
}   
function onWindowResize() {
    camera.left = window.innerWidth / - 2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / - 2;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
render();