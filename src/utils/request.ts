// request
import axios, { AxiosRequestConfig } from 'axios';
import { ERROR_CODE } from './constants';
import { ICommonRes } from '@/types/http';
const axiosInstance = axios.create({
  timeout: 3 * 36000,
  baseURL: 'https://ciro.club',
});
const request = <T>(config: AxiosRequestConfig): Promise<ICommonRes<T>> => {
  return new Promise((resolve, reject) => {
    axiosInstance(config).then((res) => {
      if (res.status === ERROR_CODE.axiosSuccess.code) {
        resolve(res.data);
      } else {
        reject(res.data);
      }
    });
  });
};

export default request;
