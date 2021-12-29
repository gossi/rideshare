import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import SessionService from '@rideshare/auth/services/session';
import RideAbility from '@rideshare/rider/aggregates/ride/ability';
import { di } from '@rideshare/rider/utils/container';
import { Link } from 'ember-link';

interface OverviewArgs {
  requestRideLink: Link;
}

export default class OverviewComponent extends Component<OverviewArgs> {
  @service declare session: SessionService;

  @di
  ability = new RideAbility();
}
