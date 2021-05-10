import React,{ createContext , useState} from 'react';

export const FplContext = createContext();

const ContextProvider = (props) => {
    const initialState={
        pdf: ''
    }

    const [pdf, setPdf] = useState('');
    const [callsign, setCallsign] = useState('');
    const [blob, setBlob] = useState('');
    return (
        <FplContext.Provider
            value={{
                pdf,
                callsign,
                blob,
                setPdf,
                setCallsign,
                setBlob
            }}
        >
           {props.children}
        </FplContext.Provider>
    )
    
    

    
}
 
export default ContextProvider;