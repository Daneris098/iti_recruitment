import { useEffect, useRef, useState } from "react";
import { ApplicationStore } from "../../store";
import { Step } from "../../types";

export default function Index() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm, setIsPhotoCaptured, isPhotoCapture, setIsPhotoCapture } = ApplicationStore()

    useEffect(() => {
        startCamera();
        return () => stopCamera(); // Stop camera when unmounting
    }, []);

    const startCamera = async () => {
        try {
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(videoStream);
            if (videoRef.current) {
                videoRef.current.srcObject = videoStream;
            }
        } catch (error) {
            console.error("Error accessing webcam:", error);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            if (!context) {
                console.error("Canvas context is not available");
                return;
            }

            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            const imageData = canvas.toDataURL("image/png");
            console.log('imageData: ', imageData)
            setCapturedImage(imageData);
            stopCamera(); // Stop the camera after capturing
            setIsPhotoCaptured(true)
        }
    };

    // const retakePhoto = () => {
    //     setCapturedImage(null);
    //     startCamera();
    // };
    
    useEffect(() => {
        if (submit === true && activeStepper === Step.Photo ) {
            setApplicationForm({ ...applicationForm, photo: capturedImage })
            setActiveStepper(activeStepper + 1)
        }
        return (setSubmit(false))
    }, [submit])
    
    
    useEffect(() => {
        if (isPhotoCapture === true && activeStepper === Step.Photo ) {
            capturePhoto(); 
        }
        return (setIsPhotoCapture(false))
    }, [isPhotoCapture])
    
    useEffect(() => {
        setIsPhotoCaptured(false)
    },[])


    return (
        <div className="text-[#6D6D6D] flex flex-col gap-4 items-center">
            <p className="text-center w-[59%]">
                To complete your application, let's take your photo. Tap the{" "}
                <span className="text-[#559CDA] cursor-pointer">CAMERA ICON</span> or the{" "}
                <span className="text-[#559CDA] cursor-pointer">TAKE PHOTO BUTTON</span> to start. Make sure to be in a place with proper lighting.
            </p>

            <div className="h-[30rem] w-full bg-[#4F4F4F] flex flex-col justify-center items-center overflow-hidden">
                {capturedImage ? (
                    // Show circular captured image preview
                    <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gray-300">
                        <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                    </div>
                ) : (
                    // Show video stream
                    <div className="relative">
                        <video ref={videoRef} autoPlay className="h-full w-auto rounded-lg"></video>
                        {/* Circular guide overlay */}
                        <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full border-4 border-white transform -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"></div>
                    </div>)}
            </div>

            {/* Hidden canvas to capture image */}
            <canvas ref={canvasRef} className="hidden"></canvas>

            {/* Capture & Retake Buttons */}
            {/* {capturedImage ? (
                <button
                    onClick={retakePhoto}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                    Retake Photo
                </button>
            ) : (
                <button
                    onClick={capturePhoto}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Take Photo
                </button>
            )} */}
        </div>
    );
}
