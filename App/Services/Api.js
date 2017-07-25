// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'

// our "constructor"
const create = () => {
   const baseURL = AppConfig.baseURL
  // const baseURL = {
  //   github: 'https://api.github.com/',
  //   xiaocong: 'http://xiaocong-yii.mirenbank.com/'
  // }
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const apiGithub = apisauce.create({
      // base URL is read from the "constructor"
      baseURL: baseURL.github,
    // here are some default headers
    headers:  {
      'Cache-Control':  'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const api = apisauce.create({
      // base URL is read from the "constructor"
    baseURL: baseURL.api,
    // here are some default headers
    headers:  {
      'Cache-Control':  'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => apiGithub.get('')
  const getRate = () => apiGithub.get('rate_limit')
  const getUser = (username) => apiGithub.get('search/users', {q: username})
  const login = (username, password) => apiGithub.get('search/users', {username, password})
  const getCaptcha = () => api.get('site/captcha', {refresh: 'refresh'})
  const checkCaptcha = (code) => api.get('site/check-captcha', { code })
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    login,
    getCaptcha,
    checkCaptcha
  }
}

// let's return back our create method as the default.
export default {
  create
}
