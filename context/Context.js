import React,{ createContext , useState} from 'react';

export const FplContext = createContext();

const ContextProvider = (props) => {
    const initialState={
        pdf: ''
    }

    const [pdf, setPdf] = useState('');
    const [callsign, setCallsign] = useState('');
    return (
        <FplContext.Provider
            value={{
                pdf,
                callsign,
                setPdf,
                setCallsign
            }}
        >
           {props.children}
        </FplContext.Provider>
    )
    
    

    
}
 
export default ContextProvider;