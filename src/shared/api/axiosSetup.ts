import axios, {isAxiosError} from 'axios';

import {ROUTE__LOGIN, ROUTE__MAIN} from '../constants';

const redirectToLogin = (): void => {
  const {pathname, search} = window.location;

  if (pathname === ROUTE__LOGIN) {
    return;
  }

  window.location.href = `${ROUTE__LOGIN}${pathname === ROUTE__MAIN ? '' : `?redirect=${pathname}${search}`}`;
};

export const axi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axi.interceptors.request.use(function (config) {
  config.headers['x-api-key'] = 'reqres-free-v1';
  return config;
});

axi.interceptors.response.use(
  response => response,
  (error: unknown) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      redirectToLogin();
    }

    return Promise.reject(error);
  },
);
