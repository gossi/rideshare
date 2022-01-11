import { inject as context } from '@alexlafroscia/ember-context';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import RequestRide from '@rideshare/rider/aggregates/ride/commands/request';
import { RidesStatechart } from '@rideshare/rider/authenticated/flows';
import { command, commandFor } from 'ember-command';

interface RequestArgs {
  openRide: (id: string) => void;
}

export default class RequestComponent extends Component<RequestArgs> {
  @context('rideFlow') flow!: RidesStatechart;

  @tracked lat = 50.110924;
  @tracked lng = 8.682127;
  @tracked location?: [number, number];

  @command
  request = commandFor(new RequestRide(this.flow));

  @action
  // eslint-disable-next-line no-undef
  submit(event: SubmitEvent) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    this.request(data);
  }

  @action
  activate() {
    this.flow.send('REQUEST');
  }

  @action
  locateMe() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.location = [this.lat, this.lng];
    });
  }
}
