const makeDebug = require('debug');
const debug = makeDebug('feathers-authentication-popups-github');
const GithubStrategy = require('passport-github').Strategy;
const oauth2 = require('feathers-authentication-oauth2');
const handleOAuthPopups = require('feathers-authentication-popups/express');

module.exports = function (githubConfig, cookieConfig) {
  debug('Initializing feathers-authentication-popups-github plugin');

  if (!githubConfig) {
    throw new Error('You must pass a GitHub configuration object as the first argument.');
  }
  if (!githubConfig.successRedirect) {
    throw new Error('You must pass a `config.successRedirect` URL to feathers-authentication-popups-github.');
  }
  if (!cookieConfig) {
    throw new Error('You must provide a cookie name {String} or an object with a `name` property to the feathers-authentication-popups-github plugin.');
  }

  return function () {
    const app = this;

    githubConfig.name = 'github';
    githubConfig.Strategy = GithubStrategy;

    app.configure(oauth2(githubConfig));
    app.get(githubConfig.successRedirect, handleOAuthPopups(cookieConfig));
  };
};
