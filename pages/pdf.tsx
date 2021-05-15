import React, { useContext, useEffect, useState } from "react";
import { PDFReader } from "reactjs-pdf-reader";
import { PDFViewer } from "react-view-pdf";
import { getFilePlugin, RenderDownloadProps } from "@react-pdf-viewer/get-file";



import { FplContext } from "../context/Context";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import {
  Stack,
  useColorMode,
  Flex,
  Grid,
  Box,
  Switch,
  Button,
} from "@chakra-ui/react";
import { isEmail,isNotEmptyString } from "@formiz/validations";
import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { FieldInput } from "../src/components/FieldInput";
import { Formiz, useForm, FormizStep } from "@formiz/core";
const axios = require('axios').default;


/* import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; */

const PdfView = (props) => {
  const [sending, setSending] =  useState(false);
  const { pdf, callsign, blob , bytes, values} = useContext(FplContext);
  const getFilePluginInstance = getFilePlugin();
  const { Download } = getFilePluginInstance;
  const myForm = useForm();

  const Bajar = () => {
    /* let name = "";

    name = name + name.concat("FPL -" + callsign.toUpperCase() + ".pdf");
    console.log(name); */
    //download(pdf, name, "application/pdf");
    console.log('esta?');
    
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    
   
    
  };
  
  const sendMail = async(params) => {
    if(params.email === null){
      return;
    }
    setSending(true);
    console.log(params);
    let name = "";

    name = name + name.concat("FPL-" + callsign.toUpperCase() + ".pdf");
    
    /* setStatus("Sending..."); */
    let message = 'FPL generado con FPLDIGITAL';
    const { email} = params;
    let details = {
      /* name: name.value, */
      email: email.value,
       message: message, 
      
    };
    
  try {
    
      
     axios({
        method: "POST",
        url:"http://localhost:4000/api/mail",
        data: {
            
            headers: {
                'content-type': 'application/pdf',
            },
      
      email: email,
      
      pdf:bytes,
      filename: name

      
      
        }
    }).then((response)=>{
        if (response.data.msg === 'success'){
            alert("Email sent, awesome!");
            
        }else if(response.data.msg === 'fail'){
            alert("Oops, something went wrong. Try again")
        }
    })
  } catch (error) {
      console.log(error);
      
  } 
  

  }; 

  return (
    /*  <>
            <Button onClick={()=>Bajar()}>
                Bajar
            </Button>
            <PDFReader data={pdf}/>
            <PDFViewer url={blob} />
        </> */
    <>
      {pdf ? (
        <>
          <Formiz
            connect={myForm}
            onValidSubmit={sendMail}
            
          >
            <form noValidate onSubmit={myForm.submit}>
              <FieldInput
                name="email"
                label="Email"
                validations={[
                  {
                    rule: isNotEmptyString(),
                    message: 'El mail no puede estar vacio',
                  },
                  {
                    rule: isEmail(),
                    message: "No es un email valido",
                  },
                  
                ]}
              />
              <Button
                type="submit" // Create a submit button
                disabled={!myForm.isValid}
              >
                Enviar Email
              </Button>
              {/* {!sending ?<Button  type="submit" // Create a submit button
                disabled={!myForm.isValid}>Envia</Button> : 
                <Button
                  isLoading
                  
                  loadingText="Enviando"
                  colorScheme="grey.400"
                  variant="outline"
                  >
                </Button>
                  
                  
                } */}
            </form>
          </Formiz>

          {/* <Box  h="100%">
            <PDFViewer url={blob} />
          </Box> */}

         {/*  <Button onClick={()=>Bajar()}>
                    Bajar
                </Button> */}
                

          {/* <div
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
            </div> */}

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
        </>
      ) : (
        <h1>Se debe terminar el plan de vuelo primero</h1>
      )}
    </>
  );
};

export default PdfView;
