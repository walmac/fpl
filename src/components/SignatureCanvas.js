import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import SignaturePad from "react-signature-canvas";
import { Button } from "@chakra-ui/react";
import { useField } from "@formiz/core";
import { FormGroup } from "../FormGroup";

const SignatureCanvas = (props) => {
  const [trimmedDataURL, settrimmedDataURL] = useState("");
  const sigPad = useRef({});
  let win =false;
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
  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);
  useEffect(() => {
    /* let canvas = sigPad.current.getCanvas();
   
    if (window.innerWidth > 768) {
      canvas.setAttribute("width", "350");
      canvas.setAttribute("height", "200");
    }else{
      canvas.setAttribute("width", "100%");
      canvas.setAttribute("height", "200");
     
    } */
  }, []);
  

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
    settrimmedDataURL("");
    let canvas = sigPad.current.getCanvas();
    /* if (window.innerWidth > 768) {
      canvas.setAttribute("width", "350");
      canvas.setAttribute("height", "200");
    }else{
      canvas.setAttribute("width", "300");
      canvas.setAttribute("height", "300");
    } */
  };

  const trim = () => {
    console.log(sigPad.current);
    if (!sigPad.current.isEmpty()) {
      settrimmedDataURL(
        sigPad.current.getTrimmedCanvas().toDataURL("image/png")
      );
      setValue(trimmedDataURL);
      console.log(value);
    }
  };
  const activar = () => {
    let canvas = sigPad.current.getCanvas();
    if (window.innerWidth > 768) {
      canvas.setAttribute("width", "450");
      canvas.setAttribute("height", "300");
    }else{
      canvas.setAttribute("width", "350");
      canvas.setAttribute("height", "200");
    }
    
  }
  

  return (
    <FormGroup {...formGroupProps}>
      <div>
        <div>
          <SignaturePad
            ref={sigPad}
            /* canvasProps={{
              className: "signatureCanvas",
            }} */
            canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
            clearOnResize={false}
          />
        </div>
        <div>
          <Button style={{marginTop: 6}}onClick={() => clear()}>Limpiar</Button>
          <Button style={{marginTop: 6, marginLeft:6}}onClick={() => trim()}>Listo</Button>
          <h1>Si el cuadro de firma no aparece apretar limpiar, si al terminar no sucede nada, pulsar otra vez listo</h1>
        </div>
        <div style={{marginTop: 4}}>
          {trimmedDataURL ? <img src={trimmedDataURL} /> : null}
        </div>
      </div>
      {children}
    </FormGroup>
  );
};

export default SignatureCanvas;
