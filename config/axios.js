const axios = require('axios').default;

const clienteAxios = axios.create({
    baseURL:process.env.backendURL
});

export default clienteAxios;