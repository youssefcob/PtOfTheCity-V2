export const useUrl = () => {
  const config = useRuntimeConfig()
  // console.log('ENV',process.env);
  // console.log('CONFIG',config.public);
    return config.public.url

  if (config.public.url) {

  } else {
    return "http://localhost:8000/api/"
  }

  switch (config.public.environment) {
    case 'development':
      return config.public.localUrl
    case 'staging':

      return config.public.apiStagingUrl
    case 'production':

      return config.public.apiProductionUrl
    default:
      throw new Error('Unknown environment')
  }
}
