import Axios from "axios";
//import SyncStorage from 'sync-storage';
import * as gVar from "../utils/properties";
import React from 'react';
//import { CommonActions } from '@react-navigation/native';

const TOKEN_KEY = "SxnL";


export function setToken(token) {
  //SyncStorage.set(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_KEY, token)
}
export function getToken() {
  //return SyncStorage.get(TOKEN_KEY);
  return localStorage.getItem(TOKEN_KEY);
}

export function setUserId(userId) {
  //SyncStorage.set("userId", userId);
  //SecureStore.setItemAsync("userId", userId);
}

export function getUserId() {
  //return SyncStorage.get("userId");
  //return SecureStore.getItemAsync("userId", userId);
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

export function initAxiosInterceptors() {
  Axios.interceptors.request.use(config => {
    const token = getToken();
    //console.log("TOKEN:"token)
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
}
