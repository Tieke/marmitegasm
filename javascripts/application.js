var container, stats;
var camera, scene, renderer;
// var particleMaterial;

var raycaster;
var mouse;

var objects = [];

init();
animate();

function init(
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set(0,300,500);

  var geometry = new THREE.CylinderGeometry(100, 100, 247.49, 50, 50, false)

  var material = new THREE.MeshBasicMaterial( {color: 0xd3d3d3} );
  var marmite = new THREE.Mesh(geometry, material )
  )

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2()

var renderer = new THREE.CanvasRenderer();
renderer.setClearColor( 0xf0f0f0);
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera );

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

// var newCube = function(xpos, ypos) {
//   var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//   var material = new THREE.MeshBasicMaterial( {color: 0xd3d3d3} );
//   var cube = new THREE.Mesh( geometry, material );
//   var cubeEdges = new THREE.EdgesHelper( cube, 0xffffff);
//   scene.add( cube, cubeEdges );
//   cube.position.x = xpos
//   cube.position.y = ypos
// }

function onDocumentMouseDown( event ) {

  event.preventDefault();

  mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( objects );

  if ( intersects.length > 0 ) {

    intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );

    var particle = new THREE.Sprite( particleMaterial );
    particle.position.copy( intersects[ 0 ].point );
    particle.scale.x = particle.scale.y = 16;
    scene.add( particle );

  }

$(document).on("click", function(e) {
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




function render() {
  requestAnimationFrame( render );

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;

  renderer.render( scene, camera );
}
render();