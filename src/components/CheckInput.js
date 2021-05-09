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
    console.log(value);
    
  }
  

  return (
    <FormGroup {...formGroupProps}>
      
      <CheckboxGroup colorScheme="green" onChange={(e) => checkChecks (e)}>
        <HStack>
          <Checkbox value="U">UHF</Checkbox>
          <Checkbox value="V">VHF</Checkbox>
          <Checkbox value="E">ELT</Checkbox>
        </HStack>
      </CheckboxGroup>
        
        
      
      {children}
    </FormGroup>
  );
};