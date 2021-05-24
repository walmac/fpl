import { 
        USUARIO_AUTENTICADO,
         REGISTRO_EXITOSO,
         REGISTRO_ERROR,
         LIMPIAR_ALERTA,
         LOGIN_EXITOSO,
         LOGIN_ERROR,
         CERRAR_SESION,
         CAMBIAR_DATOS_USUARIO,
         OBTENER_DATOS_USUARIO,
         SET_MENSAJE,
         ENVIAR_DATOS_ACFT,
         OBTENER_DATOS_ACFT,
         ELIMINAR_ACFT,
         ACFT_CARGADA_CORRECTA,
         LIMPIAR_CARGA
         
} from '../../types'


const authReducer =(state, action) => {
    switch(action.type){
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
        case CAMBIAR_DATOS_USUARIO:
        case SET_MENSAJE:
        case ENVIAR_DATOS_ACFT:
        case ELIMINAR_ACFT:
        
            return {
                ...state,
                mensaje : action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje : null
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('FPLtoken', action.payload)
            return{
                ...state,
                token: action.payload,
                autenticado: true 
            }
        case USUARIO_AUTENTICADO:
            return{
                ...state,
                usuario : action.payload,
                autenticado: true
            }
        case CERRAR_SESION:
            localStorage.removeItem('FPLtoken');
            return{
                ...state,
                usuario : null,
                autenticado: null,
                token: null,
                datos: null,
                datosAcfts : null
            }
        case OBTENER_DATOS_USUARIO:
            return{
                ...state,
                datos : action.payload,
                
            }
        case OBTENER_DATOS_ACFT:
            return{
                ...state,
                datosAcfts : action.payload,
                
            }
        case ACFT_CARGADA_CORRECTA :
            return{
                ...state,
                cargaTerminada : true
            }
        case LIMPIAR_CARGA :
            return{
                ...state,
                cargaTerminada : null
            }
        
            

        default:
            return state;
    }
}
export default authReducer;