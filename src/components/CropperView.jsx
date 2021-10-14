import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Tesseract from 'tesseract.js';
import { useRef, useState } from "react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
export default function CropperView(props) {
    const cropperRef = useRef(null);
    const [croppedImg, setCropperImg] = useState();
    const onCrop = (e) => {
        const imageElement: any = cropperRef?.current;
        const cropper: any = imageElement?.cropper;
        const croppedUrl = cropper.getCroppedCanvas().toDataURL();
        setCropperImg(croppedUrl);
    };
    const [recognizedText, setRecognizedText] = useState('');
    const recognizeImgHandler = () => {
        Tesseract.recognize(
            croppedImg,
            'eng',
        ).then(({ data: { text } }) => {
            console.log(text);
            setRecognizedText(text);
        })
    }
    const exitHandler = () => {
        props.exit();
    }
    return (
        <div style={{ height: "100%" }}>
            <div style={{paddingBottom:'40px'}}>
                <Cropper
                    ref={cropperRef}
                    // style={{ height: "100%", width: "100%" }}
                    zoomTo={1}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={props.imageUrl}
                    viewMode={2}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCrop={false}
                    autoCropArea={0.1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={false}
                    // crop={onCrop}
                    cropend={onCrop}
                    movable={true}
                    zoomable={false}
                />
            </div>
            <div className="cropperToolBar">
                {croppedImg &&
                    <div className="hbox" >
                        <img src={croppedImg} style={{ height: '40px' }} alt="cropped" />
                        <IconButton onClick={recognizeImgHandler}>
                            <VisibilityIcon></VisibilityIcon>
                        </IconButton>
                    </div>
                }
                <h2>{recognizedText}</h2>
                <IconButton aria-label="exit" onClick={exitHandler}>
                    <ExitToAppIcon />
                </IconButton>
            </div>
        </div>
    )
}