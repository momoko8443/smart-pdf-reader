import React, { useState} from 'react';
import './App.css';
import OpenFileButton from './components/OpenFileButton';
import PDFViewer from './components/PDFViewer';
import { pdfjs } from 'react-pdf';
import CropperView from './components/CropperView';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


function App() {
  // mode: 'init','loading','preview','editing'
  const [mode, setMode] = useState('init');
  const [pdfFile, sefPdfFile] = React.useState();

  function fileChangeHander(event) {
    var file = event.target.files[0];
    setMode('preview');
    sefPdfFile(file);
  }
  const [image, setImage] = useState();
  const startEditHandler = (dataUrl, pageInfo) => {
    console.log(dataUrl,pageInfo);
    setMode('editing');
    setImage(dataUrl);
  }

  const exitCropperViewHandler =() => {
    setMode('preview');
  }

  const exitPDFViewHandler =() => {
    setMode('init');
  }
  
  return (
    <div className="main">
      {
        mode === 'init' &&
        <OpenFileButton onChange={fileChangeHander}></OpenFileButton>
      }
      {
        mode === 'preview' &&
        <PDFViewer pdfFile={pdfFile} startEdit={startEditHandler} exit={exitPDFViewHandler}></PDFViewer>
      }
      {
        mode === 'editing' && 
        <CropperView imageUrl={image} exit={exitCropperViewHandler}></CropperView>
      }
    </div>
  );
}

export default App;
