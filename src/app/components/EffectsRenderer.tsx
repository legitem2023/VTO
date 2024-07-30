"use client"
import React, { useEffect, useState } from 'react';
import Mediapipe from '../utils/mediapipe';
import Threejs from '../utils/threejs';
import { Camera } from '../modules/camera_util';

const EffectsRenderer: React.FC = () => {
    const threejs = new Threejs();
    let model3D: any;
    const [useModel, setModel] = useState(null);
    const LoadRingModel = (model: any, scene: any) => {
        return new Promise((resolve: any, reject: any) => {
            threejs.Loadmodel(model, (glb) => {
                // setModel(glb)

                scene.add(glb);
                model3D = glb;

                resolve();
            });
        });
    };

    useEffect(() => {
        // TODO: implement
        const video: any = document.getElementById('input_video') as HTMLVideoElement
        const canvasElement: any = document.getElementById('output_canvas') as HTMLCanvasElement;
        const threeJSElement: any = document.getElementById('threejs_canvas') as HTMLCanvasElement;

        const intermediaryCanvas: any = document.getElementById('intermediary_canvas') as HTMLCanvasElement;
        const intermediaryCtx = intermediaryCanvas.getContext('2d');

        const canvasCtx = canvasElement.getContext('2d');
        const mediapipe = new Mediapipe();
        const threejs = new Threejs();
        const pos = threejs.Vector();
        const vector = threejs.Vector();
        threejs.GLTFLoader();
        const scene = threejs.scene();
        const threejscamera = threejs.threejscamera(canvasElement.width, canvasElement.height);
        threejscamera.position.set(0, 0, 20);
        const renderer: any = threejs.renderer(threeJSElement, canvasElement.width, canvasElement.height, true);
        const Environment = (path: any) => {
            const HDR = threejs.HDRLighting(path);
            scene.environment = HDR;
        }
        Environment("https://demo-assets.pixotronics.com/pixo/presets/environment/env-gem-1.hdr");
        const faceDetection: any = mediapipe.faceDetection();
        faceDetection.setOptions({
            refineLandmarks: true,
            enableGeometry: true
        })
        LoadRingModel('https://hokei-storage.s3.ap-northeast-1.amazonaws.com/BanubaEffects/model/model1259133339_aws.glb', scene);
        faceDetection.onResults((results: any) => {

            canvasCtx.save();
            canvasCtx.clearRect(0, 0, 1280, 720);
            canvasCtx.drawImage(results.image, 0, 0, 1280, 720);

            intermediaryCtx.save();
            intermediaryCtx.clearRect(0, 0, 1280, 720);
            intermediaryCtx.drawImage(canvasElement, 0, 0, 1280, 720);
            intermediaryCtx.drawImage(threeJSElement, 0, 0, 1280, 720);

            if (results.multiFaceLandmarks) {
                if (results.multiFaceLandmarks.length > 0) {
                    if (!model3D) return

                    const LandMark = mediapipe.scaleLandmark(results.multiFaceLandmarks, canvasElement.width, canvasElement.height)
                    //***************************************************** */
                    let optionalX = (LandMark[0][6].x) * 2 - 1;
                    //***************************************************** */
                    let optionalY = (LandMark[0][6].y) * 2 - 1;
                    //***************************************************** */
                    let optionalZ = (LandMark[0][6].z * 2 - 1);
                    vector.set(optionalX, optionalY, optionalZ);
                    vector.unproject(threejscamera);
                    vector.sub(threejscamera.position).normalize();
                    let distance = threejscamera.position.z / vector.z;
                    pos.copy(threejscamera.position).add(vector.multiplyScalar(distance));
                    let Scale: any = threejs.Vector3(77 / results.multiFaceGeometry[0][14], 77 / results.multiFaceGeometry[0][14], 77 / results.multiFaceGeometry[0][14]);

                    let raw_matrix_data = results.multiFaceGeometry[0];


                    const matrix = threejs.Matrix4();
                    matrix.fromArray(raw_matrix_data);
                    var angleInRadians = Math.PI / 4;
                    var angleInRadians180 = angleInRadians * Math.PI + 0.5;
                    var rotationMatrix = threejs.Matrix4().makeRotationX(angleInRadians180);
                    matrix.multiply(rotationMatrix);

                    threejs.updatingPosition(model3D, pos, matrix, Scale);
                }

            }


            intermediaryCtx.restore();
            canvasCtx.restore();
            renderer.render(scene, threejscamera);
        })
        const camera = new Camera(video, {
            onFrame: async () => {
                await faceDetection.send({ image: video, smoothFaceIntensity: 0.5 })
            }, width: 1280, height: 720
        })
        camera.start();
    })
    return (
        <div className="container">
            <video className="input_video -scale-x-100" id="input_video"></video>
            <canvas className="output_canvas" id="output_canvas" width="1280px" height="720px"></canvas>
            <canvas className="threejs_canvas" id="threejs_canvas" width="1280px" height="720px"></canvas>
            <canvas className="intermediary_canvas" id="intermediary_canvas" width="1280px" height="720px"></canvas>
            <div id="Loading_animation">
                <div className="lds-dual-ring"></div>
            </div>
        </div>
    );
};

export default EffectsRenderer;
