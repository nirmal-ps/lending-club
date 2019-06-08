import axios from 'axios';
  
  export const fetchDataPost = (url, body) => {
    return new Promise((resolve, reject) => {
      return axios.post( url, body)
        .then((response) => (response.status !== 200 ? reject(response) : response))
        .then((response) => response.data)
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };
  export const fetchDataGet = (url, params = {}) => {
    return new Promise((resolve, reject) => {
      return axios.get( url, params)
        .then((response) => (response.status !== 200 ? reject(response) : response))
        .then((response) => response.data)
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };
  
  export const fetch = ( url, options = {}) => {
    return new Promise((resolve, reject) => {
      return axios( url, options)
        .then((response) => (response.status !== 200 ? reject(response) : response))
        .then((response) => resolve(response))
        .catch((error) => {
          return reject(error);
        });
    });
  };

  export const getRequestOptions = () => { 
      return {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
        }
  }}

  export const postRequestOptions = (body = {}) => {
      return {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data:  body ,
      };

  }

  