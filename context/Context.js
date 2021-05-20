import React,{ createContext , useState} from 'react';

export const FplContext = createContext();

const ContextProvider = (props) => {
    const initialState={
        pdf: '',
        acft: '',
        emergenciaCheck:false,
        
    }

    const [pdf, setPdf] = useState('');
    const [callsign, setCallsign] = useState('');
    const [blob, setBlob] = useState('');
    const [bytes, setBytes] = useState('');
    const [values, setValues] = useState('');
    const [acft, setAcft] = useState('');
    const [emergenciaCheck, setEmergenciaCheck] = useState(false);
    
    return (
        <FplContext.Provider
            value={{
                pdf,
                callsign,
                blob,
                bytes,
                values,
                acft,
                emergenciaCheck,
                setPdf,
                setCallsign,
                setBlob,
                setBytes,
                setValues,
                setAcft,
                setEmergenciaCheck,
            }}
        >
           {props.children}
        </FplContext.Provider>
    )
    
    

    
}
 
export default ContextProvider;