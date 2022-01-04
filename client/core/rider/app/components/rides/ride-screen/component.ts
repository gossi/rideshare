import Component from '@glimmer/component';
import { RideResource } from '@rideshare/rider/aggregates/ride/resources/ride';
import { useResource } from 'ember-resources';

interface RideScreenArgs {
  id: string;
}

export default class RideScreenComponent extends Component<RideScreenArgs> {
  ride = useResource(this, RideResource, () => [this.args.id]);
}
