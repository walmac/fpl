import React,{ createContext , useState} from 'react';

export const FplContext = createContext();

const ContextProvider = (props) => {
    const initialState={
        pdf: ''
    }

    const [pdf, setPdf] = useState('');
    const [callsign, setCallsign] = useState('');
    const [blob, setBlob] = useState('');
    const [bytes, setBytes] = useState('');
    const [values, setValues] = useState('');
    return (
        <FplContext.Provider
            value={{
                pdf,
                callsign,
                blob,
                bytes,
                values,
                setPdf,
                setCallsign,
                setBlob,
                setBytes,
                setValues
            }}
        >
           {props.children}
        </FplContext.Provider>
    )
    
    

    
}
 
export default ContextProvider;