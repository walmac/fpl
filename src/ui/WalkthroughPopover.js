import React, {useRef, useState} from 'react';
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    ButtonGroup, 
    Portal, 
    useDisclosure,
    Link
  } from '@chakra-ui/react';
  import { QuestionIcon , QuestionOutlineIcon} from '@chakra-ui/icons';
  


const  WalkthroughPopover = ({props}) => {
    const initialFocusRef = React.useRef();
    const {text} = props;
    
  
//console.log(props);
  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={true}
    >
        <Stack alignItems='flex-end'>
            <PopoverTrigger>
                {/* <Button>Trigger</Button> */}
                <QuestionOutlineIcon w={6} h={6} mt='2' mr='2'/>
            </PopoverTrigger>
      </Stack>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800" mr='2'>
        <PopoverHeader pt={4} fontWeight="bold" border="0" textAlign='center'>
          Ayuda
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
         {text}
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
 
export default WalkthroughPopover;



  