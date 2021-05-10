import React, { useRef, useState, useContext } from "react";
import {useRouter} from 'next/router';
import { Helmet } from "react-helmet";
import { Formiz, useForm, FormizStep } from "@formiz/core";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

import {FplContext} from '../context/Context';

import { Stack, useColorMode, Flex,Grid,Box, Switch , Button} from "@chakra-ui/react";
import { ExternalLinkIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";


import { FieldSelect } from "../src/components/FieldSelect";
import { FieldSlider } from "../src/components/FieldSlider";
import { FieldInput } from "../src/components/FieldInput";

import { CheckInput } from "../src/components/CheckInput";
import { CheckJackets } from "../src/components/CheckJackets";
import { CheckSurvival } from "../src/components/CheckSurvival";
import { StepperWrapper, DotsStepper } from "../src/components/Steppers";
import SignatureCanvas from '../src/components/SignatureCanvas';


export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  const {setPdf, setCallsign} = useContext(FplContext);
  const myForm = useForm();
  const router = useRouter();
  
  const viewer = useRef(null);
  
  let docUrl;
  let bytes;
  let fpl ={
    "numero": 1,
    "alternativa2": null,
    "Matricula": "lvctt",
    "reglas": "I",
    "tipo": "G",
    "tipoACFT": "lj60",
    "estela": "L",
    "equipo": "sg/c",
    "salida": "sadf",
    "hora": "1200",
    "velocidad": "n100",
    "nivel": "f100",
    "ruta": "SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH",
    "destino": "sawh",
    "eet": "0200",
    "alternativa1": "savt",
    "otros": "SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH SADF VALOS W22 BCA W18 TRE ANDEX W18 GAL W42 MUBES W63 LOKEN SAWH",
    "autonomia": "0500",
    "sob": "3",
    "radio": [
      "E"
    ],
    "chalecos": [
      "V"
    ],
    "supervivencia": [
      "M"
    ],
    "botes": "3",
    "capacidad": "2",
    "colorBotes": "amarillo",
    "colorACFT": "blanco",
    "remarks": "goroo",
    "pilot": "yo",
    "firma": "data:image/png;base64,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"
  }

  
  

  const handleSubmit = (values) => {
    console.log(values);
    createFPL(values);

    
    const stepWithError = myForm.getFieldStepName("name");
    if (stepWithError) {
      myForm.goToStep(stepWithError);
    }
  };

  const createFPL = async (values) => {

    
    
      
    const existingPdfBytes = await fetch('/plan.pdf').then(res => res.arrayBuffer())
      

     const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Get the width and height of the first page
    const { width, height } = firstPage.getSize();
    console.log(width);
    console.log(height);
    
    
    firstPage.drawText(values.Matricula.toUpperCase(), {
      x: 182,
      y: 590,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.reglas, {
      x: 337,
      y: 589,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.tipo, {
      x: 463,
      y: 590,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.numero.toString(), {
      x: 120,
      y: 543,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.tipoACFT.toUpperCase(), {
      x: 175,
      y: 543,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.estela, {
      x: 318,
      y: 544,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.equipo.toUpperCase(), {
      x: 422,
      y: 544,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.salida.toUpperCase(), {
      x: 197,
      y: 503,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.hora, {
      x: 340,
      y: 503,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.velocidad.toUpperCase(), {
      x: 100,
      y: 462,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.nivel.toUpperCase(), {
      x: 190,
      y: 460,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
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
    let actual=1;


    if(values.ruta.length > 48){
      const primer = values.ruta.split(' ');
       /*firstPage.drawText('X', {
        x: 70,
        y: 419,
        size: 8,
        font: helveticaFont,
        color: rgb(0,0,0),
      });  */
      let x = comienzo;
      let y = renglon;
       primer.forEach(element => {
        if(comienzo >= limite){
          actual++;
          renglon = renglon - 10;
          comienzo = 72;

        }
        firstPage.drawText(element.toUpperCase(), {
          x: comienzo,
          y: renglon,
          size: 8,
          font: helveticaFont,
          color: rgb(0,0,0),
        });
        comienzo = comienzo + element.length * 5 + 5;

        
      }); 
      

    }else{
      firstPage.drawText(values.ruta.toUpperCase(), {
        x: 290,
        y: 459,
        size: 12,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
    }
    
    firstPage.drawText(values.destino.toUpperCase(), {
      x: 130,
      y: 382,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.eet, {
      x: 235,
      y: 382,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.alternativa1.toUpperCase(), {
      x: 350,
      y: 382,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    if(values.alternativa2 !== null ){
      firstPage.drawText(values.alternativa2.toUpperCase(), {
        x:440,
        y: 382,
        size: 12,
        font: helveticaFont,
        color: rgb(0,0,0),
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
    actual=1;


    if(values.otros.length > 65){
      const primer = values.ruta.split(' ');
      
      let x = comienzo;
      let y = renglon;
       primer.forEach(element => {
        if(comienzo >= limite){
          
          actual++;
          renglon = renglon - 10;
          comienzo = 72;
          if(actual > 2){
            limite =490;
          }

        }
        firstPage.drawText(element.toUpperCase(), {
          x: comienzo,
          y: renglon,
          size: 8,
          font: helveticaFont,
          color: rgb(0,0,0),
        });
        comienzo = comienzo + element.length * 5 + 5;

        
      }); 
      

    }else{
      firstPage.drawText(values.ruta.toUpperCase(), {
        x: 90,
        y: 338,
        size: 12,
        font: helveticaFont,
        color: rgb(0,0,0),
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
      x: 110,
      y: 247,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(values.autonomia, {
      x: 235,
      y: 247,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    if(!values.radio.includes('U')){
      firstPage.drawText('X' ,{
        x: 430,
        y: 242,
        size: 16,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
    }
    if(!values.radio.includes('V')){
      firstPage.drawText('X' ,{
        x: 460,
        y: 242,
        size: 16,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
    }
    if(!values.radio.includes('E')){
      firstPage.drawText('X' ,{
        x: 493,
        y: 242,
        size: 16,
        font: helveticaFont,
        color: rgb(0,0,0),
        
      });
    }
    if(values.supervivencia === 'null'){
      firstPage.drawText('X' ,{
        x: 130,
        y: 208,
        size: 16,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
    }
    
    if(!values.supervivencia === null){
      if(!values.supervivencia.includes('P')){
        firstPage.drawText('X' ,{
          x: 160,
          y: 208,
          size: 16,
          font: helveticaFont,
          color: rgb(0,0,0),
        });
      }
      if(!values.supervivencia.includes('D')){    
        firstPage.drawText('X' ,{
          x: 200,
          y: 208,
          size: 16,
          font: helveticaFont,
          color: rgb(0,0,0),
        });
      }
     
      
      
      if(!values.supervivencia.includes('M')){
        firstPage.drawText('X' ,{
          x: 240,
          y: 208,
          size: 16,
          font: helveticaFont,
          color: rgb(0,0,0),
        });
      }
      if(!values.supervivencia.includes('J')){
        firstPage.drawText('X' ,{
          x: 285,
          y: 208,
          size: 16,
          font: helveticaFont,
          color: rgb(0,0,0),
        });
      }
    }
    if(values.chalecos === null){
      firstPage.drawText('X' ,{
        x: 335,
        y: 208,
        size: 16,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
    }
    if(values.chalecos !== null){
      if(!values.chalecos.includes('L')){
        firstPage.drawText('X' ,{
          x: 370,
          y: 208,
          size: 16,
          font: helveticaFont,
          color: rgb(0,0,0),
        });
      }
      if(!values.chalecos.includes('F')){
        firstPage.drawText('X' ,{
          x: 410,
          y: 208,
          size: 16,
          font: helveticaFont,
          color: rgb(0,0,0),
        });
      }
      if(!values.chalecos.includes('U')){
        firstPage.drawText('X' ,{
          x: 450,
          y: 208,
          size: 16,
          font: helveticaFont,
          color: rgb(0,0,0),
        });
      }
      if(!values.chalecos.includes('V')){
        firstPage.drawText('X' ,{
          x: 480,
          y: 208,
          size: 16,
          font: helveticaFont,
          color: rgb(0,0,0),
        });
      }
    }
    if(values.botes === null){
      firstPage.drawText('X' ,{
        x: 95,
        y: 175,
        size: 16,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
      firstPage.drawText('X' ,{
        x: 305,
        y: 175,
        size: 16,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
    }else{
      firstPage.drawText(values.botes ,{
        x: 130,
        y: 179,
        size: 12,
        font: helveticaFont,
        color: rgb(0,0,0),
      });

      firstPage.drawText(values.capacidad ,{
        x: 210,
        y: 179,
        size: 10,
        font: helveticaFont,
        color: rgb(0,0,0),
      });

      firstPage.drawText(values.colorBotes.toUpperCase() ,{
        x: 345,
        y: 179,
        size: 10,
        font: helveticaFont,
        color: rgb(0,0,0),
      });

    }
    firstPage.drawText(values.colorACFT.toUpperCase() ,{
      x: 150,
      y: 151,
      size: 10,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    if(values.remarks){
      firstPage.drawText(values.remarks.toUpperCase() ,{
        x: 150,
        y: 123,
        size: 10,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
    }
    firstPage.drawText(values.pilot.toUpperCase() ,{
      x: 150,
      y: 99,
      size: 10,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    const pngImage = await pdfDoc.embedPng(values.firma);
    firstPage.drawImage(pngImage, {
      x: 100,
      y: 40,
      width:50,
      height: 50,
    })
    
    
    

    const pdfBytes = await pdfDoc.save();
     bytes = new Uint8Array(pdfBytes);
    let blob = new Blob([bytes], { type: "application/pdf" });
    docUrl = URL.createObjectURL(blob);
    

    setPdf(bytes);
    setCallsign(values.Matricula);
    console.log(docUrl);
    console.log(bytes);
    console.log(window.innerWidth);
    router.push('/pdf');
    
    
    //download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf"); 

    /* const docUrl = URL.createObjectURL(
      new Blob(pdfBytes, { type: "application/pdf" })
    );
    setPdfInfo(docUrl); */
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FPL Digital</title>
        <script src="https://unpkg.com/downloadjs@1.4.7"></script>
      </Helmet>
      <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
        <Box>
        
        </Box>
        <Box>
          <h1 style={{textAlign: 'center'}}>FPL DIGITAL</h1>
        </Box>
        <Box style={{textAlign:'end'}}>
          <Stack direction="row" align="center" mb="0" mt="0">
              <MoonIcon
                size="14px"
                opacity={colorMode !== "dark" ? "0.3" : undefined}
              />
              <Switch
                size="md"
                isChecked={colorMode === "light"}
                onChange={toggleColorMode}
                colorScheme="none"
              />
              <SunIcon
                size="14px"
                opacity={colorMode !== "light" ? "0.3" : undefined}
              />
            </Stack>

        </Box>
        

      </Grid>
      <Button onClick={() => createFPL(fpl)}>
        FPL
      </Button>
      
     {!bytes ? (
        <Formiz connect={myForm} onValidSubmit={handleSubmit}>
        <form noValidate onSubmit={myForm.submitStep}>
          <FormizStep
            name="step1" // Split the form with FormizStep
          >
            
            
            <FieldInput
              name="Matricula"
              label="Matricula"
              required="La matricula es obligatoria"
              
            />
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
            <FieldSlider
              name="numero"
              label="Numero de ACFT"
              required="Tiene que ser almenos 1"
              defaultValue={1}
              validations={[
                {
                  rule: (val) => val !== 0,
                  message: "Tiene que ser al menos una ACFT",
                },
              ]}
            />
            <FieldInput
              name="tipoACFT"
              label="Tipo de ACFT"
              required="El tipo es obligatorio"
            />
          </FormizStep>
          <FormizStep name="step2">
            <FieldSelect
              name="estela"
              label="Categoria estela turbulenta"
              placeholder="Estela turbulenta"
              required="Requerido"
              keepValue
              options={[
                { value: "H", label: "PESADA - H" },
                { value: "M", label: "MEDIA - M" },
                { value: "L", label: "LIVIANA - L" },
              ]}
            />

            <FieldInput
              name="equipo"
              label="Equipo de la ACFT"
              required="El equipo es obligatorio"
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
              name="velocidad"
              label="Velocidad crucero"
              required="Obligatorio"
            />
          </FormizStep>
          <FormizStep name="step3">
            <FieldInput
              name="nivel"
              label="Nivel de vuelo"
              required="Obligatorio"
            />
            <FieldInput name="ruta" label="Ruta" required="Obligatorio" />
            <FieldInput name="destino" label="Destino" required="Obligatorio" />
            <FieldInput name="eet" label="Total EET" required="Obligatorio" />
          </FormizStep>
          <FormizStep name="step4">
            <FieldInput
              name="alternativa1"
              label="Alternativa"
              required="Obligatorio"
            />
            <FieldInput name="alternativa2" label="Alternativa" />
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
            <CheckInput name="radio" label="Equipo de emergencia" />
          </FormizStep>
          <FormizStep name="step5">
            <CheckJackets name="chalecos" label="Chalecos" />
            <CheckSurvival
              name="supervivencia"
              label="Equipo de supervivencia"
            />
            <FieldInput name="botes" label="Botes" />
            <FieldInput name="capacidad" label="Capacidad " />
            <FieldInput name="colorBotes" label="Color " />
            <FieldInput
              name="colorACFT"
              label="Color y marcas de la aeronave"
              required="Obligatorio"
            />
            
          
         
            <FieldInput name="remarks" label="Observaciones" />
            <FieldInput name="pilot" label="piloto al mando" required="Obligatorio" />
            <SignatureCanvas name="firma" label="Firma"  required="La firma es obligatoria"/>
            </FormizStep>

          <Stack spacing="6" mt="8">
            <StepperWrapper title="Pasos">
              <DotsStepper />
            </StepperWrapper>
          </Stack>
          
        </form>

        
      </Formiz>
     ):
      
      <>
        <h1>anduvo?</h1>
      </>
     
     }
      
      
     
    </>
  );
}
