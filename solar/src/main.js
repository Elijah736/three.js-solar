import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import earthtexture from "./components/earth-clouds-map-4k.jpg";
import stars from './components/8k_stars.jpg';
import sun from './components/8k_sun.jpg';
// import { texture } from 'three/src/nodes/accessors/TextureNode.js';

// ========================================================================== //

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 8;


// ========================================================================== //



const loader = new THREE.TextureLoader();

const geometry1 = new THREE.SphereGeometry(2, 32, 32);
const geometry2 = new THREE.SphereGeometry(2, 32, 32);

const material1 = new THREE.MeshStandardMaterial({
    map: loader.load(earthtexture),
});
const material2 = new THREE.MeshStandardMaterial({
    map: loader.load(sun)
})

const sphere1 = new THREE.Mesh(geometry1, material1);
const sphere2 = new THREE.Mesh(geometry2, material2);

sphere1.position.x = -5;
sphere2.position.x = 35;

scene.add(sphere1);
scene.add(sphere2);

sphere1.scale.set(2, 2, 2);
sphere2.scale.set(7, 7, 7);

const earthMap = loader.load(earthtexture);
const sunMap = loader.load(sun);

earthMap.wrapS = THREE.RepeatWrapping;
earthMap.wrapT = THREE.RepeatWrapping;
sunMap.wrapS = THREE.RepeatWrapping;
sunMap.wrapT = THREE.RepeatWrapping;



// ========================================================================== //







// ========================================================================== //

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);

    sphere1.rotation.y += 0.0001;
    sphere2.rotation.y += 0.0001;

    earthMap.offset.x += 0.005;
    sunMap.offset.x += 0.02;

    controls.update();

    renderer.render(scene, camera)
}

animate();


const light = new THREE.AmbientLight(0xffffff, 2);

// light.position.set(5, 5, 5);

scene.add(light);


// ========================================================================== //


const textureLoader = new THREE.TextureLoader()
const starbackground = textureLoader.load(stars);

starbackground.mapping = THREE.EquirectangularReflectionMapping;
scene.background = starbackground;
