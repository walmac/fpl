import React, { useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Formiz, useForm, FormizStep } from "@formiz/core";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

import { Stack, useColorMode, Flex, Switch , Button} from "@chakra-ui/react";
import { ExternalLinkIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import { FieldSelect } from "../src/components/FieldSelect";
import { FieldSlider } from "../src/components/FieldSlider";
import { FieldInput } from "../src/components/FieldInput";

import { CheckInput } from "../src/components/CheckInput";
import { CheckJackets } from "../src/components/CheckJackets";
import { CheckSurvival } from "../src/components/CheckSurvival";
import { StepperWrapper, DotsStepper } from "../src/components/Steppers";
import SignatureCanvas from '../src/components/SignatureCanvas';
const axios = require('axios').default;

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const myForm = useForm();
  let fpl;
  const viewer = useRef(null);
  const [pdfInfo, setPdfInfo] = useState();

  const handleSubmit = (values) => {
    console.log(values);
    createFPL(values);

    myForm.invalidateFields({
      name: "You can display an error after an API call",
    });
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
    firstPage.drawText(values.ruta.toUpperCase(), {
      x: 300,
      y: 459,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
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
    if(typeof(values.alternativa2) !== null ){
      firstPage.drawText(values.alternativa2.toUpperCase(), {
        x:440,
        y: 382,
        size: 12,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
    }
    firstPage.drawText(values.otros.toUpperCase(), {
      x: 100,
      y: 338,
      size: 12,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
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
    if(values.supervivencia.length === 0){
      firstPage.drawText('X' ,{
        x: 130,
        y: 208,
        size: 16,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
    }
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
    if(values.chalecos.length === 0){
      firstPage.drawText('X' ,{
        x: 335,
        y: 208,
        size: 16,
        font: helveticaFont,
        color: rgb(0,0,0),
      });
    }
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
    if(values.botes.length === 0){
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
    var bytes = new Uint8Array(pdfBytes);
    var blob = new Blob([bytes], { type: "application/pdf" });
    const docUrl = URL.createObjectURL(blob);
    
    console.log(fpl);
    download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf"); 

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
      
      
      <Formiz connect={myForm} onValidSubmit={handleSubmit}>
        <form noValidate onSubmit={myForm.submitStep}>
          <FormizStep
            name="step1" // Split the form with FormizStep
          >
            
            
            <FieldInput
              name="Matricula"
              label="Matricula"
              required="La matricula es obligatoria"
              htmlFor="matricula"
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

        <Stack direction="row" align="center" mb="1" mt="5">
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
      </Formiz>
      
     
    </>
  );
}
