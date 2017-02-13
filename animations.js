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
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light1 = new THREE.PointLight( 0xffffff, 4, 20 );
light1.position.set( 0, 4,  0);
scene.add( light1 );
var light2 = new THREE.PointLight( 0xffffff, 4, 10 );
light2.position.set( 0, -4,  0);
scene.add( light2 );
var light3 = new THREE.PointLight( 0xffffff, 4, 10 );
light3.position.set( -2, 0,  0);
//scene.add( light3 );
var light4 = new THREE.PointLight( 0xffffff, 4, 10 );
light4.position.set( 0, 0,  -15);
scene.add( light4 );
var light5 = new THREE.PointLight( 0xffffff, 4, 20 );
light5.position.set( 0, 0, 15);
scene.add( light5 );

var mouse, ray;
mouse = new THREE.Vector3( 0, 0, 0 );
ray = new THREE.Ray( camera.position );
var grid = [], plane;

var box0, box1, box2;
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material0 = new THREE.MeshPhongMaterial( { color: 0x551a8b } );
var material1 = new THREE.MeshPhongMaterial( { color: 0x551a8b } );
var material2 = new THREE.MeshPhongMaterial( { color: 0x551a8b } );
var cube0 = new THREE.Mesh( geometry, material0 );
cube0.position.set(-4,0,0);
scene.add( cube0 );
var cube1 = new THREE.Mesh( geometry, material1 );
cube1.position.set(0,0,0);
scene.add( cube1 );
var cube2 = new THREE.Mesh( geometry, material2 );
cube2.position.set(4,0,0);
scene.add( cube2 );
var geometryDoDecaHedron = new THREE.TetrahedronGeometry(2, 2);
var materialDoDecaHedron = new THREE.MeshStandardMaterial( {color: 0x550000/*, emissive: 0xff0000, emissiveIntensity: 5*/ } );
var dodecaHedron = new THREE.Mesh( geometryDoDecaHedron, materialDoDecaHedron );
scene.add( dodecaHedron );

var render = function () {
    requestAnimationFrame(render);
    updateStats();
    renderer.render(scene, camera);
}

function updateStats( ) {
    raycaster.setFromCamera( mouse_, camera );	
    dodecaHedron.rotation.y += 0.05;
    // calculate objects intersecting the picking ray
    var intersectss = raycaster.intersectObjects( scene.children );
    xCord = intersectss.length;
    for ( var j = 0; j < scene.children.length; j++ ) {
        if(scene.children[j] instanceof THREE.Mesh) {
        scene.children[ j ].material.setValues({color: 0x222222}) ;    
        }
    }
    for ( var i = 0; i < intersectss.length; i++ ) {
        frameCount++;
        intersectss[ i ].object.rotation.y += 0.09;
        intersectss[ i ].object.material.setValues({color: 0x220000}) ;    
        //intersectss[ i ].object.rotation.z -= 0.07;
        if(mouseDown) {
            intersectss[ i ].object.position.y = 0.0;
        }
        blopAudio.play();
    }
    camera.rotateY(rotateY*0.01);
    camera.translateOnAxis(camera.getWorldDirection(),move*0.04);
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