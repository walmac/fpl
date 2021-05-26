import React, { useContext, useEffect, useState } from "react";
import { PDFReader } from "reactjs-pdf-reader";
import { PDFViewer } from "react-view-pdf";
import { getFilePlugin, RenderDownloadProps } from "@react-pdf-viewer/get-file";
import Alert from "../src/components/Alert";
import AuthContext from "../context/auth/authContext";

import { FplContext } from "../context/Context";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";

import { isEmail, isNotEmptyString } from "@formiz/validations";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Container,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FieldInput } from "../src/components/FieldInput";
import { Formiz, useForm, FormizStep } from "@formiz/core";
import clienteAxios from "../config/axios";
import WalkthroughPopover from '../src/ui/WalkthroughPopover';



const urlMail = "/api/mail";

/* import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'; */

const PdfView = (props) => {
  const [sending, setSending] = useState(false);
  const { pdf, callsign, blob, bytes, values } = useContext(FplContext);
  const { setMensaje, mensaje } = useContext(AuthContext);
  const getFilePluginInstance = getFilePlugin();
  const { Download } = getFilePluginInstance;
  const myForm = useForm();
  const help = {
    text :'Aca podes enviarte el Plan de vuelo en formato pdf a tu email. Si no podes visualizarlo podes enviarlo igual y chequearlo alli. Si no se visualiza es porque estas usando algún navegador que no soporta la función. Si el mail no llega fijate en la parte de spam o correo no deseado de tu casilla'
  }
  

  const Bajar = () => {
    /* let name = "";

    name = name + name.concat("FPL -" + callsign.toUpperCase() + ".pdf");
    console.log(name); */
    //download(pdf, name, "application/pdf");
    console.log("esta?");

    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  };

  const sendMail = async (params) => {
    if (params.email === null) {
      return;
    }
    let correo = params.email.split("@");
    console.log(correo);
    if (
      correo[1] === "eana.com.ar" ||
      correo[1] === "eana.com" ||
      correo[1] === "anac.gov.ar"
    ) {
      setMensaje(
        "No se puede enviar mail a ese servidor, utilice un correo personal"
      );
      return;
    }

    setSending(true);
    console.log(params);
    let name = "";

    name = name + name.concat("FPL-" + callsign.toUpperCase() + ".pdf");

    /* setStatus("Sending..."); */
    let message = "FPL generado con FPLDIGITAL";
    const { email } = params;
    let details = {
      /* name: name.value, */
      email: email.value,
      message: message,
    };

    try {
      clienteAxios({
        method: "POST",
        url: urlMail,
        data: {
          headers: {
            "content-type": "application/pdf",
          },

          email: email,

          pdf: bytes,
          filename: name,
        },
      }).then((response) => {
        console.log(response.data.status);
        setSending(false);
        setMensaje(response.data.status);
        
        
      });
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
      <Container maxW={"3xl"}>
      <WalkthroughPopover props={help}/>
        
        {pdf ? (
          <>
           <Stack
              as={Box}
              textAlign={'center'}
              spacing={{ base: 8, md: 12 }}
              py={{ base: 10, md: 16 }}>
            <Heading
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                    lineHeight={"110%"}
                    textAlign='center'
                    >
                    <Text as={"span"} color={"gray.500"}>
                        Tu Fpl
                    </Text>
                    
              </Heading>
              <Text as={"span"} color={"gray.500"}>
                        Acá podés previsualizar tu plan de vuelo. Si no aparece se debe a que estas usando un navegador viejo. Aún asi podés enviartelo al mail y verlo. Si no te llega el correo fijate en correo no deseado o spam.
                    </Text>
              </Stack>    
            <Formiz connect={myForm} onValidSubmit={sendMail}>
              <form noValidate onSubmit={myForm.submit}>
                <FieldInput
                  name="email"
                  label="Email"
                  validations={[
                    {
                      rule: isNotEmptyString(),
                      message: "El mail no puede estar vacio",
                    },
                    {
                      rule: isEmail(),
                      message: "No es un email valido",
                    },
                  ]}
                />
                {mensaje && <Alert />}
                {/* <Button
                  type="submit" // Create a submit button
                  disabled={!myForm.isValid}
                >
                  Enviar Email
                </Button> */}
                 <Stack
                as={Box}
                textAlign={'center'}
                spacing={{ base: 8, md: 14 }}
                py={{ base: 10, md: 22 }}>
                {!sending ?<Button  type="submit" // Create a submit button
                  disabled={!myForm.isValid}
                  bg={'gray.500'}
                  rounded={'full'}
                  px={4}
                  _hover={{
                      bg: 'gray.600',
                  }}>Enviar Email</Button> : 
                  <Button
                    isLoading
                    
                    loadingText="Enviando"
                    colorScheme="grey.400"
                    variant="outline"
                    bg={'gray.500'}
                    rounded={'full'}
                    px={4}
                    _hover={{
                        bg: 'gray.600',
                    }}
                    >Enviar Email
                  </Button>
                    
                    
                  }
                  <Text as={"span"} color={"gray.500"}>
                        Si te gusto la app podés ayudar al desarrollador invitandole un cafecito
                    </Text>
                  <a href='https://cafecito.app/walmac' rel='noopener' target='_blank'><img srcset='https://cdn.cafecito.app/imgs/buttons/button_1.png 1x, https://cdn.cafecito.app/imgs/buttons/button_1_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_1_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_1.png' alt='Invitame un café en cafecito.app' /></a>
                  </Stack>
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
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  height: "750px",
                  
                }}
              >
                <Viewer
                  fileUrl={pdf}
                  defaultScale={SpecialZoomLevel.PageFit}
                  plugins={[getFilePluginInstance]}
                />
              </div>
            </Worker>
            {/* <PDFReader data={pdf}/> */}
            {/* <PDFViewer url={blob} /> */}
          </>
        ) : (
          <h1>Se debe terminar el plan de vuelo primero</h1>
        )}
      </Container>
    </>
  );
};

export default PdfView;
