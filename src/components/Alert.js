import React, {useContext} from 'react';
import authContext from '../../context/auth/authContext';

const Alerta = () => {
    const AuthContext = useContext(authContext);
    const {mensaje} = AuthContext;
    return ( 
        <div>
            {mensaje}
        </div>

     );
}
 
export default Alerta;