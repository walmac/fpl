import React, { useEffect, useState } from 'react';
import { Select, Button} from '@chakra-ui/react';
import { useField } from '@formiz/core';
import { FormGroup } from '../FormGroup';

export const FieldSelect = (props) => {
  const {
    errorMessage,
    id,
    isValid,
    isSubmitted,
    resetKey,
    setValue,
    value,
    otherProps,
  } = useField(props);
  const { required, name } = props;
  const {
    children, label, options = [], placeholder, helper, ...rest
  } = otherProps;
  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && (isTouched || isSubmitted);
  const [acftSelect, setAcftSelect] = useState([]);
 
  let arrAcfts = []
  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);

  useEffect(() => {
   
   if(props.acfts){
    console.log(props.acfts);
    let arr = [];
    props.acfts.forEach(element => {
      arr.push({value:element.matricula, label:element.matricula})
      setAcftSelect((el) => {
        return el.filter((item) => item.value !== element.matricula);
      });
      setAcftSelect((acftSelect) => [
        ...acftSelect,
        
          {value:element.matricula, label:element.matricula}
        
      ]);

    });
    console.log(acftSelect);
    //setAcftSelect([...acftSelect,arr]);
    //arrAcfts=arr;
    
   }
   
    
    
  }, [])


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
  const ver = (e) => {
    console.log(acftSelect)
    console.log(props);
    console.log('hola');
    let arr = [];
    props.acfts.forEach(element => {
      arr.push({value:element.matricula, label:element.matricula})
      setAcftSelect((el) => {
        return el.filter((item) => item.value !== element.matricula);
      });
      setAcftSelect((acftSelect) => [
        ...acftSelect,
        
          {value:element.matricula, label:element.matricula}
        
      ]);

    });
    
    
    
    
  }
  

  return (
    <FormGroup {...formGroupProps}>
      <Select
        id={id}
        value={value || ''}
        onBlur={() => setIsTouched(true)}
        aria-invalid={showError}
        aria-describedby={!isValid ? `${id}-error` : undefined}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      >
        {props.acfts? 
        <>
          {(acftSelect ).map((item) => (
          <option key={item.value} value={item.value}>
            {item.label || item.value}
          </option>
        ))}
        <Button onClick={(e) => ver(e)}>
          Llenar
        </Button>
        </> :
        <>
          {(options ||[] ).map((item) => (
            <option key={item.value} value={item.value}>
              {item.label || item.value}
            </option>
          ))}
        </>
        }
        
      </Select>
      {/* { props.acfts ? <Button onClick={(e) => ver(e)}
      mt='2'
       bg={'gray.500'}
       rounded={'full'}
       px={4}
       _hover={{
           bg: 'gray.600',
       }}>
          Llenar
        </Button> : null} */}
      
        
      {children}
    </FormGroup>
  );
};