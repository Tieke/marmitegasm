var objects = [];

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.x = 0
camera.position.y = 300
camera.position.z = 1000

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2()

var renderer = new THREE.CanvasRenderer();
renderer.setClearColor( 0xf0f0f0);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera );

var geometry = new THREE.BoxGeometry( 10000, 10000, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0xffffff, opacity: 0} );
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

  event.preventDefault();

  mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( [wall] );

  if ( intersects.length > 0 ) {


  var geometry = new THREE.CylinderGeometry(100, 100, 247.49, 50, 50, false)
  var material = new THREE.MeshBasicMaterial( {color: 0xd3d3d3} );
  var marmite = new THREE.Mesh(geometry, material )
  var cylinderEdges = new THREE.EdgesHelper( marmite, 0xffffff);
  marmite.material.color.setHex( Math.random() * 0xffffff );
  marmite.position.copy(intersects[ 0 ].point )
  marmite.scale = .5
  scene.add( marmite, cylinderEdges );

  }



  // var intersects = raycaster.intersectObjects( objects );

  // if ( intersects.length > 0 ) {


  //   var particle = new THREE.Sprite( particleMaterial );
  //   particle.position.copy( intersects[ 0 ].point );
  //   particle.scale.x = particle.scale.y = 16;
  //   scene.add( particle );

  }

function render() {
  requestAnimationFrame( render );

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;

  renderer.render( scene, camera );
}
render();






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