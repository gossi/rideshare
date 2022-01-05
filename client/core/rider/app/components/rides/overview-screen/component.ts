import Component from '@glimmer/component';
import { service } from '@ember/service';
import SessionService from '@rideshare/auth/services/session';
import { Link } from 'ember-link';
import { useResource } from 'ember-resources';
import { RidesResource } from './resource';

interface OverviewArgs {
  requestRideLink: Link;
  rideRouteName: string;
}

export default class OverviewComponent extends Component<OverviewArgs> {
  @service declare session: SessionService;

  rides = useResource(this, RidesResource, () => []);
}
