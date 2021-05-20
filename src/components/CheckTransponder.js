import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  VStack,
  Grid,
  Stack,
} from "@chakra-ui/react";
import {
  Checkbox,
  CheckboxGroup,
  HStack,
  useCheckboxGroup,
  
} from "@chakra-ui/react";
import { useField } from "@formiz/core";
import { FormGroup } from "../FormGroup";
import MultiSelect from "react-multi-select-component";
import { useDarkTheme } from "../hooks/isDarkTheme";

export const CheckTransponder = (props) => {
  const {
    errorMessage,
    id,
    isValid,
    isSubmitted,
    isValidating,
    resetKey,
    setValue,
    value,
    otherProps,
  } = useField(props);

  const { required, name } = props;
  const { children, label, type, placeholder, helper, ...rest } = otherProps;
  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && (isTouched || isSubmitted);
  
  

    const transponder =[
        { label:"SSR MODO A" , value:"A"},
        { label:"SSR MODO C" , value:"C"},
        { label:"SSR MODO E" , value:"E"},
        { label:"SSR MODO H" , value:"H"},
        { label:"SSR MODO I" , value:"I"},
        { label:"SSR MODO L" , value:"L"},
        { label:"SSR MODO P" , value:"P"},
        { label:"SSR MODO S" , value:"S"},
        { label:"SSR MODO X" , value:"X"},
        { label:"ADS-B B1" , value:"B1"},
        { label:"ADS-B B2" , value:"B2"},
        { label:"ADS-B U1" , value:"U1"},
        { label:"ADS-B U2" , value:"U2"},
        { label:"ADS-B V1" , value:"V1"},
        { label:"ADS-B V2" , value:"V2"},
        { label:"ADS-C D1" , value:"D1"},
        { label:"ADS-C G1" , value:"G1"},
    ]
   

     

  const [selected, setSelected] = useState([]);
  const [selectedTrans, setSelectedTrans] = useState([]);

  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);
  useEffect(() => {
    if(value){
      /* console.log('entro a set value'); */
      setSelectedTrans(value);
    }
  }, [value])

  const formGroupProps = {
    errorMessage,
    helper,
    id,
    isRequired: !!required,
    label,
    showError,
    name,
    ...rest,
  };
  const checkChecks = (e) => {
    setValue(e);
    setSelectedTrans(e);
    //console.log(value);
  };
  
  let transpondedor = '';
  selectedTrans.forEach(element => {
      transpondedor = transpondedor + element.value
  });

  return (
    <FormGroup {...formGroupProps}>
        
      
      
        <Stack mt="4">
            <pre>{transpondedor}</pre>
        
        <MultiSelect
            options={transponder}
            value={selectedTrans}
            onChange={checkChecks}
            labelledBy="Elegir transponder"
            className={!useDarkTheme() ? "light" : "dark"}
            overrideStrings={
            { "allItemsAreSelected": "Todos los equipos estan seleccionados.",
                "clearSearch": "Limpiar busqueda",
                "noOptions": "Sin opciones",
                "search": "Buscar",
                "selectAll": "Elegir todos",
                "selectSomeItems": "Elegir Transponder..."}
            }
            hasSelectAll={false}
        />
      </Stack>

     

      {children}
    </FormGroup>
  );
};
