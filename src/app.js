// Imports
import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';

// Configuracion basica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000,
);
const renderer = new THREE.WebGLRenderer({antialias: true});
let loader = new GLTFLoader();

let car;
let hlight;
let directionalLight;



//Dimensionar pantalla
window.onresize = () => {
  scene.background = new THREE.Color(0xdddddd);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight, true);
};

//Resetear escena
export function reset() {
  scene.children = [];
  renderer.setSize(0, 0, true);
}

// Main
export function main() {
  // Configuracion inicial
  renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
  renderer.shadowMap.enabled = true;
  scene.background = new THREE.Color(0xdddddd);
  document.body.appendChild(renderer.domElement);

  /* const axesHelper = new THREE.axesHelper(20);
  scene.add(axesHelper); */

  // Controls
  cameraConfig();
  controlsConfig();


  // Light
  setupLights();
  
  loadInitialModel()

  // Render
  animate();
}

export function loadInitialModel() {
  loader.load(
    'assets/modelOne/scene.gltf',
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

export function changeModel(assetFolder) {
  scene.children = [];
  // Light
  setupLights();
  loader.load(
    `assets/${assetFolder}/scene.gltf`,
    function (gltf) {
      car = gltf.scene.children[0];
      scene.add(car);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );
}

function controlsConfig() {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.enablePan = false;
}

function cameraConfig() {
  camera.position.x = 8;
  camera.position.y = 2;
  camera.position.z = 8;
}

function setupLights() {
  hlight = new THREE.AmbientLight(0x404040, 100);
  scene.add(hlight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
