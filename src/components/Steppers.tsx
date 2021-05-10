/* eslint-disable no-nested-ternary */
import React from 'react';
import { Formiz, useForm, FormizStep } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import {
  Button,
  Box,
  Heading,
  Stack,
  AspectRatio,
  Grid,
} from '@chakra-ui/react';
import { FieldInput } from './FieldInput';
import { PageHeader } from './PageHeader';
import { PageLayout } from '../layout/PageLayout';
import { useToastValues } from '../hooks/useToastValues'

export const PreviousButton = (props) => {
  const form = useForm({ subscribe: 'form' });

  if (form.isFirstStep) {
    return <Box />;
  }

  return (
    <Button size="sm" onClick={form.prevStep} colorScheme="brand" variant="ghost" {...props}>
      Anterior
    </Button>
  );
};

export const NextButton = (props) => {
  const form = useForm({ subscribe: 'form' });
  return (
    <Button
      type="submit"
      size="sm"
      colorScheme="brand"
      isDisabled={
        (form.isLastStep ? !form.isValid : !form.isStepValid)
        && form.isStepSubmitted
      }
      {...props}
    >
      {form.isLastStep ? 'Terminar' : 'Siguiente'}
    </Button>
  );
};

export const StepperWrapper = ({ title, children, ...rest }) => (
  <Stack {...rest}>
    {title && <Heading fontSize="md">{title}</Heading>}
    <Box bg="gray.500" p="2" borderRadius="md">
      <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
        <Box>
          <PreviousButton />
        </Box>
        {children}
        <Box textAlign="right">
          <NextButton />
        </Box>
      </Grid>
    </Box>
  </Stack>
);

export const SimpleStepper = (props) => {
  const form = useForm({ subscribe: 'form' });

  return (
    <Box flex="1" textAlign="center" fontSize="sm" color="gray.500" {...props}>
      Step {(form.currentStep?.index ?? 0) + 1} / {form.steps?.length}
    </Box>
  );
};

export const DotsStepper = (props) => {
  const form = useForm({ subscribe: 'form' });
  const spacing = 2;

  return (
    <Stack
      direction="row"
      display="flex"
      alignItems="center"
      justifyContent="center"
      spacing={spacing}
      {...props}
    >
      {form.steps?.map((step) => {
        const inactiveProps = !step.isVisited
          ? {
            bg: 'gray.100',
            color: 'gray.400',
          }
          : {};

        const visitedProps: any = step.isVisited && !step.isCurrent
          ? {
            bg: 'white',
            color: 'brand.500',
            borderColor: 'currentColor',
            as: 'button',
            type: 'button',
            onClick: () => form.goToStep(step.name),
            _hover: {
              bg: 'brand.500',
              color: 'white',
              borderColor: 'brand.500',
            },
            _focus: {
              boxShadow: 'outline',
            },
          }
          : {};

        const currentProps = step.isCurrent
          ? {
            zIndex: 1,
            bg: 'brand.500',
            color: 'white',
          }
          : {};

        return (
          <AspectRatio key={step.name} w="6" ratio={1}>
            <Box
              zIndex={0}
              borderRadius="full"
              border="2px solid transparent"
              fontWeight={step.isCurrent || step.isVisited ? 'bold' : null}
              outline="none"
              fontSize="xs"
              overflow="visible"
              transition="0.2s"
              _after={
                step.index !== 0
                  ? {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    mt: '-1px',
                    mr: '2px',
                    top: '50%',
                    right: '100%',
                    bg:
                        step.isVisited || step.isCurrent
                          ? 'brand.500'
                          : 'gray.100',
                    h: '2px',
                    w: spacing,
                  }
                  : null
              }
              {...inactiveProps}
              {...visitedProps}
              {...currentProps}
            >
              {step.index + 1}
            </Box>
          </AspectRatio>
        );
      })}
    </Stack>
  );
};

export const Steppers = () => {
  const form = useForm({ subscribe: 'form' });
  const toastValues = useToastValues();

  const handleSubmit = (values) => {
    toastValues(values);
    form.invalidateFields({
      name: 'You can display an error after an API call',
    });
    const stepWithError = form.getFieldStepName('name');
    if (stepWithError) {
      form.goToStep(stepWithError);
    }
  };

  return (
    <Formiz connect={form} onValidSubmit={handleSubmit}>
      <PageLayout>
        <form noValidate onSubmit={form.submitStep}>
          <PageHeader githubPath="Steppers.tsx">Steppers</PageHeader>
          <FormizStep name="step1">
            <FieldInput name="name" label="Name" />
          </FormizStep>
          <FormizStep name="step2">
            <FieldInput
              name="email"
              label="Email"
              type="email"
              validations={[
                {
                  rule: isEmail(),
                  message: 'Not a valid email',
                },
              ]}
            />
          </FormizStep>
          <FormizStep name="step3">
            <FieldInput name="company" label="Company" />
          </FormizStep>
          <FormizStep name="step4">
            <FieldInput name="job" label="Job" />
          </FormizStep>

          <Stack spacing="6" mt="8">
            <StepperWrapper title="Simple stepper">
              <SimpleStepper />
            </StepperWrapper>
            <StepperWrapper title="Dots stepper">
              <DotsStepper />
            </StepperWrapper>
          </Stack>
        </form>
      </PageLayout>
    </Formiz>
  );
};