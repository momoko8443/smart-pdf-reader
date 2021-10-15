import { Button } from "@material-ui/core";
import { useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateTemplate from "./createTemplateModal";
import CreateTemplateModal from "./createTemplateModal";
export default function PDFViewer(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [mode, setMode] = useState('init'); //init, edit
    const ref = useRef();
    let currentPageInfo;
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);

    }
    function onRenderSuccessHandler(page) {
        console.log('page', page);
        currentPageInfo = page;
    }
    function startCrop() {
        const dataUrl = ref.current.children[0].toDataURL();
        props.startCrop(dataUrl, currentPageInfo);
    }

    function exit() {
        props.exit();
    }
    function addTemplate() {
        console.log('add template');
        // setMode('edit');
        setOpenCreateTemplateModal(true);
    }

    const [openCreateTemplateModal, setOpenCreateTemplateModal] = useState(false);
    const onCloseCreateTemplateModal = () => {
        setOpenCreateTemplateModal(false);
        setMode('init');
    }
    return (
        <>
        <div className="pdfView hbox hcenter">
            <Document
                file={props.pdfFile}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page inputRef={ref} scale={1} pageNumber={pageNumber} onRenderSuccess={onRenderSuccessHandler} />
            </Document>
            <div className="pdfToolBar">

                <div className="hbox vcenter">
                    <Button variant="contained" onClick={() => setPageNumber(pageNumber - 1)}>prev page</Button>
                    <div style={{ width: '10px' }}></div>
                    <Button variant="contained" color="secondary" onClick={() => setPageNumber(pageNumber + 1)}>next page</Button>
                    <span style={{ paddingLeft: "10px" }}>{pageNumber + '/' + numPages} </span>
                </div>
                {
                    mode === 'edit' ?
                        <IconButton aria-label="edit" onClick={startCrop}>
                            <FormatShapesIcon />
                        </IconButton>
                        :
                        <IconButton aria-label="add Template" onClick={addTemplate}>
                            <AddBoxIcon />
                        </IconButton>
                }
                <IconButton aria-label="exit" onClick={exit}>
                    <ExitToAppIcon />
                </IconButton>
            </div>
        </div>
        <CreateTemplateModal open={openCreateTemplateModal} onClose={onCloseCreateTemplateModal}></CreateTemplateModal>
        </>
    )
}