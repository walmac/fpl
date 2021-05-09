import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import SignaturePad from "react-signature-canvas";
import {  Button} from "@chakra-ui/react";
import { useField } from '@formiz/core';
import { FormGroup } from '../FormGroup';

const SignatureCanvas = (props) => {
    const [trimmedDataURL, settrimmedDataURL] = useState('');
    const sigPad = useRef({});
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

  

    const clear = () => {
        sigPad.current.clear();
    }

    const trim = () => {
        if(!sigPad.current.isEmpty()){
            settrimmedDataURL(sigPad.current.getTrimmedCanvas().toDataURL("image/png"));
            setValue(trimmedDataURL);
            console.log(value);
        }
       

    }
    
    

  return (
    <FormGroup {...formGroupProps}>
      
      <div style={{width: '80%', height: '80%'}} >
        <div style={{width: '100%,' ,height: '100%'}}>
          <SignaturePad ref={sigPad}
            canvasProps={{
            className: "signatureCanvas"
          }}    
          />
        </div>
        <div>
          <Button  onClick={() => clear()}>
            Limpiar
          </Button>
          <Button  onClick={() => trim()}>
            Listo
          </Button>
        </div>
        {trimmedDataURL ? (
          <img  src={trimmedDataURL} style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px"
          }}/>
        ) : null}
      </div>
      {children}
    </FormGroup>
  );
};

export default SignatureCanvas;


