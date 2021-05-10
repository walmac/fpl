import React , {useContext, useEffect}from 'react';
import { PDFReader } from 'reactjs-pdf-reader';
import { PDFViewer } from 'react-view-pdf';
import { getFilePlugin, RenderDownloadProps } from '@react-pdf-viewer/get-file';

import {FplContext} from '../context/Context'
import { Viewer , SpecialZoomLevel } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { Stack, useColorMode, Flex,Grid,Box, Switch , Button} from "@chakra-ui/react";

/* import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; */

const PdfView = (props) => {

    
    const { pdf, callsign, blob} = useContext(FplContext);
    const getFilePluginInstance = getFilePlugin();
    const { Download} = getFilePluginInstance;

    const Bajar = () => {
        let name = ''
        
        name = name + name.concat('FPL -' + callsign.toUpperCase() +'.pdf');
        console.log(name);
        //download(pdf, name, "application/pdf");  
    }
    
    return ( 
       /*  <>
            <Button onClick={()=>Bajar()}>
                Bajar
            </Button>
            <PDFReader data={pdf}/>
            <PDFViewer url={blob} />
        </> */
        <>
            { pdf ? (<>
                
            
                
                <Button onClick={()=>Bajar()}>
                    Bajar
                </Button>
                
               
                <div
                style={{
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    padding: '4px',
                }}
            >
                <Download>
                {
                    (props: RenderDownloadProps) => (
                        <button
                            style={{
                                backgroundColor: '#357edd',
                                border: 'none',
                                borderRadius: '4px',
                                color: '#ffffff',
                                cursor: 'pointer',
                                padding: '8px',
                            }}
                            onClick={props.onClick}
                        >
                            Download
                        </button>
                    )
                }
                </Download>
            </div>
                
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                    
                    
                    <div
                        style={{
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            height: '750px',
                        }}
                    >
                            <Viewer
                            fileUrl={pdf} 
                            defaultScale={SpecialZoomLevel.PageFit} 
                            plugins={[
                                getFilePluginInstance,
                            ]}
    
                            />
                    </div>
                </Worker>
                
                
                
            
            </> ): <h1>Se debe terminar el plan de vuelo primero</h1>} 
        </>
    );
}
 
export default PdfView;