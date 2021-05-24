import React, { Children, useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
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

} from "../../types";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const urlAuth = "/api/auth";
const urlUsuarios = "/api/usuarios";
const urlDatosUsuario = "/api/datosusuario";
const urlDatosAcft = "/api/datosacft";
const urlDatosAcftEliminar = "/api/datosacft/eliminar";

const AuthState = ({ children }) => {
  //state inicial
  const initialState = {
    token: typeof window !== 'undefined' ? localStorage.getItem('FPLtoken') : null,
    autenticado: null,
    usuario: null,
    mensaje: null,
    datos: null,
    datosAcfts: null,
    cargaTerminada : null
  };

  //definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      const res = await clienteAxios({
        method: "post",
        url: urlUsuarios,
        data: {
          nombre: datos.nombre,
          email: datos.email,
          password: datos.password,
        },
      });
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: res.data.msg,
      });
    } catch (error) {
        console.log(error.response);
      //console.log(error.response.data.errores[0].msg);
       dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg
      }); 
    }
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  const iniciarSesion = async datos => {
    try {
        const res = await clienteAxios({
            method: "post",
            url: urlAuth,
            data: {
              nombre: datos.nombre,
              email: datos.email,
              password: datos.password,

            },
          });
          console.log(res);
          dispatch({
              type:LOGIN_EXITOSO,
              payload:res.data.token
          })
    } catch (error) {
        console.log(error);

        dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.msg
        });
        setTimeout(() => {
            dispatch({
              type: LIMPIAR_ALERTA,
            });
          }, 3000);
    }
    
  } 

  //retorna usuario autenticado en base al JWT
  const usuarioAutenticado = async() => {
      const token = localStorage.getItem('FPLtoken');
      if(token){
          tokenAuth(token);
      }

      try {
          const res = await clienteAxios.get(urlAuth);
          if(res.data.usuario)
            {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: res.data.usuario
                 })
            }
          
      } catch (error) {
          console.log(error);
          dispatch({
                type: LOGIN_ERROR,
                payload: null,
            });
          
      }
      
  }
  const cerrarSesion = ()=>{

    //console.log('cierra sesion');
    dispatch({
        type: CERRAR_SESION
    });
  }
  
  
  const agregaDatos = async datos => {
    try {
        const res = await clienteAxios({
          method: "post",
          url: urlDatosUsuario,
          data: {
            nombre: datos.nombre,
            tipo: datos.tipo,
            licencia: datos.licencia,
          },
        });
        dispatch({
          type: CAMBIAR_DATOS_USUARIO,
          payload: res.data.msg,
        });
      } catch (error) {
          console.log(error.response);
        //console.log(error.response.data.errores[0].msg);
         /* dispatch({
          type: REGISTRO_ERROR,
          payload: error.response.data.msg
        });  */
      }
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALERTA,
        });
      }, 3000);

  }
  

  const obtenerDatos = async () => {
    try {
        const res = await clienteAxios({
          method: "get",
          url: urlDatosUsuario,
         
        });
        console.log(res.data.data);
         dispatch({
          type: OBTENER_DATOS_USUARIO,
          payload: res.data.data,
        }); 
      } catch (error) {
          console.log(error.response);
        //console.log(error.response.data.errores[0].msg);
         /* dispatch({
          type: REGISTRO_ERROR,
          payload: error.response.data.msg
        });  */
      }
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALERTA,
        });
      }, 3000);
      
  }
  const setMensaje = mensaje =>{
    dispatch({
        type: SET_MENSAJE,
        payload : mensaje
    });
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
}

const enviarDatosAcft = async datos => {
    console.log(datos);
    let validaBotes ='';
    let validaCap='';
    let validaColor='';
    if(datos.botes === '' || datos.botes === null){
      validaBotes= '';
      validaCap= '';
      validaColor=''
    }else{
      validaBotes= datos.botes;
      validaCap= datos.capacidad;
      validaColor=datos.colorBotes.toUpperCase();
    }
    try {
        const res = await clienteAxios({
          method: "post",
          url: urlDatosAcft,
          data: {
            matricula: datos.matricula.toUpperCase(),
            tipo: datos.tipo.toUpperCase(),
            estela: datos.estela,
            equipoStr: datos.equipoStr,
            equipoArr: datos.equipoArr,
            transponderArr: datos.transponderArr,
            velocidad: datos.velocidad,
            chalecos: datos.chalecos,
            supervivencia: datos.supervivencia,
            botes: validaBotes,
            capacidad: validaCap,
            colorBotes: validaColor,
            colorACFT: datos.colorACFT.toUpperCase(),
            emergencia: datos.emergencia,
          },
        });
        console.log(res.data.msg);
        dispatch({
          type: ENVIAR_DATOS_ACFT,
          payload: res.data.msg,
        });
        cargaFinalizada();
      } catch (error) {
          console.log(error);
        //console.log(error.response.data.errores[0].msg);
          dispatch({
          type: REGISTRO_ERROR,
          payload: error.response.data.msg
        });  
      }
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALERTA,
        });
      }, 3000);
}

const obtenerDatosAcft = async () => {
    console.log('obteniendo');
     try {
        const res = await clienteAxios({
          method: "get",
          url: urlDatosAcft,
         
        });
        console.log(res.data.data);
         dispatch({
          type: OBTENER_DATOS_ACFT,
          payload: res.data.data,
        }); 
        
      } catch (error) {
          console.log(error.response);
        //console.log(error.response.data.errores[0].msg);
          dispatch({
          type: REGISTRO_ERROR,
          payload: error.response.data.msg
        });  
      }
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALERTA,
        });
      }, 3000);
}

const eliminarAcft = async datos => {
  console.log(datos);
  try {
    const res = await clienteAxios({
      method: "post",
      url: urlDatosAcftEliminar,
      data: {
         userId : datos
      },
    });
    dispatch({
      type: OBTENER_DATOS_ACFT,
      payload: res.data.data,
    }); 
    
  } catch (error) {
    console.log(error);
    /* dispatch({
      type: REGISTRO_ERROR,
      payload: error.response.data.msg
    });   */
  }
}

const cargaFinalizada = () => {
  dispatch({
    type : ACFT_CARGADA_CORRECTA
  });

}

const limpiarCarga = () => {
  dispatch({
    type: LIMPIAR_CARGA
  })
}

  
  

  

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        datos: state.datos,
        datosAcfts: state.datosAcfts,
        cargaTerminada : state.cargaTerminada,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
        agregaDatos,
        obtenerDatos,
        setMensaje,
        enviarDatosAcft,
        obtenerDatosAcft,
        eliminarAcft,
        cargaFinalizada,
        limpiarCarga,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
