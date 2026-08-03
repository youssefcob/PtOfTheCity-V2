import axios from "axios";

export const useHttp = () => {
  const getBaseUrl = () => {
    const config = useRuntimeConfig()
    
    switch (config.public.environment) {
      case 'development':
        return config.public.apiProductionUrl
      case 'staging':
        return config.public.apiStagingUrl
      case 'production':
        return config.public.apiProductionUrl
      default:
        throw new Error('Unknown environment')
    }
  }

  const get = async (url: string) => {
    url = getBaseUrl() + url;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      throw (error.response.data.message);
    }
  }

  const post = async (url: string, data: any) => {
    url = getBaseUrl() + url;

    try {
      const response = await axios.post(url, data);
      // console.log(response);
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw (error.response.data.message);
    }
  }

  const put = async (url: string, data: any) => {
    url = getBaseUrl() + url;

    try {
      const response = await axios.put(url, data);
      return response.data;
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  }

  const del = async (url: string) => {
    url = getBaseUrl() + url;

    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  }

  return {
    get,
    post,
    put,
    delete: del
  }
} 