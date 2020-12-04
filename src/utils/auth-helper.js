import Axios from "axios";
import * as gVar from "../utils/properties";
import React from 'react';

const TOKEN_KEY = "SxnL";
const USER_KEY = "User";

//Logout
export function logoutUser() {
  localStorage.setItem(TOKEN_KEY, null);
  localStorage.setItem(USER_KEY, null);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setUser(user) {
  //convierto a json el response del objeto
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getUser() {
  //esto era lo pase json asi que lo vuelvo a obj
  var retrievedObject = localStorage.getItem(USER_KEY);
  return JSON.parse(retrievedObject)
}

export async function getCurrentUser() {
  if (!getToken()) return false;
  try {
    let response = await Axios.get(gVar.api + "/api/logged/current");
    return response.data;
  } catch (error) {
    return false;
  }
}

/*export function initAxiosInterceptors() {
  Axios.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  Axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        //deleteToken();
        window.location = "/";
      } else {
        return Promise.reject(error);
      }
    }
  );
}*/
