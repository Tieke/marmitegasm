var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls( camera );

renderer.setClearColor( 0xffffff, 1);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( {color: 0xd3d3d3} );
  var cube = new THREE.Mesh( geometry, material );
  var cubeEdges = new THREE.EdgesHelper( cube, 0xffffff);
  scene.add( cube );
  scene.add( cubeEdges );

  camera.position.set(0,0,10);

function render() {
  requestAnimationFrame( render );

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;

  renderer.render( scene, camera );
}
render();