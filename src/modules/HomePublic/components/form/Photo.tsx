import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { ApplicationStore } from "../../store";
import { Step } from "../../types";
import "@mantine/dropzone/styles.css";
import { useMediaQuery } from '@mantine/hooks';
import { Flex, Group, Text, rem } from "@mantine/core";
import { IconUpload, IconX, IconCloudUp } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

const Photo = forwardRef((_, ref) => {
    const videoRef = useRef<any>(null);
    const canvasRef = useRef<any>(null);
    const fileInputRef = useRef<any>(null);
    const [capturedImage, setCapturedImage] = useState('');
    const [stream, setStream] = useState<any>(null);
    const { submit, activeStepper, setSubmit, setActiveStepper, setApplicationForm, applicationForm, setIsPhotoCaptured, isPhotoCapture, setIsPhotoCapture } = ApplicationStore();
    const [cameraAllowed, setCameraAllowed] = useState<boolean | null>(false);
    const dropzoneOpenRef = useRef<() => void>(null);

    useEffect(() => {
        const checkCameraPermission = async () => {
            try {
                if (navigator.permissions) {
                    const result = await navigator.permissions.query({ name: 'camera' as PermissionName });

                    if (result.state === 'granted') {
                        setCameraAllowed(true);
                    } else if (result.state === 'denied') {
                        setCameraAllowed(false);
                    } else {
                        setCameraAllowed(null);
                    }

                    result.onchange = () => {
                        setCameraAllowed(result.state === 'granted');
                    };
                } else {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    setCameraAllowed(true);
                    stream.getTracks().forEach(track => track.stop()); // clean up
                }
            } catch (error: any) {
                if (error.name === 'NotAllowedError') {
                    setCameraAllowed(false);
                } else if (error.name === 'NotFoundError') {
                    setCameraAllowed(false);
                } else {
                    console.error('Unexpected camera access error:', error);
                    setCameraAllowed(null);
                }
            }
        };

        checkCameraPermission();
    }, []);

    useEffect(() => {
        console.log('cameraAllowed: ', cameraAllowed)
    }, [cameraAllowed])


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

    // const handleUpload = (event: any) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const img = new Image();
    //             img.onload = () => {
    //                 if (canvasRef.current) {
    //                     const canvas = canvasRef.current;
    //                     const context = canvas.getContext("2d");
    //                     if (!context) return;

    //                     const videoWidth = videoRef.current?.videoWidth || 640;
    //                     const videoHeight = videoRef.current?.videoHeight || 480;
    //                     const imgRatio = img.width / img.height;
    //                     const canvasRatio = videoWidth / videoHeight;

    //                     let drawWidth = videoWidth;
    //                     let drawHeight = videoHeight;
    //                     let offsetX = 0;
    //                     let offsetY = 0;

    //                     if (imgRatio > canvasRatio) {
    //                         drawWidth = videoHeight * imgRatio;
    //                         offsetX = (videoWidth - drawWidth) / 2;
    //                     } else {
    //                         drawHeight = videoWidth / imgRatio;
    //                         offsetY = (videoHeight - drawHeight) / 2;
    //                     }

    //                     canvas.width = videoWidth;
    //                     canvas.height = videoHeight;
    //                     context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    //                     setCapturedImage(canvas.toDataURL("image/png"));
    //                     setIsPhotoCaptured(true);
    //                 }
    //             };
    //             (img as any).src = reader.result;
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const upload = () => {
        // fileInputRef.current?.click()
        dropzoneOpenRef.current?.();
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
        setCapturedImage(applicationForm.photo)
    }, [])

    useEffect(() => {
        if (isPhotoCapture === true && activeStepper === Step.Photo) {
            capturePhoto();
        }
        return setIsPhotoCapture(false);
    }, [isPhotoCapture]);

    useEffect(() => {
        console.log('applicationForm.photo : ', applicationForm.photo)
        if (applicationForm.photo == '') {
            setIsPhotoCaptured(false);
        }
        else {
            setIsPhotoCaptured(true);
        }
    }, []);
    const isMobile = useMediaQuery('(max-width: 770px)');

    return (
        <div className="text-[#6D6D6D] flex flex-col gap-4 items-center">

            {!isMobile && (<p className={`text-center sp:w-[59%] ${!cameraAllowed ? 'opacity-0' : ''}`}>
                To complete your application, let's take your photo. Tap the {" "}
                <span className="text-[#559CDA] cursor-pointer">CAMERA ICON</span> or the {" "}
                <span className="text-[#559CDA] cursor-pointer">TAKE PHOTO BUTTON</span> to start. Make sure to be in a place with proper lighting.
            </p>)}

            {!cameraAllowed && !capturedImage && (
                <Group className="w-full">
                    <Text size="md" fw={500} className="flex gap-2">
                        Upload Photo
                    </Text>
                    <Dropzone
                        openRef={dropzoneOpenRef}
                        onDrop={(files) => {
                            const file = files[0];
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
                                    img.src = reader.result as string;
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                        onReject={(files) => console.log("rejected files", files)}
                        maxSize={5 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        className="border-dashed w-full"
                        acceptColor="red"
                    >
                        <Group
                            justify="center"
                            gap="xl"
                            mih={220}
                            style={{ pointerEvents: "none" }}
                        >
                            <Dropzone.Accept>
                                <IconUpload
                                    style={{
                                        width: rem(52),
                                        height: rem(52),
                                        color: "var(--mantine-color-blue-6)",
                                    }}
                                    stroke={1.5}
                                />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX
                                    style={{
                                        width: rem(52),
                                        height: rem(52),
                                        color: "var(--mantine-color-red-6)",
                                    }}
                                    stroke={1.5}
                                />
                            </Dropzone.Reject>

                            <Flex direction="column" align="center" gap={5}>
                                <IconCloudUp color="#559cda" stroke={1.5} size={80} />
                                <Group gap={5}>
                                    <Text size="xl" inline className="flex justify-center">
                                        Drag & drop files or
                                    </Text>
                                    <Text size="xl" className="text-blue-400 underline">
                                        Browse
                                    </Text>
                                </Group>
                                <Text size="sm" c="dimmed" inline mt={7}>
                                    Supported formats: PNG, JPG
                                </Text>
                                <Text size="sm" c="dimmed" inline mt={7}>
                                    Max File Size: 25mb
                                </Text>
                            </Flex>
                        </Group>
                    </Dropzone>
                </Group>
            )}

            <div className="h-[30rem] w-full flex flex-col sp:justify-center sp:items-center overflow-hidden ">
                {capturedImage ? (
                    <div className=" overflow-hidden border-4 border-gray-300 relative">
                        <img src={capturedImage} alt="Profile Picture" className="w-full h-full object-cover" />
                        <IconX size={30} className="text-white p-1 m-1 bg-[#6D6D6D] rounded-2xl top-0 right-0 cursor-pointer absolute" onClick={() => {
                            setCapturedImage('');
                            setIsPhotoCaptured(false);
                            fileInputRef.current.value = '';
                            setApplicationForm({ ...applicationForm, photo: '' })
                        }} />
                    </div>
                ) : (
                    <div className="relative">
                        <video ref={videoRef} autoPlay className="h-full w-auto rounded-lg"></video>
                        <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full border-4 border-white transform -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none"></div>
                    </div>
                )}
            </div>

            <canvas ref={canvasRef} className="hidden"></canvas>
            {/* <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
            /> */}
        </div>
    );
});

export default Photo;