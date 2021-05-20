import React,{useContext, useEffect} from 'react';
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
import authContext from "../context/auth/authContext";
import AcftContainer from "../src/components/AcftContainer";
import {useRouter} from 'next/router';


const ACFT = () => {
    const AuthContext = useContext(authContext);
    const {  mensaje , obtenerDatosAcft, datosAcfts} = AuthContext;
    const router= useRouter();
    useEffect(() => {
        
        obtenerDatosAcft();
    }, [])

    const nuevaACFT = (params) => {
        router.push('/ACFTEdit')
    }
    

    
    
    return ( 
        <>
            <Container maxW={"3xl"}>
                
            {datosAcfts ? 
                <>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                    lineHeight={"110%"}
                    textAlign='center'
                    >
                    <Text as={"span"} color={"gray.500"}>
                        Tus ACFTs
                    </Text>
                </Heading>
                <Button onClick={() => nuevaACFT()} mb='6'>
                                Nueva ACFT
                        </Button>
                
                 {datosAcfts.map ( acft =>{
                     return (
                            <AcftContainer props={acft} key={acft._id}/>
                        )
                 })} 
                

                    
                </>:
                <>
                 <Heading
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                    lineHeight={"110%"}
                    textAlign='center'
                    >
                    <Text as={"span"} color={"gray.500"}>
                        Aca podés precargar datos de tus aeronaves para poder autocompletar el FPL
                    </Text>
                </Heading>
                </>
            }
                {/*  <Heading
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                    lineHeight={"110%"}
                    textAlign='center'
                    > */}
            {/* <h3>Hola{usuario.nombre},</h3> */}

            {/*   <Text as={"span"} color={"gray.500"}>
                Aca podés precargar datos de tus aeronaves para poder autocompletar el FPL
            </Text>
            </Heading>
            <Formiz connect={formizForm} onValidSubmit={enviaDatos}  >
            <form noValidate onSubmit={formizForm.submit}>
                <FieldInput
                name="matricula"
                label="Matricula"
                validations={[
                    {
                    rule: isNotEmptyString(),
                    message: "La matricula no puede ser vacio",
                    }
                ]}
                />

                <FieldInput
                name="tipo"
                label="Tipo de ACFT"
                validations={[
                    {
                    rule: isNotEmptyString(),
                    message: "El tipo de  ACFT puede ser vacio",
                    }
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
                <CheckEquipment name='equipo' label="Equipo"/>
                <CheckTransponder name="transponder" label="Transponder" />
                <FieldInput name="velocidad" label="Velocidad" />
                <CheckInput name="emergencia" label="Emergencia"/>
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
                    
                />
                { mensaje && <Alert />}
                <Button mt="10" type="submit" disabled={!formizForm.isValid}>
                        Enviar Datos
                </Button>
                

                
            
                    
                

                
                
            </form>
            </Formiz> */}
        
      </Container>
        </>
     );
}
 
export default ACFT;