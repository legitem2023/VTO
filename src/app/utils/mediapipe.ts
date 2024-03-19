import { Camera } from "../modules/camera_util"
import { FaceMeshSolution } from "../modules/face_mesh"

class Mediapipe {
    constructor() { }

    public faceDetection() {
        return new FaceMeshSolution({
            locateFile: (file) => {
                return `https://hokei-vto.s3.amazonaws.com/modules/facemesh/${file}`
            },
        })
    }
    public camera(videoElement: any, faceDection: any) {
        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await faceDection.send({ image: videoElement })
            },
            width: 1280,
            height: 720
        })
        return camera
    }
    public scaleLandmark = (landmark: any, width: number, height: number) => {
        if (!landmark) return
        let { x, y, z } = landmark;
        return {
            ...landmark,
            x: x * width,
            y: y * height,
            z: z * width,
        }
    }
}
export default Mediapipe