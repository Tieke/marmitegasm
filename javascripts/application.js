var rotationParamsArray = []
var revolutionParamsArray = []

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1750

var controls = new THREE.OrbitControls( camera );
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2()

// --------------------------- navbar ---------------------------

var container = document.createElement( 'div' );
document.body.appendChild( container );

var openNav = document.createElement( 'div' );
openNav.class = 'open_nav'
openNav.innerHTML = '<a class="open_nav">team marmite</a>';
container.appendChild( openNav );

var navjar = document.createElement('nav');
navjar.style.textAlign = 'center';
navjar.innerHTML = '<p><a href="https://github.com/SkwynethPaltrow" target="_blank">will</a></p><p><a href="https://github.com/hoanganhdinhtrinh" target="_blank">hoang</a></p><p><a href="https://github.com/kylesnowschwartz" target="_blank">kyle</a></p><p><a href="https://github.com/teaiheb" target="_blank">te aihe</a></p> <p class="close_nav">(close)</p>';
document.body.appendChild( navjar )

// ---------------------------------------------------------------

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xf0f0f0);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );


var geometry = new THREE.SphereGeometry( 2500, 80, 80 );
var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true} );
var wall = new THREE.Mesh(geometry, material )
scene.add( wall )

document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
window.addEventListener( 'resize', onWindowResize, false );



function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentTouchStart( event ) {

  event.preventDefault();

  event.clientX = event.touches[0].clientX;
  event.clientY = event.touches[0].clientY;
  onDocumentMouseDown( event );

}

function onDocumentMouseDown( event ) {

  // event.preventDefault();

  mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( [wall] );

  if ( intersects.length > 0 ) {

  var labelmap = THREE.ImageUtils.loadTexture('../images/marmitegasm_label2.jpg');
  var topmap = THREE.ImageUtils.loadTexture('../images/cap_red.jpg');
  var bottommap = THREE.ImageUtils.loadTexture('../images/bottom.jpg');

  var materials = [
  new THREE.MeshBasicMaterial(
      {
        map: labelmap
      }),
  new THREE.MeshBasicMaterial(
      {
        map: bottommap
      }),
  new THREE.MeshBasicMaterial(
      {
        map: topmap
      })
  ]

  var geometry = new THREE.CylinderGeometry(75, 75, 150, 70, 5, false)
  // var material = new THREE.MeshBasicMaterial( {map: map} );

  var marmite = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ) )
  var cylinderEdges = new THREE.EdgesHelper( marmite, 0xffffff);

  var caps = marmite.geometry.faces.slice(-140)
  var bottomcaps = caps.slice(-70)
  var topcaps = caps.slice(0,70)
  $.each(topcaps, function(index, value) { value.materialIndex = 2;})
  $.each(bottomcaps, function(index, value) { value.materialIndex = 1;})

  material.vertexColors = THREE.FaceColors;

  marmite.position.copy(intersects[ 0 ].point )
  marmite.position.z += getRandomNumber(100, 1200)

  // map.wrapS = map.wrapT = THREE.RepeatWrapping;
  // map.repeat.set( 1, 1 );

  marmites.push( marmite )

  rotationParamsArray.push([
    getRandomNumber(0.005, 0.0001),
    getRandomNumber(0.005, 0.0001),
    getRandomNumber(0.005, 0.0001)
    ])

  revolutionParamsArray.push([
    [getRandomNumber(0.00009, 0.0003), getRandomNumber(500, 1000)],
    [getRandomNumber(0.00009, 0.0003), getRandomNumber(500, 1000)],
    [getRandomNumber(0.00009, 0.0003), getRandomNumber(500, 1000)]
    ])

  scene.add( marmite );

  }
}

var marmites = []

function render() {
  requestAnimationFrame( render );

  for ( var i = 0; i < marmites.length; i++){
    marmites[i].rotation.x = Date.now() * rotationParamsArray[i][0];
    marmites[i].rotation.y = Date.now() * rotationParamsArray[i][1];
    marmites[i].rotation.z = Date.now() * rotationParamsArray[i][2];

    marmites[i].position.x = Math.sin( Date.now() * revolutionParamsArray[i][0][0] ) * revolutionParamsArray[i][0][1];
    marmites[i].position.y = Math.sin( Date.now() * revolutionParamsArray[i][1][0] ) * revolutionParamsArray[i][1][1];
    marmites[i].position.z = Math.sin( Date.now() * revolutionParamsArray[i][2][0] ) * revolutionParamsArray[i][2][1];
  }


  renderer.render( scene, camera );
}
render();

function getRandomNumber(min, max) {
   return Math.random() * (max - min) + min;
}


