import React, { useEffect, useState, useContext } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useCheckboxGroupContext,
} from '@chakra-ui/react';
import { Checkbox, CheckboxGroup, HStack, useCheckboxGroup, Button} from "@chakra-ui/react"
import { useField } from '@formiz/core';
import { FormGroup } from '../FormGroup';
import {FplContext} from '../../context/Context';



export const CheckInput = (props) => {
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
  const [checkedItems, setCheckedItems] = React.useState([false, false, false]);

 
  
  


  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);

  useEffect(() => {
    if(props.radio){
      

        
      props.radio.forEach(element => {
          if(element === 'U'){
              setCheckedItems([true, checkedItems[1], checkedItems[2]])
          }
          if(element === 'V'){
              setCheckedItems([checkedItems[0], true, checkedItems[2]])
          }
          if(element === 'E'){
              setCheckedItems([checkedItems[0], checkedItems[1], true])
          }
      });

    }
  }, [])

 
 
  useEffect(() => {
    let arr = [...checkedItems];
    let nuevo = [];
    

        
        for (let index = 0; index < 3; index++) {
          if(index=== 0 && arr[index]=== true){
            nuevo.push('U');
          }
          if(index=== 1 && arr[index]=== true){
            nuevo.push('V');
          }
          if(index=== 2 && arr[index]=== true){
            nuevo.push('E');
          }
          
          
        }
        console.log(nuevo);
        setValue(nuevo);
    
  }, [checkedItems])
  
  

  
  
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
  
  
  
  

  return (
    <FormGroup {...formGroupProps}>
      <HStack>
        <Checkbox value="U" id='U' onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1], checkedItems[2]])} isChecked={checkedItems[0]}>
          UHF
        </Checkbox>
        <Checkbox value="V" id='V' onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked, checkedItems[2]])} isChecked={checkedItems[1]}>
          VHF
        </Checkbox>
        <Checkbox value="E" id='E' onChange={(e) => setCheckedItems([checkedItems[0], checkedItems[1], e.target.checked])} isChecked={checkedItems[2]}>
          ELT 
        </Checkbox>
                
      </HStack>
     {children}
    </FormGroup>
  );
};