
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.x = 0
camera.position.y = 0
camera.position.z = 1750

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2()

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xf0f0f0);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera );

var geometry = new THREE.SphereGeometry( 2500, 80, 80 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, opacity: 0, shading: THREE.FlatShading, side: THREE.DoubleSide} );
// var geometry = new THREE.PlaneGeometry( 10000, 6000, 4, 4 );
// var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, opacity: 0} );
var wall = new THREE.Mesh(geometry, material )
scene.add( wall )

rotationParamsArray = []

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

  event.preventDefault();

  mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( [wall] );

  if ( intersects.length > 0 ) {

  var map = THREE.ImageUtils.loadTexture('../images/marmitegasm_label2.jpg');
  var geometry = new THREE.CylinderGeometry(75, 75, 150, 70, 5, false)
  var material = new THREE.MeshBasicMaterial( {map: map} );
  var marmite = new THREE.Mesh(geometry, material )
  var cylinderEdges = new THREE.EdgesHelper( marmite, 0xffffff);
  // marmite.material.color.setHex( Math.random() * 0xffffff );
  marmite.position.copy(intersects[ 0 ].point )
  marmite.position.z += getRandomNumber(100, 1200)

  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set( 1, 1 );


  marmites.push( marmite )

  rotationParamsArray.push([
    getRandomNumber(0.005, 0.0001),
    getRandomNumber(0.005, 0.0001),
    getRandomNumber(0.005, 0.0001)
    ])

  scene.add( marmite );

  }
}

var marmites = []

function render() {
  requestAnimationFrame( render );

  for ( var i = 0; i < marmites.length; i++){
    // console.log(marmites[i])
    marmites[i].rotation.x = Date.now() * rotationParamsArray[i][0];
    marmites[i].rotation.y = Date.now() * rotationParamsArray[i][1];
    marmites[i].rotation.z = Date.now() * rotationParamsArray[i][2];
  }



  renderer.render( scene, camera );
}
render();

function getRandomNumber(min, max) {
   return Math.random() * (max - min) + min;
}





// $(document).on("click", function(e) {
//   var xpos = e.pageX
//   var ypos = e.pageY
//   var geometry = new THREE.BoxGeometry( 50, 50, 50 );
//   var material = new THREE.MeshBasicMaterial( {color: 0xd3d3d3} );
//   var cube = new THREE.Mesh( geometry, material );
//   var cubeEdges = new THREE.EdgesHelper( cube, 0xffffff);
//   scene.add( cube, cubeEdges );
//   cube.position.x = xpos
//   cube.position.y = ypos
//   // console.log(cube)
//   console.log(e)
//   // console.log("x: ", xpos, "y: ", ypos)
//   // console.log(newCube(xpos, ypos))
// });

// var newCube = function(xpos, ypos) {
//   var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//   var material = new THREE.MeshBasicMaterial( {color: 0xd3d3d3} );
//   var cube = new THREE.Mesh( geometry, material );
//   var cubeEdges = new THREE.EdgesHelper( cube, 0xffffff);
//   scene.add( cube, cubeEdges );
//   cube.position.x = xpos
//   cube.position.y = ypos
// }
