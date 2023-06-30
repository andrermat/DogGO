import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { logout, resetToken } from "../store/slices";
import {store} from "../store/store";
const url = "https://ipm-backend-55414.azurewebsites.net";

axios.interceptors.request.use(
  function (c: AxiosRequestConfig) {
    let token = store.getState().session.token;
    if (token && c.headers) {
      c.headers["Authorization"] = token;
    }
    return c;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    if (
      response.headers &&
      response.headers["Authorization"] &&
      store.getState().session.token !== ""
    ) {
      store.dispatch(resetToken(response.headers["Authorization"]));
      localStorage.setItem("token", response.headers["Authorization"]);
    }
    return response;
  },

  function (error: any) {
    if (error.response.status === 401) {
      alert("A sua sessão expirou, por favor efectue novo login");
      store.dispatch(logout());
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export async function loginRequest(email: string, password: string) {
  try {
    return await axios.put(`${url}/rest/user/login`, {
      email: email,
      password: password,
    });
  } catch (error:any) {
    throw error.response;
  }
}

export async function servicePage(urlParams: string) {
  try {
    return await axios.get(`${url}/rest/service${urlParams}`);
  } catch (error:any) {
    throw error.response;
  }
}

export async function registerRequest(email: string, password: string,
   firstName:string, lastName:String, phoneNumber?:number) {
  try {
    return await axios.post(`${url}/rest/user`, {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    });
  } catch (error:any) {
    throw error.response;
  }
}

export async function createServiceRequest(formData: FormData) {
 try {
   return await axios.post(`${url}/rest/service`, formData);
 } catch (error:any) {
   throw error.response;
 }
}
export async function getService(id: string) {
 try {
   return await axios.get(`${url}/rest/service/${id}`);
 } catch (error:any) {
   throw error.response;
 }
}

export async function getLocation(lat:number, lon:number) {
  try {
    return await axios.get('https://atlas.microsoft.com/search/address/reverse/json?subscription-key=h4XGUDdcbDL1i6HPKRP8DeHoL9efpuEw05_A0FZAuwk&api-version=1.0&query=' + lat + ',' + lon);
  } catch (error:any) {
    throw error.response;
  }
 }

export async function getReviews(urlParams:string) {
  try {
    return await axios.get(`${url}/rest/reviews/${urlParams}`);
  } catch (error:any) {
    throw error.response;
  }
 }

 export async function makeReview(text: string, rating: number, serviceId:string) {
  try {
    return await axios.post(`${url}/rest/reviews`, {
      text: text,
      rating: rating,
      serviceId: serviceId
    });
  } catch (error:any) {
    throw error.response;
  }
}

 export async function oldServiceRequest() {
  try {
    return await axios.get(`${url}/rest/service/myOldServices`);
  } catch (error:any) {
    throw error.response;
  }
 }

 export async function myServiceRequest(urlParams:string) {
  try {
    return await axios.get(`${url}/rest/service/myServices?${urlParams}`);
  } catch (error:any) {
    throw error.response;
  }
 }

 export async function getProducts(filter:string, minPrice:number, maxPrice:number) {
  try {
    return await axios.get(`${url}/rest/products?`+ `minPrice=` + minPrice + `&maxPrice=` + maxPrice + `&nt=`+ filter);
  } catch (error:any) {
    throw error.response;
  }
 }