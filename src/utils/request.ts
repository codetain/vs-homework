import axios, { AxiosRequestConfig } from 'axios';

export const request = async <RequestDataType, ResponseType>(
  url: string,
  data?: RequestDataType
): Promise<ResponseType> => {
  const requestConfig: AxiosRequestConfig = {
    url,
    baseURL: 'https://vs-homework.netlify.app/.netlify/functions'
  };

  if (data) {
    requestConfig.params = data;
  }

  const response = await axios(requestConfig);
  return response.data;
};
