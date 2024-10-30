import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // Puedes agregar más configuraciones aquí si es necesario
});

export default axiosInstance;