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
import { Formiz, useForm  } from "@formiz/core";
import { FieldInput } from "../components/FieldInput";
import { isEmail,isNotEmptyString, isMinLength } from "@formiz/validations";
const axios = require('axios').default;


export default function SimpleCard({props}) {
  console.log(props);
  const myForm = useForm();
  
  
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      if(props){
        const res = await axios({
          method: "post",
          url:"http://localhost:4000/api/auth",
          data:{
            email: values.email,
            password: values.password
          }
        });
        console.log(res.data);
      }else{
        const res = await axios({
          method: "post",
          url:"http://localhost:4000/api/usuarios",
          data:{
            email: values.email,
            password: values.password
          }
        });
        console.log(res.data);
  
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  
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
                acá podes <Link href={'/signup'} color={"blue.400"}props={false }>crear una cuenta </Link>
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
              <FormControl id="email">
                
                <FieldInput
                name="email"
                label="Email"
                validations={[
                  {
                    rule: isNotEmptyString(),
                    message: 'El mail no puede estar vacio',
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
                    message: 'La contraseña no puede ser vacia',
                  },
                  {
                    rule: isMinLength(4),
                    message: 'Debe tener al menos 6 caracteres',
                  },
                  
                ]}
              />
              {!props ? <FieldInput
                name="confirmpassword"
                label="Confirmar contraseña"
                type="password"
                validations={[
                  {
                    rule: (value) => myForm.values.password === value,
                    deps: [myForm.values.password],
                    message: 'Las contraseñas no concuerdan',
                  }
                ]}
              />: null}
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
                 type='submit'
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  disabled={!myForm.isValid}
                >
                  Acceder
                </Button>
              ) : (
                <Button
                type='submit'
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
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
