import React, { useEffect, useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import { Checkbox, CheckboxGroup, HStack, useCheckboxGroup } from "@chakra-ui/react"
import { useField } from '@formiz/core';
import { FormGroup } from '../FormGroup';
/* import CheckboxGroup from 'react-checkbox-group'; */

export const CheckSurvival = (props) => {
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
  const [supervivencia, setSupervivencia] = useState([])

  
  const { required, name } = props;
  const {
    children, label, type, placeholder, helper, ...rest
  } = otherProps;
  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && (isTouched || isSubmitted);
  const [checkedItems, setCheckedItems] = React.useState([false, false, false, false])

  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);
  useEffect(() => {
    if(value !== null){
      
    }
    
  }, [value]);

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
    log
    setValue(e);
    setSupervivencia(e);
    
  }
  useEffect(() => {
    if(props.survival){
      
      console.log(props);
        
      props.survival.forEach(element => {
          if(element === 'P'){
            setCheckedItems([true, checkedItems[1], checkedItems[2], checkedItems[3]])
          }
          if(element === 'D'){
            setCheckedItems([checkedItems[0], true, checkedItems[2], checkedItems[3]])
          }
          if(element === 'M'){
            setCheckedItems([checkedItems[0], checkedItems[1], true, checkedItems[3]])
          }
          if(element === 'S'){
            setCheckedItems([checkedItems[0], checkedItems[1], checkedItems[2], true])
          }
      });

    }
  }, [])
  useEffect(() => {
    let arr = [...checkedItems];
    let nuevo = [];
    

        
        for (let index = 0; index < 4; index++) {
          if(index=== 0 && arr[index]=== true){
            nuevo.push('P');
          }
          if(index=== 1 && arr[index]=== true){
            nuevo.push('D');
          }
          if(index=== 2 && arr[index]=== true){
            nuevo.push('M');
          }
          if(index=== 3 && arr[index]=== true){
            nuevo.push('S');
          }          
          
        }
        console.log(nuevo);
        setValue(nuevo);
    
  }, [checkedItems])
  

  return (
    <FormGroup {...formGroupProps}>
      <HStack>
          <Checkbox value="P" onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2], checkedItems[3]])} isChecked={checkedItems[0]}>POLAR</Checkbox>
          <Checkbox value="D" onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2], checkedItems[3]])} isChecked={checkedItems[1]}>DESERTICO</Checkbox>
          <Checkbox value="M" onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked, checkedItems[3]])} isChecked={checkedItems[2]}>MARITIMO</Checkbox>
          <Checkbox value="S" onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], checkedItems[2], e.target.checked])} isChecked={checkedItems[3]}>SELVA</Checkbox>
      </HStack>
      
      {/* <CheckboxGroup colorScheme="gray" onChange={(e) => checkChecks (e)}>
        <HStack>
          <Checkbox value="P">POLAR</Checkbox>
          <Checkbox value="D">DESERTICO</Checkbox>
          <Checkbox value="M">MARITIMO</Checkbox>
          <Checkbox value="J">SELVA</Checkbox>
        </HStack>
      </CheckboxGroup> */}
      {/* <CheckboxGroup name="supervivencia" value={supervivencia} onChange={(e) => checkChecks(e)}>
      {(Checkbox) => (
        <>
          <label>
          <Checkbox value="P" /> POLAR
          </label>
          <label>
          <Checkbox value="D" />DESERTICO
          </label>
          <label>
          <Checkbox value="M" />MARITIMO
          </label>
          <label>
          <Checkbox value="J" />SELVA
          </label>
        </>
      )}
       </CheckboxGroup > */}
        
        
      
      {children}
    </FormGroup>
  );
};