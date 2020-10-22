import { RequestConfig } from 'umi';
export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [
    // (url, options) => {
    //   console.log(url);
    //   return {
    //     url: url,
    //     options: { ...options },
    //   };
    // },
  ],
  responseInterceptors: [],
};
