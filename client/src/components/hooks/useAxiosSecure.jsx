import axios from 'axios';
import { AuthContext } from '../../provider/AuthContext';
import { useContext } from 'react';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  // const token = localStorage.getItem('token');
  const { signOutUser } = useContext(AuthContext);

  // Add a request interceptor
  // axiosInstance.interceptors.request.use(config => {
  //   config.headers.authorization = `Bearer ${token}`;
  //   return config;
  // });

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.status === 401 || error.status === 403) {
        signOutUser()
          .then(() => {
            console.log(`sign out user for ${error.status} status code`);
          })
          .catch(err => {
            console.log(err);
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
