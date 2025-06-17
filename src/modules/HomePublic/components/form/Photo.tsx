import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { ApplicationStore } from "../../store";
import { Step } from "../../types";

const Photo = forwardRef((_, ref) => {
    const videoRef = useRef<any>(null);
    const canvasRef = useRef<any>(null);
    const fileInputRef = useRef<any>(null);
    const [capturedImage, setCapturedImage] = useState('');
    const [stream, setStream] = useState<any>(null);
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm, setIsPhotoCaptured, isPhotoCapture, setIsPhotoCapture } = ApplicationStore();

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    useImperativeHandle(ref, () => ({
        retakePhoto,
        skip,
        upload
    }));

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
            (stream as any).getTracks().forEach((track: any) => track.stop());
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
            (canvas as any).width = videoRef.current.videoWidth;
            (canvas as any).height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            const imageData = canvas.toDataURL("image/png");
            setCapturedImage(imageData);
            stopCamera();
            setIsPhotoCaptured(true);
        }
    };

    const handleUpload = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    if (canvasRef.current) {
                        const canvas = canvasRef.current;
                        const context = canvas.getContext("2d");
                        if (!context) return;

                        const videoWidth = videoRef.current?.videoWidth || 640;
                        const videoHeight = videoRef.current?.videoHeight || 480;
                        const imgRatio = img.width / img.height;
                        const canvasRatio = videoWidth / videoHeight;

                        let drawWidth = videoWidth;
                        let drawHeight = videoHeight;
                        let offsetX = 0;
                        let offsetY = 0;

                        if (imgRatio > canvasRatio) {
                            drawWidth = videoHeight * imgRatio;
                            offsetX = (videoWidth - drawWidth) / 2;
                        } else {
                            drawHeight = videoWidth / imgRatio;
                            offsetY = (videoHeight - drawHeight) / 2;
                        }

                        canvas.width = videoWidth;
                        canvas.height = videoHeight;
                        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                        setCapturedImage(canvas.toDataURL("image/png"));
                        setIsPhotoCaptured(true);
                    }
                };
                (img as any).src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const upload = () => {
        fileInputRef.current?.click()
    }


    const retakePhoto = () => {
        setCapturedImage('');
        startCamera();
        setIsPhotoCaptured(false);
    };

    const skip = () => {
        setCapturedImage('');
        setIsPhotoCaptured(true);
    };

    useEffect(() => {
        if (submit === true && activeStepper === Step.Photo) {
            setApplicationForm({ ...applicationForm, photo: capturedImage });
            setActiveStepper(activeStepper + 1);
        }
        return setSubmit(false);
    }, [submit]);

    useEffect(() => {
        if (isPhotoCapture === true && activeStepper === Step.Photo) {
            capturePhoto();
        }
        return setIsPhotoCapture(false);
    }, [isPhotoCapture]);

    useEffect(() => {
        setIsPhotoCaptured(false);
    }, []);

    return (
        <div className="text-[#6D6D6D] flex flex-col gap-4 items-center">
            <p className="text-center sp:w-[59%] ">
                To complete your application, let's take your photo. Tap the {" "}
                <span className="text-[#559CDA] cursor-pointer">CAMERA ICON</span> or the {" "}
                <span className="text-[#559CDA] cursor-pointer">TAKE PHOTO BUTTON</span> to start. Make sure to be in a place with proper lighting.
            </p>
            <div className="h-[30rem] w-full bg-[#4F4F4F] flex flex-col justify-center items-center overflow-hidden ">
                {capturedImage ? (
                    <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gray-300">
                        <img src={capturedImage} alt="Profile Picture" className="w-full h-full object-cover" />
                    </div>
                ) : (
                    <div className="relative">
                        <video ref={videoRef} autoPlay className="h-full w-auto rounded-lg"></video>
                        <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full border-4 border-white transform -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"></div>
                    </div>
                )}
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
});

export default Photo;