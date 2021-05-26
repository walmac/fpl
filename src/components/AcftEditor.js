import React, { useContext, useEffect } from "react";
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
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import authContext from "../../context/auth/authContext";
import { FplContext } from "../../context/Context";
import { Formiz, useForm } from "@formiz/core";
import { FieldInput } from "./FieldInput";
import { FieldSelect } from "./FieldSelect";
import { isNotEmptyString } from "@formiz/validations";

import { CheckEquipment } from "./CheckEquipment";
import { CheckTransponder } from "./CheckTransponder";
import { CheckInput } from "./CheckInput";
import { CheckJackets } from "./CheckJackets";
import { CheckSurvival } from "./CheckSurvival";
import Alert from "./Alert";
import WalkthroughPopover from '../ui/WalkthroughPopover';

const equipment = [
  { label: "STANDARD", value: "S" },
  { label: "No se lleva equipo o no funciona", value: "N" },
  { label: "GBAS", value: "A" },
  { label: "LPV (APV con SBAS)", value: "B" },
  { label: "LORAN C", value: "C" },
  { label: "DME", value: "D" },
  { label: "FMC WPR ACARS", value: "E1" },
  { label: "D-FIS ACARS", value: "E2" },
  { label: "PDC ACARS", value: "E3" },
  { label: "PDC ACARS", value: "F" },
  { label: "GNSS", value: "G" },
  { label: "HF RTF", value: "H" },
  { label: "Navegación inercial", value: "I" },
  { label: "CPDLC ATN VDL Modo 2 ", value: "J1" },
  { label: "CPDLC FANS 1/A HFDL", value: "J2" },
  { label: "CPDLC FANS 1/A VDL Modo A", value: "J3" },
  { label: "CPDLC FANS 1/A VDL Modo 2", value: "J4" },
  { label: "CPDLC FANS 1/A SATCOM (INMARSAT)", value: "J5" },
  { label: "CPDLC FANS 1/A SATCOM (MTSAT)", value: "J6" },
  { label: "CPDLC FANS 1/A SATCOM (Iridum)", value: "J7" },
  { label: "MLS", value: "K" },
  { label: "ILS", value: "L" },
  { label: "ATC SATVOICE (INMARSAT)", value: "M1" },
  { label: "ATC SATVOICE (MTSAT)", value: "M2" },
  { label: "ATC SATVOICE (Iridium)", value: "M3" },
  { label: "VOR", value: "O" },
  { label: "CPDLC RCP 400 ", value: "P1" },
  { label: "CPDLC RCP 240 ", value: "P2 " },
  { label: "SATVOICE RCP 400 ", value: "P3" },
  { label: "PBN aprobada ", value: "R" },
  { label: "TACAN", value: "T" },
  { label: "UHF RTF", value: "U" },
  { label: "VHF RTF", value: "V" },
  { label: "RVSM aprobada", value: "W" },
  { label: "MNPS aprobada", value: "X " },
  { label: "VHF 8,33 kHz", value: "Y" },
  { label: "Otros a especificar en campo 18", value: "Z" },
];

const trans = [
  { label: "SSR MODO A", value: "A" },
  { label: "SSR MODO C", value: "C" },
  { label: "SSR MODO E", value: "E" },
  { label: "SSR MODO H", value: "H" },
  { label: "SSR MODO I", value: "I" },
  { label: "SSR MODO L", value: "L" },
  { label: "SSR MODO P", value: "P" },
  { label: "SSR MODO S", value: "S" },
  { label: "SSR MODO X", value: "X" },
  { label: "ADS-B B1", value: "B1" },
  { label: "ADS-B B2", value: "B2" },
  { label: "ADS-B U1", value: "U1" },
  { label: "ADS-B U2", value: "U2" },
  { label: "ADS-B V1", value: "V1" },
  { label: "ADS-B V2", value: "V2" },
  { label: "ADS-C D1", value: "D1" },
  { label: "ADS-C G1", value: "G1" },
];

const AcftEditor = () => {
  const AuthContext = useContext(authContext);
  const {
    enviarDatosAcft,
    mensaje,
    setMensaje,
    setEmergenciaCheck,
    obtenerDatos,
    datos,
    obtenerDatosAcft,
    datosAcfts,
    cargaTerminada,
    limpiarCarga
  } = AuthContext;
  const router = useRouter();
  const formizForm = useForm();
  const { acft } = useContext(FplContext);
  const help = {
    text :'Pulsa el botón de rellenar para que se puedan visualizar los datos que ya tenés cargados.'
  }
  const help1 = {
    text :'Podés hacer tu cuenta, registrar tus datos y  tus aeronaves para hacer mas rápido el plan de vuelo. Sino podés hacer un plan de vuelo desde cero pulsando el boton FPL.'
  }  

  useEffect(() => {
    console.log(acft);
    formizForm.setFieldsValues({
      matricula: acft.matricula,
      tipo: acft.tipo,
      equipo: acft.equiposArr,
      transponder: acft.transponderArr,
      emergencia: acft.emergencia,
      supervivencia: acft.supervivencia,
      chalecos: acft.chalecos,
      estela: acft.estela,
      botes: acft.botes,
      capacidad: acft.capacidad,
      colorBotes: acft.colorBotes,
      colorACFT: acft.colorACFT,
      velocidad: acft.velocidad,
      equipoStr: acft.equipoStr,
      velocidad: acft.velocidad
    });
  }, [acft]);
  useEffect(() => {
    obtenerDatosAcft();
    obtenerDatos();
  }, []);

  useEffect(() => {
    console.log('entro por carga finalizada');
    console.log(cargaTerminada);
    if(cargaTerminada === true){
        setTimeout(() => {
          limpiarCarga();
          router.push('/acft');
    }, 3000);
    } 
  }, [cargaTerminada])
  const enviaDatos = (params) => {
    //console.log(params);
    let equipos = params.equipo;
    let transponder = params.transponder;

    let equipoStr = "";
    let equipoArr = [];
    let transponderArr = [];
    console.log(params);
    equipos.forEach((element) => {
      equipoStr = equipoStr + element.value;
      equipoArr.push(element.value);
    });
    equipoStr += "/";
    transponder.forEach((element) => {
      equipoStr = equipoStr + element.value;
      transponderArr.push(element.value);
    });
    console.log(equipoStr);
    console.log(transponderArr);
    console.log(equipoArr);
    params.equipoStr = equipoStr;
    params.equipoArr = equipoArr;
    params.transponderArr = transponderArr;

    if(  params.matricula === ''
      || params.tipo === ''
      || params.equiposArr === ''
      || params.transponderArr === ''
      || params.emergencia === ''      
      || params.estela === ''      
      || params.colorACFT === ''
      || params.velocidad === ''
      || params.equipoStr === ''
      || params.equipoArr === ''
      || params.velocidad === ''
      || params.transponderArr === ''
      || params.matricula === null
      || params.tipo === null
      || params.equiposArr === null
      || params.transponderArr === null
      || params.emergencia === null      
      || params.estela === null      
      || params.colorACFT === null
      || params.velocidad === null
      || params.equipoStr === null
      || params.equipoArr === null
      || params.velocidad === null
      || params.transponderArr === null){
        setMensaje('Verificar el llenado de los campos');
        return;
      }



    enviarDatosAcft(params);
   /*  setTimeout(() => {
      router.push('/acft')
    }, 2000); */
  };

  const rellenaDatos = () => {
    let equipoObj = [];
    acft.equipoArr.forEach((element) => {
      equipment.forEach((eq) => {
        if (eq.value === element) {
          equipoObj.push({ label: eq.label, value: eq.value });
        }
      });
    });
    let transponderObj = [];
    acft.transponderArr.forEach((element) => {
      trans.forEach((eq) => {
        if (eq.value === element) {
          transponderObj.push({ label: eq.label, value: eq.value });
        }
      });
    });

    formizForm.setFieldsValues({
      matricula: acft.matricula,
      tipo: acft.tipo,
      equipo: equipoObj,
      transponder: transponderObj,
      emergencia: acft.emergencia,
      supervivencia: acft.supervivencia,
      chalecos: acft.chalecos,
      estela: acft.estela,
      botes: acft.botes,
      capacidad: acft.capacidad,
      colorBotes: acft.colorBotes,
      colorACFT: acft.colorACFT,
      velocidad: acft.velocidad,
      equipoStr: acft.equipoStr,
    });
  };

  return (
    <>
      <Container maxW={"3xl"}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          textAlign="center"
        >
          
          {/* <h3>Hola{usuario.nombre},</h3> */}
          {acft ? (
            <Stack>
              <WalkthroughPopover props={help}/>
              <Text as={"span"} color={"gray.500"}>
                Edita tu ACFT
              </Text>
              <Button onClick={() => rellenaDatos()} mb="2"
               bg={'gray.500'}
               rounded={'full'}
               px={4}
               _hover={{
                   bg: 'gray.600',
               }}>
                Rellenar formulario con datos a editar
              </Button>
            </Stack>
          ) : (
            <Text as={"span"} color={"gray.500"}>
              Aca podés precargar datos de tus aeronaves para poder
              autocompletar el FPL
            </Text>
          )}
        </Heading>
        <Formiz connect={formizForm} onValidSubmit={enviaDatos} mt="2">
          <form noValidate onSubmit={formizForm.submit}>
            <FieldInput
              name="matricula"
              label="Matricula"
              validations={[
                {
                  rule: isNotEmptyString(),
                  message: "La matricula no puede ser vacio",
                },
              ]}
            />

            <FieldInput
              mt="2"
              name="tipo"
              label="Tipo de ACFT"
              validations={[
                {
                  rule: isNotEmptyString(),
                  message: "El tipo de  ACFT puede ser vacio",
                },
              ]}
            />
            <FieldSelect
              name="estela"
              label="Categoria estela turbulenta"
              placeholder="Estela turbulenta"
              keepValue
              options={[
                { value: "H", label: "PESADA - H" },
                { value: "M", label: "MEDIA - M" },
                { value: "L", label: "LIVIANA - L" },
              ]}
            />
            <CheckEquipment name="equipo" label="Equipo" />
            <CheckTransponder name="transponder" label="Transponder" />
            <FieldInput name="velocidad" label="Velocidad" />
            <CheckInput
              name="emergencia"
              label="Emergencia"
              radio={acft ? acft.emergencia : null}
            />
            <CheckJackets
              name="chalecos"
              label="Chalecos"
              jackets={acft ? acft.chalecos : null}
            />
            <CheckSurvival
              name="supervivencia"
              label="Equipo de supervivencia"
              survival={acft ? acft.supervivencia : null}
            />
            <FieldInput name="botes" label="Botes" />
            <FieldInput name="capacidad" label="Capacidad " />
            <FieldInput name="colorBotes" label="Color " />
            <FieldInput
              name="colorACFT"
              label="Color y marcas de la aeronave"
            />
            {mensaje && <Alert />}
            {acft ? (
              <Button mt="4" type="submit" disabled={!formizForm.isValid}
              bg={'gray.500'}
              rounded={'full'}
              px={4}
              _hover={{
                  bg: 'gray.600',
              }}>
                Actualizar Datos 
              </Button>
            ) : (
              <Button mt="4" type="submit" disabled={!formizForm.isValid}
              bg={'gray.500'}
              rounded={'full'}
              px={4}
              _hover={{
                  bg: 'gray.600',
              }}>
                Enviar Datos 
              </Button>
            )}
          </form>
        </Formiz>
      </Container>
    </>
  );
};

export default AcftEditor;
