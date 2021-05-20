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
  useColorModeValue,
} from "@chakra-ui/react";
import authContext from "../../context/auth/authContext";
import { Formiz, useForm } from "@formiz/core";
import { FieldInput } from "../components/FieldInput";
import { isEmail, isNotEmptyString, isMinLength } from "@formiz/validations";
import Alerta from '../components/Alert'
import { useRouter } from 'next/router'



export default function SimpleCard({ props }) {
  const AuthContext = useContext(authContext);
  const { autenticado, mensaje, iniciarSesion, registrarUsuario} = AuthContext;
  const myForm = useForm();
  const router = useRouter();

  useEffect(() => {
    if(autenticado){
      router.push('/');
    }
  }, [autenticado])
  useEffect(() => {
    if(mensaje === 'Usuario creado correctamente'){
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
      
    }
  }, [mensaje])

  const handleSubmit = async (values) => {
    try {
      if (props) {
        iniciarSesion(values);
      } else {
        console.log(values);
        registrarUsuario(values);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          {props ? (
            <>
              <Heading fontSize={"4xl"}>Ingresa a tu cuenta</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                acá podes{" "}
                <Link href={"/signup"} color={"blue.400"} props={false}>
                  crear una cuenta{" "}
                </Link>
              </Text>
            </>
          ) : (
            <Heading fontSize={"4xl"}>Crea tu cuenta</Heading>
          )}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Formiz connect={myForm} onValidSubmit={handleSubmit}>
              <form noValidate onSubmit={myForm.submit}>
                {!props ?
                  <FormControl id="nombre">
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
                  </FormControl>
                : null}
                <FormControl id="email">
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
                </FormControl>
                <FormControl id="password">
                  <FieldInput
                    name="password"
                    label="Contraseña"
                    type="password"
                    validations={[
                      {
                        rule: isNotEmptyString(),
                        message: "La contraseña no puede ser vacia",
                      },
                      {
                        rule: isMinLength(4),
                        message: "Debe tener al menos 6 caracteres",
                      },
                    ]}
                  />
                  {!props ? (
                    <Stack>
                        <FieldInput
                        name="confirmpassword"
                        label="Confirmar contraseña"
                        type="password"
                        validations={[
                          {
                            rule: (value) => myForm.values.password === value,
                            deps: [myForm.values.password],
                            message: "Las contraseñas no concuerdan",
                          },
                        ]}
                      />
                    </Stack>
                    
                  ) : null}
                  {mensaje && <Alerta/>}
                </FormControl>

                <Stack spacing={4}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    {/* <Checkbox>Recordarme</Checkbox>
                 <Link color={'blue.400'}>Te olvidaste la contraseña?</Link>  */}
                  </Stack>
                  {props ? (
                    <Button
                      type="submit"
                      bg={"gray.500"}
                      color={"white"}
                      _hover={{
                        bg: "gray.600",
                      }}
                      disabled={!myForm.isValid}
                    >
                      Acceder
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      bg={"gray.500"}
                      color={"white"}
                      _hover={{
                        bg: "gray.600",
                      }}
                      disabled={!myForm.isValid}
                    >
                      Crear
                    </Button>
                  )}
                </Stack>
              </form>
            </Formiz>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
