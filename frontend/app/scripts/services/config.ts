var _host = 'http://localhost:3001';
var _apiVersion = 'api/v1';

export var Config = {
  url: {
    home: '/',
    search: '/browse'
  },
  skill: {
    fadeDuration: 300,
    fadeInterval: 5000
  },
  api: {
    searchUrl: `${_host}/${_apiVersion}/search.json`,
    searchSuggestion: `${_host}/${_apiVersion}/search_suggestion`
  }
};
