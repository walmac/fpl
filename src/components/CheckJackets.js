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

export const CheckJackets = (props) => {
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
  const {
    children, label, type, placeholder, helper, ...rest
  } = otherProps;
  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && (isTouched || isSubmitted);

  const [checkedItems, setCheckedItems] = React.useState([false, false, false, false])

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
 
  useEffect(() => {
    if(props.jackets){
      
      console.log(props);
        
      props.jackets.forEach(element => {
          if(element === 'L'){
            setCheckedItems([true, checkedItems[1], checkedItems[2], checkedItems[3]])
          }
          if(element === 'F'){
            setCheckedItems([checkedItems[0], true, checkedItems[2], checkedItems[3]])
          }
          if(element === 'U'){
            setCheckedItems([checkedItems[0], checkedItems[1], true, checkedItems[3]])
          }
          if(element === 'V'){
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
            nuevo.push('L');
          }
          if(index=== 1 && arr[index]=== true){
            nuevo.push('F');
          }
          if(index=== 2 && arr[index]=== true){
            nuevo.push('U');
          }
          if(index=== 3 && arr[index]=== true){
            nuevo.push('V');
          }          
          
        }
        console.log(nuevo);
        setValue(nuevo);
    
  }, [checkedItems])
  

  return (
    <FormGroup {...formGroupProps}>
      
      
        <HStack>
          <Checkbox value="L" onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2], checkedItems[3]])} isChecked={checkedItems[0]}>LUZ</Checkbox>
          <Checkbox value="F" onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2], checkedItems[3]])} isChecked={checkedItems[1]}>FLUOR</Checkbox>
          <Checkbox value="U" onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked, checkedItems[3]])} isChecked={checkedItems[2]}>UHF</Checkbox>
          <Checkbox value="V" onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], checkedItems[2], e.target.checked])} isChecked={checkedItems[3]}>VHF</Checkbox>
        </HStack>
      
      
        
        
      
      {children}
    </FormGroup>
  );
};