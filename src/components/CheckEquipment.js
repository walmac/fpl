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

export const CheckEquipment = (props) => {
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
  useEffect(() => {
    if(value){
      
      setSelected(value);
    }
  }, [value])

  const { required, name } = props;
  const { children, label, type, placeholder, helper, ...rest } = otherProps;
  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && (isTouched || isSubmitted);
  
  
  const equipos = [
    { label: "STANDARD" ,value:"S" },
    { label: "No se lleva equipo o no funciona" ,value:"N" },
    { label: "GBAS" ,value:"A" },
    { label: "LPV (APV con SBAS)" ,value:"B" },
    { label: "LORAN C" ,value:"C" },
    { label: "DME" ,value:"D" },
    { label: "FMC WPR ACARS" ,value:"E1"},
    { label: "D-FIS ACARS" ,value:"E2"},
    { label: "PDC ACARS" ,value:"E3"},
    { label: "PDC ACARS" ,value:"F" },
    { label: "GNSS" ,value:"G" },
    { label: "HF RTF", value:"H"},
    { label: "Navegación inercial" , value:"I"},
    { label: "CPDLC ATN VDL Modo 2 ", value:"J1"},
    { label: "CPDLC FANS 1/A HFDL", value:"J2"},
    { label: "CPDLC FANS 1/A VDL Modo A", value:"J3"},
    { label: "CPDLC FANS 1/A VDL Modo 2", value:"J4"},
    { label: "CPDLC FANS 1/A SATCOM (INMARSAT)", value:"J5"},
    { label: "CPDLC FANS 1/A SATCOM (MTSAT)", value:"J6"},
    { label: "CPDLC FANS 1/A SATCOM (Iridum)", value:"J7"},
    { label: "MLS" , value:"K"},
    { label: "ILS" , value:"L"},
    { label: "ATC SATVOICE (INMARSAT)", value:"M1"},
    { label: "ATC SATVOICE (MTSAT)", value:"M2"},
    { label: "ATC SATVOICE (Iridium)", value:"M3"},
    { label: "VOR" , value:"O"}, 
    { label: "CPDLC RCP 400 ", value:"P1"},
    { label: "CPDLC RCP 240 ", value:"P2 "},
    { label: "SATVOICE RCP 400 ", value:"P3"},
    { label: "PBN aprobada " , value:"R"},
    { label: "TACAN" , value:"T"},
    { label: "UHF RTF" , value:"U"},
    { label: "VHF RTF" , value:"V"},
    { label: "RVSM aprobada" , value:"W"},
    { label: "MNPS aprobada" , value:"X "},
    { label: "VHF 8,33 kHz" , value:"Y"},
    { label: "Otros a especificar en campo 18" , value:"Z"},
    ];

   /*  const transponder =[
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
    ] */
    /* const equipos = [
        { label: "A" ,value:"A" },
        { label: "B" ,value:"B" },
        { label: "E" ,value:"E" },
        { label: "C" ,value:"C" },
        { label: "D" ,value:"D" },
        { label: "E1" ,value:"E1"},
        { label: "E2" ,value:"E2"},
        { label: "E3" ,value:"E3"},
        { label: "G" ,value:"G" },
        { label: "H", value:"H"},
        { label: "I" , value:"I"},
        { label: "J1", value:"J1"},
        { label: "J2", value:"J2"},
        { label: "J3", value:"J3"},
        { label: "J4", value:"J4"},
        { label: "J5", value:"J5"},
        { label: "J6", value:"J6"},
        { label: "J7", value:"J7"},
        { label: "K" , value:"K"},
        { label: "L" , value:"L"},
        { label: "M1", value:"M1"},
        { label: "M2", value:"M2"},
        { label: "M3", value:"M3"},
        { label: "O" , value:"O"}, 
        { label: "P1", value:"P1"},
        { label: "P2", value:"P2 "},
        { label: "P3", value:"P3"},
        { label: "R" , value:"R"},
        { label: "T" , value:"T"},
        { label: "U" , value:"U"},
        { label: "V" , value:"V"},
        { label: "W" , value:"W"},
        { label: "X" , value:"X "},
        { label: "Y" , value:"Y"},
        { label: "Otros a especificar en campo 18" , value:"Z"},
        ]; */

     

  const [selected, setSelected] = useState([]);
  /* const [selectedTrans, setSelectedTrans] = useState([]); */

  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);

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
    setSelected(e);
    //console.log(value);
  };
  let equipment = '';
  selected.forEach(element => {
      equipment = equipment + element.value
  });
  /* let transpondedor = '';
  selectedTrans.forEach(element => {
      transpondedor = transpondedor + element.value
  }); */

  return (
    <FormGroup {...formGroupProps}>
        
      
      <Stack>
      
        <pre>{equipment}</pre>
        <MultiSelect
            options={equipos}
            value={selected}
            onChange={checkChecks}
            labelledBy="Elegir"
            className={!useDarkTheme() ? "light" : "dark"}
            overrideStrings={
            { "allItemsAreSelected": "Todos los equipos estan seleccionados.",
                "clearSearch": "Limpiar busqueda",
                "noOptions": "Sin opciones",
                "search": "Buscar",
                "selectAll": "Elegir todos",
                "selectSomeItems": "Elegir equipos..."}
            }
            hasSelectAll={false}
        />
        </Stack>
        {/* <Stack mt="4">
        <label >Transponder</label>
            <pre>{transpondedor}</pre>
        
        <MultiSelect
            options={transponder}
            value={selectedTrans}
            onChange={setSelectedTrans}
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
      </Stack> */}

     {/*  <CheckboxGroup colorScheme="gray" onChange={(e) => checkChecks(e)}>
        <VStack>
          <Checkbox value="A">ABAS</Checkbox>
          <Checkbox value="B">LPV (APV con SBAS)</Checkbox>
          <Checkbox value="E">ELT</Checkbox>

          <Checkbox value="C">LORAN C</Checkbox>
          <Checkbox value="D">DME</Checkbox>
          <Checkbox value="E1"> FMC WPR ACARS</Checkbox>

          <Checkbox value="E2"> D-FIS ACARS</Checkbox>
          <Checkbox value="E3"> PDC ACARS</Checkbox>
          <Checkbox value="G"> PDC ACARS</Checkbox>

          <Checkbox value="H">HF RTF</Checkbox>
          <Checkbox value="I">Navegación inercial</Checkbox>
          <Checkbox value="J1"> CPDLC ATN VDL Modo 2 </Checkbox>
          <Checkbox value="J2"> CPDLC FANS 1/A HFDL</Checkbox>
          <Checkbox value="J3"> CPDLC FANS 1/A VDL Modo A</Checkbox>
          <Checkbox value="J4"> CPDLC FANS 1/A VDL Modo 2</Checkbox>
          <Checkbox value="J5"> CPDLC FANS 1/A SATCOM (INMARSAT)</Checkbox>
          <Checkbox value="J6"> CPDLC FANS 1/A SATCOM (MTSAT)</Checkbox>
          <Checkbox value="J7"> CPDLC FANS 1/A SATCOM (Iridum)</Checkbox>
          <Checkbox value="K"> MLS</Checkbox>
          <Checkbox value="L"> ILS</Checkbox>
          <Checkbox value="M1"> ATC SATVOICE (INMARSAT)</Checkbox>
          <Checkbox value="M2"> ATC SATVOICE (MTSAT)</Checkbox>
          <Checkbox value="M3"> ATC SATVOICE (Iridium)</Checkbox>
          <Checkbox value="O"> VOR</Checkbox>
          <Checkbox value="P1"> CPDLC RCP 400 </Checkbox>
          <Checkbox value="P2 ">CPDLC RCP 240 </Checkbox>
          <Checkbox value="P3"> SATVOICE RCP 400 </Checkbox>
          <Checkbox value="R"> PBN aprobada </Checkbox>
          <Checkbox value="T"> TACAN</Checkbox>
          <Checkbox value="U"> UHF RTF</Checkbox>
          <Checkbox value="V"> VHF RTF</Checkbox>
          <Checkbox value="W"> RVSM aprobada</Checkbox>
          <Checkbox value="X ">MNPS aprobada</Checkbox>
          <Checkbox value="Y"> VHF 8,33 kHz</Checkbox>
          <Checkbox value="Z"> Otros a especificar en campo 18</Checkbox>
        </VStack>
      </CheckboxGroup> */}

      {children}
    </FormGroup>
  );
};
