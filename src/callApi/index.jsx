// export const BASE_URL = 'https://sakhidreamlooms.in/sakhi-api-page/';
// export const IMAGE_URL = 'https://sakhidreamlooms.in';
// http://localhost:8000/auth/login

const API = 'http://localhost:8000/'
export const BASE_URL= 'http://localhost:8000/login'

const loaddata = async (url, options) => {
 try {
   const res = await fetch(url, options);
   const data = await res.json();
   return data;
 } catch (error) {
   console.log(error, "API CONTROLLER PAGE");
 }
};

export const CallApi = async (method, apiPath, params) => {
    let apiurl = API + apiPath;
    let options = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: params ? JSON.stringify(params) : undefined,
    };
  
    return loaddata(apiurl, options);
  };

export const CallApi_Without_Token = async (method, apiPath, params) => {
 let apiurl= API+apiPath
 let options = {
   method: method,
   headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
   },
   body: params,
 };


 return loaddata(apiurl, options);
};

export const CallApi_formdata = async (method, apiPath, params) => {
 // let token = await AsyncStorage.getItem('access_token');
 let apiurl= API+apiPath
 let options= {
   method: method,
   headers: {
     // Authorization: `Bearer ${token}`,
     Accept: 'application/json',
     'Content-Type': 'multipart/form-data',
   },
   body: params,
 };


 return loaddata(apiurl, options);
};

export const CallApi_formdata_Without_Token = async (method, apiPath, params) => {
 let apiurl= API+apiPath

let options= {
   method: method,
   headers: {
     Accept: 'application/json',
     'Content-Type': 'multipart/form-data',
   },
   body: params,
 };


 return loaddata(apiurl, options);
};
