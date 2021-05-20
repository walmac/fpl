const axios = require('axios').default;

const clienteAxios = axios.create({
    baseURL:'https://fpldigital.herokuapp.com'
});

export default clienteAxios;