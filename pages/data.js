import React,{useContext} from 'react';
import authContext from "../context/auth/authContext";
import PilotData from '../src/ui/PilotData';
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


const Data = () => {
    const AuthContext = useContext(authContext);
    const { autenticado, usuario} = AuthContext;

    return ( 
        <>
            {autenticado ? (
                <>
                    
                    
                    <PilotData />
                </>
            ):
            <Container maxW={'3xl'}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}>
                        {/* <h3>Hola{usuario.nombre},</h3> */}
                
                    <Text as={'span'} color={'gray.500'}>
                        Tenes que iniciar sesion para poder editar tus datos
                    </Text>
                </Heading>
            </Container>
            }
        </>

     );
}
 
export default Data;