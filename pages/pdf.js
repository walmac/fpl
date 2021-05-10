import React , {useContext}from 'react';

import {FplContext} from '../context/Context'
import { Viewer , SpecialZoomLevel } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { Stack, useColorMode, Flex,Grid,Box, Switch , Button} from "@chakra-ui/react";

/* import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; */

const PdfView = (props) => {
    
    const { pdf, callsign} = useContext(FplContext);

    const Bajar = () => {
        let name = ''
        
        name = name + name.concat('FPL -' + callsign.toUpperCase() +'.pdf');
        console.log(name);
         download(pdf, name, "application/pdf");  
    }
    
    return ( 
        <>
            {pdf ? (<>
                
            
                
                <Button onClick={()=>Bajar()}>
                    Bajar
                </Button>
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
    
                            />
                    </div>
                </Worker>
                
                
                
            
            </> ): <h1>Se debe terminar el plan de vuelo primero</h1>}
        </>
    );
}
 
export default PdfView;