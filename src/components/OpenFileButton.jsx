import Button from '@material-ui/core/Button';
import { useRef } from 'react';

export default function OpenFileButton (props) {
    const fileInputRef = useRef(null);
    const openFileHandler = () => {
        fileInputRef.current.click();
    }
    const fileChangeHander = (e)=> {
        props.onChange(e);
    }
    return (
        <div className="hbox hcenter">
            <Button variant="contained" color="primary" size="large" onClick={openFileHandler}>Choose a pdf file</Button>
            <input ref={fileInputRef} style={{display:"none"}} type="file" id="pdfFileInput" accept="application/pdf" onChange={fileChangeHander} />
        </div>
    )
}