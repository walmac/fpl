import React, {useContext} from 'react';
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
    Grid , 
    GridItem,  
    useColorModeValue,
    HStack,
  } from "@chakra-ui/react";
  import { FplContext } from '../../context/Context';
  import AuthContext from '../../context/auth/authContext';
  import {useRouter} from 'next/router';
  import Alert from '../components/Alert';
import { route } from 'next/dist/next-server/server/router';

const AcftContainer = ({props}) => {
    const router = useRouter();
    const { setAcft, setEmergenciaCheck } =useContext(FplContext);
    const {eliminarAcft, mensaje} = useContext(AuthContext);
    
    const {matricula, 
        equiposArr, 
        transponderArr, 
        emergencia, 
        supervivencia, 
        chalecos, 
        tipo, 
        estela, 
        botes,
        capacidad, 
        colorBotes, 
        colorACFT, 
        velocidad,
        equipoStr, 
        _id
    } = props;
        /* console.log(matricula); */

    const usarACFT = (params) => {
        console.log(params.target.id);
        setAcft(props);
        router.push('/pre');
    }
    const editarACFT = (params) => {
        console.log(params.target.id);
        setEmergenciaCheck(emergencia);
        setAcft(props);
        router.push('/ACFTEdit')
    }
    const eliminarACFT = (params) => {
        console.log(params);
        eliminarAcft(params);
    }
  
    
    return ( 
        <Container maxW={"3xl"}>
            {mensaje && <Alert />}
            <Accordion allowToggle>
                <Grid
               
                
                templateColumns="repeat(5, 1fr)"
                gap={0}>
                    <GridItem colSpan={5} mt='1' mb='1'>
                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    {matricula}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={2}>
                            <HStack>
                                <label>Tipo:</label>
                                <pre className={'pre'} className={'pre'}>{tipo}</pre>
                            </HStack>
                            <HStack>
                                <label>Estela:</label>
                                <pre className={'pre'}>{estela}</pre>
                            </HStack>
                            <HStack>
                                <label>Tipo:</label>
                                <pre className={'pre'}>{tipo}</pre>
                            </HStack>
                            <HStack>
                                <label>Equipo:</label>
                                <pre className={'pre'}>{equipoStr}</pre>
                            </HStack>
                            <HStack>
                                <label>Velocidad:</label>
                                <pre className={'pre'}>{velocidad}</pre>
                            </HStack>
                            <HStack>
                                <label>Emergencia:</label>
                                <pre className={'pre'}>{emergencia}</pre>
                            </HStack>
                            <HStack>
                                <label>Supervivencia:</label>
                                <pre className={'pre'}>{supervivencia}</pre>
                            </HStack>
                            <HStack>
                                <label>Chalecos:</label>
                                <pre className={'pre'}>{chalecos}</pre>
                            </HStack>
                            <HStack>
                                <label>Botes:</label>
                                <pre className={'pre'}>{botes}</pre>
                            </HStack>
                            <HStack>
                                <label>Capacidad:</label>
                                <pre className={'pre'}>{capacidad}</pre>
                            </HStack>
                            <HStack>
                                <label>Color:</label>
                                <pre className={'pre'}>{colorBotes}</pre>
                            </HStack>
                            <HStack>
                                <label>ColorACFT:</label>
                                <pre className={'pre'}>{colorACFT}</pre>
                            </HStack>
                            </AccordionPanel>
                        </AccordionItem>
                    </GridItem>
                    <GridItem  >
                        <Button id={matricula} onClick={(e) => usarACFT(e)}>
                                Usar 
                        </Button>
                    </GridItem>
                    <GridItem colStart={3} >
                        <Button  id={matricula + ' editar'}  onClick={(e) => editarACFT(e)}>
                                Editar 
                        </Button>
                    </GridItem>
                    <GridItem colEnd={6}>
                        <Button  id={_id}textColor='red' onClick={(e) => eliminarACFT(e.target.id)}>
                                Eliminar 
                        </Button>
                    </GridItem>
                    

                </Grid>
                </Accordion>
            

        </Container>
     );
}
 
export default AcftContainer;