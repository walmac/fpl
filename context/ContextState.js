import React ,{useState, useReducer}from 'react';
import Context from './Context';
import ContextReducer from './ContextReducer';

import {PDF_FILE } from '../types';

const ContextState = (props) => {
    const initialState={
        pdf: ''
    }

    const [pdf, setPdf] = useState('');
    return (
        <Context.Provider
            value={{
                pdf,
                setPdf,
            }}
        >
           {props.children}
        </Context.Provider>
    )
    
    

    
}
 
export default ContextState;