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
import authContext from "../../context/auth/authContext";
import { Formiz, useForm } from "@formiz/core";
import { FieldInput } from "../components/FieldInput";
import { isNotEmptyString } from "@formiz/validations";
import {useRouter} from 'next/router';

import Alerta from '../components/Alert'

const PilotData = () => {
  const AuthContext = useContext(authContext);
  const { autenticado, mensaje, usuario, agregaDatos, setMensaje, obtenerDatos, datos } =AuthContext;
  const router = useRouter();
  const formizForm= useForm();
  let initial = '';
  useEffect(() => {
    obtenerDatos();
     
  }, [])
  useEffect(() => {
    
     initial = datos;
     if(initial !== null){
        console.log(initial);

        formizForm.setFieldsValues({
            nombre:initial.nombre,
            tipo: initial.tipo,
            licencia : initial.licencia
        });
        
     }
  }, [datos])

  const enviaDatos = async (values) => {
      if(values.nombre === '' || values.licencia === '' || values.tipo === ''){
         setMensaje('Los campos no pueden estar vacios')
      }
    agregaDatos(values);
    setTimeout(() => {
      router.push('/ACFTEdit');
    }, 2000);
    

  };

  return (
    <>
      <Container maxW={"3xl"}>
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          textAlign='center'
        >
          {/* <h3>Hola{usuario.nombre},</h3> */}
          {datos ?  
            <Text as={"span"} color={"gray.500"}>
              Actualiza tus datos
            </Text>
          : 
            <Text as={"span"} color={"gray.500"}>
              Llena tus datos y luego agregá una ACFT para poder autocompletar el fpl
            </Text>
          
          }

          
        </Heading>
        <Formiz connect={formizForm} onValidSubmit={enviaDatos}  initialValues={initial !== '' ? initial: null}>
          <form noValidate onSubmit={formizForm.submit}>
            <FieldInput
              name="nombre"
              label="Nombre"
              validations={[
                {
                  rule: isNotEmptyString(),
                  message: "El nombre no puede ser vacio",
                }
              ]}
            />

            <FieldInput
              name="tipo"
              label="Tipo de licencia"
              validations={[
                {
                  rule: isNotEmptyString(),
                  message: "El tipo de  licencia no puede ser vacio",
                }
              ]}
            />

            <FieldInput
              name="licencia"
              label="Numero de licencia"
              validations={[
                {
                  rule: isNotEmptyString(),
                  message: "La licencia no puede ser vacia",
                }
              ]}
            />
           
                {mensaje && <Alerta/>}
            

            
            { datos ? 
                <Button mt="10" type="submit" disabled={!formizForm.isValid} bg={'gray.500'}
                rounded={'full'}
                px={4}
                _hover={{
                    bg: 'gray.600',
                }}>
                    Actualizar Datos e ir auto completar FPL
                </Button>:
                <Button mt="10" type="submit" disabled={!formizForm.isValid}
                bg={'gray.500'}
                rounded={'full'}
                px={4}
                _hover={{
                    bg: 'gray.600',
                }}>
                Enviar Datos
            </Button>
                }
          </form>
        </Formiz>
        
      </Container>
    </>
  );
};

export default PilotData;
