import Route from '@ember/routing/route';

export default class RideRoute extends Route {
  model(params: { id: string }) {
    return params;
  }
}
