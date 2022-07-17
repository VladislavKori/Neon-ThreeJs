import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { RectAreaLightHelper } from 'RectAreaLightHelper'
import { RectAreaLightUniformsLib } from 'RectAreaLightUniformsLib';

const speed = 2;
const color = [
    "#33DEE9",
    "#B533E9",
    "#E9339F"
]

function init() {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 50)

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    RectAreaLightUniformsLib.init();

    let plain;
    {
        plain = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.MeshStandardMaterial({ color: "white", roughness: 0.1, metalness: 0})
        )
        plain.rotateX(-Math.PI / 2);
        plain.receiveShadow = true;
        scene.add(plain)
    }

    let torus;
    {
        torus = new THREE.Mesh(
            new THREE.TorusKnotGeometry(5, 2, 100, 100),
            new THREE.MeshStandardMaterial({ color: "white", roughness: 0, metalness: 0 })
        )
        torus.position.set(0, 10, 0)
        scene.add(torus)
    }

    {
        const width = 20;
        const height = 60;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(color[0], intensity, width, height);
        rectLight.position.set(30, 10, -20);
        rectLight.rotation.y = Math.PI;
        scene.add(rectLight)
        const rectLightHelper = new RectAreaLightHelper(rectLight);
        rectLight.add(rectLightHelper);
    }

    {
        const width = 20;
        const height = 60;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(color[1], intensity, width, height);
        rectLight.position.set(-30, 10, -20);
        rectLight.rotation.y = Math.PI;
        scene.add(rectLight)
        const rectLightHelper = new RectAreaLightHelper(rectLight);
        rectLight.add(rectLightHelper);
    }

        {
        const width = 20;
        const height = 60;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(color[2], intensity, width, height);
        rectLight.position.set(0, 10, -20);
        rectLight.rotation.y = Math.PI;
        scene.add(rectLight)
        const rectLightHelper = new RectAreaLightHelper(rectLight);
        rectLight.add(rectLightHelper);
    }

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Auto Resizing
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animate
    const animate = () => {
        requestAnimationFrame(animate);

        torus.rotation.x += speed/100;
        torus.rotation.y += speed/100;

        controls.update()

        renderer.render(scene, camera)
    }

    animate();
}

init()