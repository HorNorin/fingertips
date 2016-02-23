var _host = 'http://localhost:3001';
var _apiVersion = 'api/v1';

export var Config = {
  url: {
    home: '/',
    tip: '/:id',
    login: '/login',
    logout: '/logout',
    search: '/browse',
    otherwise: '/*path'
  },
  skill: {
    fadeDuration: 300,
    fadeInterval: 5000
  },
  api: {
    login: `${_host}/${_apiVersion}/login.json`,
    logout: `${_host}/${_apiVersion}/logout.json`,
    tipUrl: `${_host}/${_apiVersion}/tip`,
    searchUrl: `${_host}/${_apiVersion}/search.json`,
    searchSuggestion: `${_host}/${_apiVersion}/search_suggestion`
  }
};
