import React, {useContext, useEffect} from 'react';
import {useRouter} from 'next/router';

import PilotData from '../src/ui/PilotData'
import authContext from "../context/auth/authContext";
import {FplContext} from '../context/Context';
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
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
    Accordion,
    AccordionItem,
    AccordionIcon,
    AccordionPanel,
    AccordionButton,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { Formiz, useForm, FormizStep } from "@formiz/core";
  import { StepperWrapper, DotsStepper } from "../src/components/Steppers";
  import { FieldSelect } from "../src/components/FieldSelect";
  import SignatureCanvas from "../src/components/SignatureCanvas";
  import { FieldInput } from "../src/components/FieldInput";

 


  
  



const Pre = (props) => {
    const AuthContext = useContext(authContext);
    const { autenticado, usuario, obtenerDatos, obtenerDatosAcft, datosAcfts, datos} = AuthContext;

    const { setPdf, setCallsign, setBlob, setBytes, acft } = useContext(FplContext);
    const router = useRouter();
    useEffect(() => {
        obtenerDatosAcft();
        obtenerDatos();
    }, []);
    let acfts =[];
    useEffect(() => {
        if(datosAcfts!== null)
        {
            datosAcfts.forEach(element => {
                acfts.push({ value: element.matricula, label: element.matricula });
            });
            myForm.setFieldsValues({
                acft: acfts
            });
            //console.log(acfts);
            //console.log(datosAcfts);
        }
    }, [datosAcfts]);
   // console.log(props);
   let docUrl;
  let bytes;
   
   

    const handleSubmit = (params) => {
        
        params.pilot = datos.nombre.toUpperCase() + datos.tipo +' ' + datos.licencia;
        console.log(acft);
        let aeronave ;
        datosAcfts.forEach(element => {
            console.log(element);
            if(element.matricula === params.matricula){
                aeronave = element;
                console.log('entro');
            }
        });
        if(aeronave === undefined){
          aeronave= acft;
          
          console.log(aeronave);
          params.matricula = aeronave.matricula;
        }
        params.botes = aeronave.botes;
        params.capacidad = aeronave.capacidad;
        params.chalecos = aeronave.chalecos;
        params.colorACFT = aeronave.colorACFT;
        params.colorBotes = aeronave.colorBotes;
        params.radio = aeronave.emergencia;
        params.equipo = aeronave.equipoStr; 
        params.estela = aeronave.estela;
        params.supervivencia = aeronave.supervivencia;  
        params.tipoACFT = aeronave.tipo;
        params.transponder = aeronave.transponderArr
        params.velocidad = aeronave.velocidad;
        params.numero = '1';      
        console.log(aeronave);
        console.log(params);
        console.log(acft);
        createFpl(params);
       
    }
    const createFpl = async (values) => {
    



        
        const existingPdfBytes = await fetch("/plan.pdf").then((res) =>
          res.arrayBuffer()
        );
    
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
    
        // Get the width and height of the first page
        const { width, height } = firstPage.getSize();
        console.log(width);
        console.log(height);
    
        firstPage.drawText(values.matricula.toUpperCase(), {
          x: 182,
          y: 589,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.reglas, {
          x: 338,
          y: 589,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.tipo, {
          x: 462,
          y: 590,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.numero.toString(), {
          x: 120,
          y: 543,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.tipoACFT.toUpperCase(), {
          x: 175,
          y: 543,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.estela, {
          x: 318,
          y: 544,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.equipo.toUpperCase(), {
          x: 422,
          y: 544,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.salida.toUpperCase(), {
          x: 208,
          y: 503,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.hora, {
          x: 355,
          y: 503,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.velocidad.toUpperCase(), {
          x: 90,
          y: 461,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.nivel.toUpperCase(), {
          x: 190,
          y: 460,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        //290 comienza el primer renglon de ruta
        //520 limite x del renglon de ruta del primer renglon
        //545 limite x de los renglones restantes
        //485 limite ultimo renglon x
        //72 comienzan del segundo al ultimo
    
        //459 1er renglon en y
        //449 2do renglon en y
        //439 3er renglon y
        //429 4to
        let limite = 520;
        let comienzo = 290;
        let renglon = 459;
        let actual = 1;
    
        if (values.ruta.length > 48) {
          const primer = values.ruta.split(" ");
          /*firstPage.drawText('X', {
            x: 70,
            y: 419,
            size: 8,
            font: helveticaFont,
            color: rgb(0,0,0),
          });  */
          let x = comienzo;
          let y = renglon;
          primer.forEach((element) => {
            if (comienzo >= limite) {
              actual++;
              renglon = renglon - 10;
              comienzo = 72;
            }
            firstPage.drawText(element.toUpperCase(), {
              x: comienzo,
              y: renglon,
              size: 8,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
            comienzo = comienzo + element.length * 5 + 5;
          });
        } else {
          firstPage.drawText(values.ruta.toUpperCase(), {
            x: 290,
            y: 459,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
    
        firstPage.drawText(values.destino.toUpperCase(), {
          x: 130,
          y: 382,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.eet, {
          x: 237,
          y: 382,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        firstPage.drawText(values.alternativa1.toUpperCase(), {
          x: 340,
          y: 382,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        if (values.alternativa2 !== null) {
          firstPage.drawText(values.alternativa2.toUpperCase(), {
            x: 441,
            y: 382,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
    
        //290 comienza el primer renglon de ruta
        //520 limite x del renglon de ruta del primer renglon
        //545 limite x de los renglones restantes
        //485 limite ultimo renglon x
        //72 comienzan del segundo al ultimo
    
        //459 1er renglon en y
        //449 2do renglon en y
        //439 3er renglon y
        //429 4to
        limite = 520;
        comienzo = 90;
        renglon = 338;
        actual = 1;
    
        if (values.otros.length > 65) {
          const primer = values.otros.split(" ");
    
          let x = comienzo;
          let y = renglon;
          primer.forEach((element) => {
            if (comienzo >= limite) {
              actual++;
              renglon = renglon - 10;
              comienzo = 72;
              if (actual > 2) {
                limite = 490;
              }
            }
            firstPage.drawText(element.toUpperCase(), {
              x: comienzo,
              y: renglon,
              size: 8,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
            comienzo = comienzo + element.length * 5 + 5;
          });
        } else {
          firstPage.drawText(values.otros.toUpperCase(), {
            x: 90,
            y: 338,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
    
        /* firstPage.drawText(values.otros.toUpperCase(), {
          x: 90,
          y: 338,
          size: 12,
          font: helveticaFont,
          color: rgb(0,0,0),
        }); */
        firstPage.drawText(values.autonomia, {
          x: 130,
          y: 247,
          size: 11,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
    
        if (values.sob.toUpperCase() === "TBN") {
          firstPage.drawText(values.sob.toUpperCase(), {
            x: 245,
            y: 247,
            size: 11,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        } else {
          if (values.sob.valueOf() < 10) {
            if (values.sob.length > 1) {
              firstPage.drawText(values.sob, {
                x: 267,
                y: 247,
                size: 11,
                font: helveticaFont,
                color: rgb(0, 0, 0),
              });
            } else {
              firstPage.drawText(values.sob, {
                x: 277,
                y: 247,
                size: 11,
                font: helveticaFont,
                color: rgb(0, 0, 0),
              });
            }
          } else if (values.sob.valueOf() >= 10 && values.sob.valueOf() <= 99) {
            firstPage.drawText(values.sob, {
              x: 267,
              y: 247,
              size: 11,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          } else if (values.sob.valueOf() > 99) {
            firstPage.drawText(values.sob, {
              x: 255,
              y: 247,
              size: 11,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
        }
        /* firstPage.drawText(values.sob, {
          x: 235,
          y: 247,
          size: 11,
          font: helveticaFont,
          color: rgb(0,0,0),
        }); */
    
        if (!values.radio.includes("U")) {
          firstPage.drawText("X", {
            x: 432,
            y: 242,
            size: 16,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
        if (!values.radio.includes("V")) {
          firstPage.drawText("X", {
            x: 460,
            y: 242,
            size: 16,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
        if (!values.radio.includes("E")) {
          firstPage.drawText("X", {
            x: 494,
            y: 242,
            size: 16,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
        if (values.supervivencia === null || values.supervivencia === '' || values.supervivencia.length === 0) {
          firstPage.drawText("X", {
            x: 128,
            y: 209,
            size: 16,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
    
        if (values.supervivencia !== null) {
          if (!values.supervivencia.includes("P")) {
            firstPage.drawText("X", {
              x: 160,
              y: 209,
              size: 16,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
          if (!values.supervivencia.includes("D")) {
            firstPage.drawText("X", {
              x: 200,
              y: 209,
              size: 16,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
    
          if (!values.supervivencia.includes("M")) {
            firstPage.drawText("X", {
              x: 237,
              y: 209,
              size: 16,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
          if (!values.supervivencia.includes("J")) {
            firstPage.drawText("X", {
              x: 285,
              y: 209,
              size: 16,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
        }
    
        if (values.chalecos === null || values.chalecos === ''||  values.chalecos.length === 0) {
          firstPage.drawText("X", {
            x: 333,
            y: 208,
            size: 16,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
    
        if (values.chalecos !== null) {
          if (!values.chalecos.includes("L")) {
            firstPage.drawText("X", {
              x: 370,
              y: 209,
              size: 16,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
          if (!values.chalecos.includes("F")) {
            firstPage.drawText("X", {
              x: 408,
              y: 209,
              size: 16,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
          if (!values.chalecos.includes("U")) {
            firstPage.drawText("X", {
              x: 447,
              y: 209,
              size: 16,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
          if (!values.chalecos.includes("V")) {
            firstPage.drawText("X", {
              x: 482,
              y: 209,
              size: 16,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
        }
    
        if (values.botes === null || values.botes === '') {
          firstPage.drawText("X", {
            x: 93,
            y: 174,
            size: 16,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
          firstPage.drawText("X", {
            x: 304,
            y: 174,
            size: 16,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        } else {
          if (values.botes.valueOf() < 10) {
            if (values.botes.length > 1) {
              firstPage.drawText(values.botes, {
                x: 140,
                y: 179,
                size: 11,
                font: helveticaFont,
                color: rgb(0, 0, 0),
              });
            } else {
              firstPage.drawText(values.botes, {
                x: 155,
                y: 179,
                size: 11,
                font: helveticaFont,
                color: rgb(0, 0, 0),
              });
            }
          } else {
            firstPage.drawText(values.botes, {
              x: 140,
              y: 179,
              size: 11,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
          
          if (values.capacidad.valueOf() < 10) {
            if (values.capacidad.length > 1) {
              firstPage.drawText(values.capacidad, {
                x: 241,
                y: 179,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
              });
            } else {
              firstPage.drawText(values.capacidad, {
                x: 250,
                y: 179,
                size: 10,
                font: helveticaFont,
                color: rgb(0, 0, 0),
              });
            }
          } else {
            firstPage.drawText(values.capacidad, {
              x: 241,
              y: 179,
              size: 10,
              font: helveticaFont,
              color: rgb(0, 0, 0),
            });
          }
    
          firstPage.drawText(values.colorBotes.toUpperCase(), {
            x: 345,
            y: 178,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
        firstPage.drawText(values.colorACFT.toUpperCase(), {
          x: 150,
          y: 151,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        if (values.remarks) {
          firstPage.drawText(values.remarks.toUpperCase(), {
            x: 150,
            y: 123,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
        }
        firstPage.drawText(values.pilot.toUpperCase(), {
          x: 150,
          y: 99,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        const pngImage = await pdfDoc.embedPng(values.firma);
        firstPage.drawImage(pngImage, {
          x: 385,
          y: 50,
          width: 50,
          height: 50,
        });
    
        const pdfBytes = await pdfDoc.save();
        const base64String = await pdfDoc.saveAsBase64();
    
        const base64DataUri = await pdfDoc.saveAsBase64({ dataUri: true });
        bytes = new Uint8Array(pdfBytes);
        let blob = new Blob([bytes], { type: "application/pdf" });
        docUrl = URL.createObjectURL(blob);
    
       
        setPdf(bytes);
        setBlob(docUrl);
        setBytes(base64String);
    
        setCallsign(values.matricula);
        console.log(docUrl);
        console.log(bytes);
        console.log(window.innerWidth);
        router.push("/pdf");
    
        //download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
    
        /* const docUrl = URL.createObjectURL(
          new Blob(pdfBytes, { type: "application/pdf" })
        );
        setPdfInfo(docUrl); */
      };
    
    const myForm = useForm();
    return ( 
        <>
        
            {autenticado ? (
              <Container maxW={"3xl"}>
                <>
                  { datos ? 
                    <>
                      {datosAcfts ? 
                          
                    
                          <Formiz connect={myForm} onValidSubmit={handleSubmit}>
                              <form noValidate onSubmit={myForm.submitStep}>
                                  <FormizStep
                                      name="step1" // Split the form with FormizStep
                                  >
                                      
                                      {acft ? 
                                          <>
                                              <Box>
                                                  <label>ACFT: </label>
                                                  <label>{acft.matricula}</label>
                                              </Box>
                                          </>
                                          :
                                          <FieldSelect
                                              name="matricula"
                                              label="Elegi una ACFT"
                                              placeholder="Elegi una Acft"
                                              required="Requerido"
                                              keepValue
                                              acfts={datosAcfts}
                                              
                                          />
      
                                      }
                                      <FieldSelect
                                          name="reglas"
                                          label="Reglas de Vuelo"
                                          placeholder="Elegir Reglas"
                                          required="Requerido"
                                          keepValue
                                          options={[
                                          { value: "I", label: "IFR" },
                                          { value: "V", label: "VFR" },
                                          { value: "Y", label: "Y" },
                                          { value: "Z", label: "Z" },
                                          ]}
                                      />
                                      <FieldSelect
                                          name="tipo"
                                          label="Tipo de Vuelo"
                                          placeholder="Elegir Tipo de vuelo"
                                          required="Requerido"
                                          keepValue
                                          options={[
                                          { value: "S", label: "S" },
                                          { value: "N", label: "N" },
                                          { value: "M", label: "M" },
                                          { value: "G", label: "G" },
                                          { value: "X", label: "X" },
                                          ]}
                                      />
                                      
                                      <FieldInput
                                          name="salida"
                                          label="Aeropuerto de salida"
                                          required="Obligatorio"
                                      />
                                      <FieldInput
                                          name="hora"
                                          label="Hora de salida"
                                          required="Obligatorio"
                                      />
                                      <FieldInput
                                          name="nivel"
                                          label="Nivel de vuelo"
                                          required="Obligatorio"
                                      />
                                      </FormizStep>
                                      <FormizStep name="step2">
                                      <FieldInput name="ruta" label="Ruta" required="Obligatorio" />
                                      <FieldInput
                                          name="destino"
                                          label="Destino"
                                          required="Obligatorio"
                                      />
                                      <FieldInput name="eet" label="Total EET" required="Obligatorio" />
                                      <FieldInput
                                          name="alternativa1"
                                          label="Alternativa"
                                          required="Obligatorio"
                                      />
                                      <FieldInput name="alternativa2" label="Alternativa 2" />
                                  </FormizStep>
                                  <FormizStep name="step3">
      
                                      <FieldInput
                                          name="otros"
                                          label="Otros Datos"
                                          required="Obligatorio"
                                      />
                                      <FieldInput
                                          name="autonomia"
                                          label="Autonomia"
                                          required="Obligatorio"
                                      />
                                      <FieldInput
                                          name="sob"
                                          label="Personas a bordo"
                                          required="Obligatorio"
                                      />
                                      <FieldInput name="remarks" label="Observaciones" />
      
                                      <SignatureCanvas
                                          name="firma"
                                          label="Firma"
                                          required="La firma es obligatoria"
                                      />
                                  </FormizStep>
                                  <Stack spacing="6" mt="8">
                                  <StepperWrapper title="Pasos">
                                      <DotsStepper />
                                  </StepperWrapper>
                                  </Stack>
                              </form>
                          </Formiz>
                          
                          
                        

                    
                      :
                      
                       <Stack
                       as={Box}
                       textAlign={'center'}
                       spacing={{ base: 8, md: 14 }}
                       py={{ base: 10, md: 22 }}>
                      
                         <Heading
                          fontWeight={600}
                          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                          textAlign='center'
                          
                          lineHeight={'110%'}>
                            <Text as={'span'} color={'gray.500'} >
                                Tenes que cargar por lo menos una ACFT para poder hacer un FPL autocompletado
                            </Text>
                       </Heading>
                          <Link
                          href={'/ACFTEdit'}
                          _hover={{
                            textDecoration: 'none',
                            
                          }}
                         
                          rounded={'md'}
                          passhref>
                            <Button
                            colorScheme={'green'}
                            bg={'gray.400'}
                            rounded={'full'}
                            px={6}
                            _hover={{
                                bg: 'gray.500',
                            }}>
                            Carga tus ACFTs
                            </Button>
                        </Link>
                      </Stack>
                        
                      }
                    </> 
                    :
                      <Stack
                      as={Box}
                      textAlign={'center'}
                      spacing={{ base: 8, md: 14 }}
                      py={{ base: 10, md: 22 }}>
                        
                        <Heading
                          fontWeight={600}
                          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                          textAlign='center'
                          
                          lineHeight={'110%'}>
                          <Text as={'span'} color={'gray.500'} >
                              Tenes que llenar tus datos para poder hacer un FPL autocompletado
                          </Text>
                        </Heading>
                        <Link
                        href={'/data'}
                        _hover={{
                          textDecoration: 'none',
                          
                        }}
                        
                        rounded={'md'}
                        passhref>
                          <Button
                          colorScheme={'green'}
                          bg={'gray.400'}
                          rounded={'full'}
                          px={6}
                          _hover={{
                              bg: 'gray.500',
                          }}>
                          Llena tus datos personales
                          </Button>
                      </Link>
                    </Stack>
                  }
                  
                </>
                </Container> 
            ):
            <Container maxW={'3xl'}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    textAlign='center'
                    
                    lineHeight={'110%'}>
                        {/* <h3>Hola{usuario.nombre},</h3> */}
                
                    <Text as={'span'} color={'gray.500'} >
                        Tenes que iniciar sesion para poder hacer un FPL autocompletado
                    </Text>
                </Heading>
            </Container>
            }
        </>
    );
}
 
export default Pre;