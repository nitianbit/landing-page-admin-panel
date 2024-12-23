import { STORAGE_KEYS, getValue } from "../services/Storage";
const token = getValue(STORAGE_KEYS.TOKEN);
import apiHandler from "../services/api/apiHandler";
import { API_METHODS } from "../services/api/constants";

export const doGET = async function (url) {
  try {
    const reqBody = {
      reqParam: {}, method: "GET", endPoint: url,
      token
    };
    const response = await apiHandler(url, API_METHODS.GET)
    return response;
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const doPOST = async function (url, data) {
  try {
    const response = await apiHandler(url, API_METHODS.POST, data)
    return response;
    throw new Error(response?.data);
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const doDELETE = async function (url) {
  try {
    const response = await apiHandler(url, API_METHODS.DELETE)
    return response;
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const doPUT = async function (url, data) {
  try {
    const response = await apiHandler(url, API_METHODS.PUT, data)
    return response;
  } catch (err) {
    throw new Error(err?.message);
  }
}


