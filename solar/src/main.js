import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import earthtexture from "./components/earth-clouds-map-4k.jpg";
import stars from './components/8k_stars.jpg';


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

const loader = new THREE.TextureLoader();

const geometry1 = new THREE.SphereGeometry(2, 32, 32);

const material1 = new THREE.MeshStandardMaterial({
    map: loader.load(earthtexture),
});


const sphere1 = new THREE.Mesh(geometry1, material1);

sphere1.position.x = -5;

scene.add(sphere1);

sphere1.scale.set(2, 2, 2);



renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);

    sphere1.rotation.y += 0.0001;

    controls.update();

    renderer.render(scene, camera)
}

animate();


const light = new THREE.AmbientLight(0xffffff, 2);

// light.position.set(5, 5, 5);

scene.add(light);





const textureLoader = new THREE.TextureLoader()
const starbackground = textureLoader.load(stars);

starbackground.mapping = THREE.EquirectangularReflectionMapping;
scene.background = starbackground;
