import { ReactNode, useState, useContext, useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import authContext from "../../context/auth/authContext";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useRouter } from "next/router";

import Fpl from "../../pages";

const Links = ["Mis Datos", "Mis ACFT"];

const urls = {
  "Mis Datos": {
    id: "/signin",
  },
  "Mis ACFT": {
    id: "/test",
  },
};

/* const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
); */

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const AuthContext = useContext(authContext);
  const { autenticado, usuarioAutenticado, cerrarSesion} = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, [])
  const getUrl = (name) => {};
  const goToFpl = () => {
    console.log("pulso");

    router.push("/fpl");
  };

  const cierraSesion = () => {
    cerrarSesion();
    //console.log('cierra sesion');
    setTimeout(() => {
      router.push("/");
    }, 2000);
    
    
    
  }
  

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link
              href={"/"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
              rounded={"md"}
            >
              <Box>FPL DIGITAL</Box>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {autenticado ? 
                <HStack>
                  <Link
                      px={2}
                      py={1}
                      rounded={"md"}
                      _hover={{
                        textDecoration: "none",
                        bg: useColorModeValue("gray.200", "gray.700"),
                      }}
                      href={"/data"}
                    >
                      Mis Datos
                    </Link>
                    <Link
                      px={2}
                      py={1}
                      rounded={"md"}
                      _hover={{
                        textDecoration: "none",
                        bg: useColorModeValue("gray.200", "gray.700"),
                      }}
                      href={"/acft"}
                    >
                      Mis ACFTs
                    </Link>
                    
                </HStack>
                :
                  <HStack>
                    <Link
                        px={2}
                        py={1}
                        rounded={"md"}
                        _hover={{
                          textDecoration: "none",
                          bg: useColorModeValue("gray.200", "gray.700"),
                        }}
                        href={"/signin"}
                      >
                        Acceder
                      </Link>
                      <Link
                        px={2}
                        py={1}
                        rounded={"md"}
                        _hover={{
                          textDecoration: "none",
                          bg: useColorModeValue("gray.200", "gray.700"),
                        }}
                        href={"/signup"}
                      >
                        Crear Cuenta
                      </Link>
                  </HStack>
                }
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Link
              href={"/fpl"}
              _hover={{
                textDecoration: "none",
              }}
              rounded={"md"}
            >
              <Button
                variant={"solid"}
                /* colorScheme={'blend'} */
                bg="gray.500"
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
                target="_blank"
              >
                FPL
              </Button>
            </Link>
            {autenticado ? 
              <Button
                variant={"solid"}
                /* colorScheme={'blend'} */
                bg="gray.500"
                size={"sm"}
                mr={4}
                rightIcon={<CloseIcon />}
                target="_blank"
                onClick={ () => cierraSesion()}
                display={{ base: "none", md: "flex" }}
              >
                CERRAR SESION
              </Button>
              : null
            }
            <Box style={{ textAlign: "end" }}>
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
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {autenticado ? 
                <Stack>
                  <Link
                      px={2}
                      py={1}
                      rounded={"md"}
                      _hover={{
                        textDecoration: "none",
                        bg: useColorModeValue("gray.200", "gray.700"),
                      }}
                      href={"/data"}
                    >
                      Mis Datos
                    </Link>
                    <Link
                      px={2}
                      py={1}
                      rounded={"md"}
                      _hover={{
                        textDecoration: "none",
                        bg: useColorModeValue("gray.200", "gray.700"),
                      }}
                      href={"/acft"}
                    >
                      Mis ACFTs
                    </Link>
                    <Link
                        px={2}
                        py={1}
                        rounded={"md"}
                        _hover={{
                          textDecoration: "none",
                          bg: useColorModeValue("gray.200", "gray.700"),
                        }}
                        href={"#"}
                        onClick={ () => cierraSesion()}
                      >
                        Cerrar Sesión
                      </Link>
                </Stack>
                :
                  <Stack>
                    <Link
                        px={2}
                        py={1}
                        rounded={"md"}
                        _hover={{
                          textDecoration: "none",
                          bg: useColorModeValue("gray.200", "gray.700"),
                        }}
                        href={"/signin"}
                      >
                        Acceder
                      </Link>
                      <Link
                        px={2}
                        py={1}
                        rounded={"md"}
                        _hover={{
                          textDecoration: "none",
                          bg: useColorModeValue("gray.200", "gray.700"),
                        }}
                        href={"/signup"}
                      >
                        Crear Cuenta
                      </Link>
                      
                  </Stack>
                }
              
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
