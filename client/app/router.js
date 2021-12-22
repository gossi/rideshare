import EmberRouter from '@ember/routing/router';
import config from '@rideshare/client/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('authenticated', { path: '' }, function () {
    this.route('driver');
    this.route('rider');
  });
});
