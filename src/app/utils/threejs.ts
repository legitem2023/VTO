// import * as THREE from 'three'


import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
// import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { EffectComposer, RenderPass, UnrealBloomPass, FXAAShader } from 'three/examples/jsm/Addons.js';

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader.js';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { MirrorShader } from 'three/examples/jsm/shaders/MirrorShader.js';
import { TriangleBlurShader } from 'three/examples/jsm/shaders/TriangleBlurShader.js';
import { FACE_MESH_UV } from '../modules/face_geom';

class Threejs {
    constructor() { }

    public scene() {
        return new THREE.Scene();
    }
    public threejscamera(width: any, height: any) {
        return new THREE.PerspectiveCamera(20, width / height, 0.1, 1000);
    }
    public renderer(canvas: any, width: any, height: any, antialias: boolean) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, precision: "highp" });
        renderer.autoClear = false;
        renderer.clear();
        renderer.clearDepth();
        renderer.setClearColor(0xc0c0c0);
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ReinhardToneMapping;
        return renderer;
    }
    public GLTFLoader() {
        const manager = new THREE.LoadingManager();
        manager.onStart = function (url, itemsLoaded, itemsTotal) {
            (document.getElementById("Loading_animation") as HTMLDivElement).style.display = 'flex';
        };
        manager.onLoad = function () {
            (document.getElementById("Loading_animation") as HTMLDivElement).style.display = 'none';
        };
        manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            (document.getElementById("Loading_animation") as HTMLDivElement).style.display = 'flex';
        };
        const modelGLTF = new GLTFLoader(manager);
        modelGLTF.setMeshoptDecoder(MeshoptDecoder);
        const dracoLoader = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/').setDecoderConfig({ type: 'js' });
        modelGLTF.setDRACOLoader(dracoLoader);
        return modelGLTF;
    }
    public HDRLighting(path: string) {
        const HDR = new RGBELoader()
            .load(path, function (texture: any) {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                return texture;
            })
        return HDR;
    }
    public Light() {
        const A = new THREE.DirectionalLight(0xFFFFFF, 1);
        A.position.set(12.119, 10.000, 12.311);
        const B = new THREE.DirectionalLight(0xFFFFFF, 1);
        B.position.set(12.124, 10.000, -12.773);
        const C = new THREE.DirectionalLight(0xFFFFFF, 1);
        C.position.set(-12.856, 10.000, 12.346);
        const D = new THREE.DirectionalLight(0xFFFFFF, 1);
        D.position.set(-12.871, 10.000, -12.723);
        const E = new THREE.DirectionalLight(0xFFFFFF, 1);
        E.position.set(12.119, -10.000, 12.311);
        const F = new THREE.DirectionalLight(0xFFFFFF, 1);
        F.position.set(12.124, -10.000, -12.773);
        const G = new THREE.DirectionalLight(0xFFFFFF, 1);
        G.position.set(-12.856, -10.000, 12.346);
        const H = new THREE.DirectionalLight(0xFFFFFF, 1);
        H.position.set(-12.871, -10.000, -12.723);
        const I = new THREE.PointLight(0xFFffff, 0.1);
        I.position.set(0, 1.197, 0)
        const J = new THREE.PointLight(0xffFFff, 0.1);
        J.position.set(0, 0, 2.208)
        const K = new THREE.PointLight(0xffffFF, 0.1);
        K.position.set(0, 0, -2.208)
        const L = new THREE.PointLight(0xFFFFFF, 0.1);
        L.position.set(-2.208, 0, 0)
        const M = new THREE.PointLight(0xFFFFFF, 0.1);
        M.position.set(2.208, 0, 0)
        const N = new THREE.DirectionalLight(0xFF0000, 0.5);
        N.position.set(2.140, 10.000, 2.140);
        const O = new THREE.DirectionalLight(0xFF0000, 0.5);
        O.position.set(2.140, 10.000, -2.140);
        const P = new THREE.DirectionalLight(0xFF0000, 0.5);
        P.position.set(-2.140, 10.000, 2.140);
        const Q = new THREE.DirectionalLight(0xFF0000, 0.5);
        Q.position.set(-2.140, 10.000, -2.140);
        const N1 = new THREE.DirectionalLight(0x00FF00, 0.5);
        N1.position.set(2.140, 9.000, 2.140);
        const O1 = new THREE.DirectionalLight(0x00FF00, 0.5);
        O1.position.set(2.140, 9.000, -2.140);
        const P1 = new THREE.DirectionalLight(0x00FF00, 0.5);
        P1.position.set(-2.140, 9.000, 2.140);
        const Q1 = new THREE.DirectionalLight(0x00FF00, 0.5);
        Q1.position.set(-2.140, 9.000, -2.140);
        const N2 = new THREE.DirectionalLight(0x0000FF, 0.5);
        N2.position.set(2.140, 8.000, 2.140);
        const O2 = new THREE.DirectionalLight(0x0000FF, 0.5);
        O2.position.set(2.140, 8.000, -2.140);
        const P2 = new THREE.DirectionalLight(0x0000FF, 0.5);
        P2.position.set(-2.140, 8.000, 2.140);
        const Q2 = new THREE.AmbientLight(0xFF0000); // Soft white ambient light
        return { A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, N1, O1, P1, Q1, N2, O2, P2, Q2 }
    }
    public Loadmodel(path: any, callback: (model: THREE.Object3D) => void) {
        const manager = new THREE.LoadingManager();
        manager.onStart = function (url, itemsLoaded, itemsTotal) {
            (document.getElementById("Loading_animation") as HTMLDivElement).style.display = 'flex';
        };
        manager.onLoad = function () {
            (document.getElementById("Loading_animation") as HTMLDivElement).style.display = 'none';
        };
        manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            (document.getElementById("Loading_animation") as HTMLDivElement).style.display = 'flex';
        };
        const loader = new GLTFLoader(manager);
        const dracoLoader = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/').setDecoderConfig({ type: 'js' });
        loader.setDRACOLoader(dracoLoader);
        loader.load(path, (gltf: any) => {
            const model: any = gltf.scene;
            callback(model);
        });
    }
    public Vector4(a: any, b: any, c: any, d: any) {
        return new THREE.Vector4(a, b, c, d);
    }
    public Vector() {
        return new THREE.Vector3();
    }
    public Vector3(a: any, b: any, c: any) {
        return new THREE.Vector3(a, b, c);
    }
    public Object3D() {
        return THREE.Object3D;
    }
    public TextureLoader() {
        return new THREE.TextureLoader();
    }
    public LinearFilter() {
        return THREE.LinearFilter;
    }
    public updatingPosition(model: any, position: any, matrix: any, scale: any) {
        model.matrixAutoUpdate = false
        model.matrix.extractRotation(matrix);
        model.matrix.setPosition(-position.x, position.y, 0);
        model.matrix.scale(scale);
    }
    public Matrix4() {
        return new THREE.Matrix4();
    }
    public ResultGeometry(results: any) {
        return [
            results.multiFaceLandmarks[0][0], results.multiFaceLandmarks[0][1],
            results.multiFaceLandmarks[0][2], results.multiFaceLandmarks[0][3],
            results.multiFaceLandmarks[0][4], results.multiFaceLandmarks[0][5],
            results.multiFaceLandmarks[0][6], results.multiFaceLandmarks[0][7],
            results.multiFaceLandmarks[0][8], results.multiFaceLandmarks[0][9],
            results.multiFaceLandmarks[0][10], results.multiFaceLandmarks[0][11],
            results.multiFaceLandmarks[0][12], results.multiFaceLandmarks[0][13],
            results.multiFaceLandmarks[0][14], results.multiFaceLandmarks[0][15]
        ]
    }
    public BuffeGeometry(points: any) {
        return new THREE.BufferGeometry().setFromPoints(points);
    }
    public PointsMaterial() {
        return new THREE.PointsMaterial({ color: 0xff0000 });
    }
    public Points(geometry: any, material: any) {
        return new THREE.Points(geometry, material);
    }
    public makeGeometry = (landmarks: any) => {
        // const regArray = [].slice.call(indexBuffer) //indexBuffer UINT array
        // const regVertexArray = [].slice.call(vertexBuffer) //indexBuffer UINT array
        let geometry = new THREE.BufferGeometry();
        let vertices: any = [];
        let uvs: any = [];

        for (let i = 0; i < landmarks.length; i++) {
            if (!landmarks) return
            let { x, y, z } = landmarks[i];
            let vertex = [x, y, z];
            vertices.push(...vertex);
        }

        for (let j = 0; j < 468; j++) {
            uvs[j * 2] = FACE_MESH_UV[j][0];
            uvs[j * 2 + 1] = FACE_MESH_UV[j][1];
        }

        geometry.computeVertexNormals();
        // geometry.setIndex(regArray);
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

        return geometry;
    }
    public Mesh(geometry: any, material: any) {
        return new THREE.Mesh(geometry, material);
    }
    public Material() {
        return new THREE.MeshStandardMaterial({ color: 0xff0000 });
    }
    public createMaskGeometry(landmarks: any, canvasElement: HTMLCanvasElement) {
        // Example: Create a rectangular mask around the face
        const maskGeometry = [
            [landmarks[0].x * canvasElement.width, landmarks[0].y * canvasElement.height],
            [landmarks[1].x * canvasElement.width, landmarks[1].y * canvasElement.height],
            [landmarks[2].x * canvasElement.width, landmarks[2].y * canvasElement.height],
            [landmarks[3].x * canvasElement.width, landmarks[3].y * canvasElement.height]
            // Add more points as needed for complex mask shapes
        ];
        return maskGeometry;
    }
}
export default Threejs