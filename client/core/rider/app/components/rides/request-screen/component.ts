import { inject as context } from '@alexlafroscia/ember-context';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import RequestRide from '@rideshare/rider/aggregates/ride/commands/request-ride';
import { RidesStatechart } from '@rideshare/rider/authenticated/flows';
import { command, commandFor } from 'ember-command';

interface RequestArgs {
  openRide: (id: string) => void;
}

export default class RequestComponent extends Component<RequestArgs> {
  @context('rideFlow') flow!: RidesStatechart;

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
}
