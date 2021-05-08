import React from 'react';
import { Formiz, useForm , FormizStep} from '@formiz/core'
import { isEmail } from '@formiz/validations' // Import some validations
import { MyField } from '../src/MyField' // Import your field
import { Button } from "@chakra-ui/react"
import {
  Stack, useColorMode, Flex, Switch,
} from '@chakra-ui/react';
import { ExternalLinkIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';


import {FieldSelect} from '../src/components/FieldSelect';
import {FieldSlider} from '../src/components/FieldSlider';
import {FieldInput} from '../src/components/FieldInput';
import {useToastValues} from '../src/hooks/useToastValues'
import  {StepperWrapper, SimpleStepper, DotsStepper } from '../src/components/Steppers';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const myForm = useForm();

  const handleSubmit = (values) => {
    
    myForm.invalidateFields({
      name: 'You can display an error after an API call',
    });
    const stepWithError = myForm.getFieldStepName('name');
    if (stepWithError) {
      myForm.goToStep(stepWithError);
    }
  };

  return (
    <Formiz
      connect={myForm}
      onValidSubmit={handleSubmit}
    >
      <form
        noValidate
        onSubmit={myForm.submitStep}
      >
        <FormizStep
          name="step1" // Split the form with FormizStep
        >
        <FieldInput
          name="Matricula"
          label="Matricula"
          required="La matricula es obligatoria"
          htmlFor="matricula"
        />
        <FieldSelect
          name="reglas"
          label="Reglas de Vuelo"
          placeholder="Elegir Reglas"
          required="Requerido"
          keepValue
          options={[
            { value: 'I', label: 'IFR' },
            { value: 'V', label: 'VFR' },
            { value: 'Y', label: 'Y' },
            { value: 'Z', label: 'Z' },
          ]}
        />
        <FieldSelect
          name="tipo"
          label="Tipo de Vuelo"
          placeholder="Elegir Tipo de vuelo"
          required="Requerido"
          keepValue
          options={[
            { value: 'S', label: 'S' },
            { value: 'N', label: 'N' },
            { value: 'M', label: 'M' },
            { value: 'G', label: 'G' },
            { value: 'X', label: 'X' },
          ]}
        />
        <FieldSlider
          name="slider"
          label="Numero de ACFT"
          required="Tiene que ser almenos 1"
          
          validations={[
            {
              rule: (val) => val !== 0,
              message: 'Tiene que ser al menos una ACFT',
            },
            
          ]}
        />
        <FieldInput
          name="tipoACFT"
          label="Tipo de ACFT"
          required="El tipo es obligatorio"
        />
        
        </FormizStep>
        <FormizStep name="step2">
        <FieldSelect
          name="estela"
          label="Categoria estela turbulenta"
          placeholder="Estela turbulenta"
          required="Requerido"
          keepValue
          options={[
            { value: 'H', label: 'PESADA - H' },
            { value: 'M', label: 'MEDIA - M' },
            { value: 'L', label: 'LIVIANA - L' },
           
          ]}
        />
        
        <FieldInput
          name="equipo"
          label="Equipo de la ACFT"
          required="El equipo es obligatorio"
        />
        
        
        </FormizStep>

        
        <Stack spacing="6" mt="8">
            
            <StepperWrapper title="Pasos">
              <DotsStepper />
            </StepperWrapper>
          </Stack>
      </form>
      <Stack direction="row" align="center" mb="1">
          <MoonIcon size="14px" opacity={colorMode !== 'dark' ? '0.3' : undefined} />
          <Switch
            size="md"
            isChecked={colorMode === 'light'}
            onChange={toggleColorMode}
            colorScheme="none"
          />
          <SunIcon size="14px" opacity={colorMode !== 'light' ? '0.3' : undefined} />
        </Stack>
    </Formiz>
  )
}
