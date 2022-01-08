import { gql, useSubscription } from 'glimmer-apollo';

const DOMAIN_EVENT = gql`
  subscription DomainEvent($filter: String!) {
    domainEvents(filter: $filter) {
      aggregateIdentifier {
        id
      }
      data
    }
  }
`;

interface DomainEventVariables {
  filter: string;
}

interface DomainEventSubscription {
  __typename?: 'Subscription';

  domainEvents?: {
    aggregateIdentifier: {
      id: string;
    };
    data: string;
  } | null;
}

function makeFilter(name: string) {
  const [context, aggregate, event] = name.split('.');

  const jsonFilter = {
    contextIdentifier: {
      name: context
    },
    aggregateIdentifier: {
      name: aggregate
    },
    name: event
  };

  return JSON.stringify(jsonFilter);
}

export function subscribeToEvent<
  Data extends Record<string, unknown> = Record<string, unknown>
>(owner: object, event: string, callback: (data: Data) => void) {
  return useSubscription<DomainEventSubscription, DomainEventVariables>(
    owner,
    () => [
      DOMAIN_EVENT,
      {
        variables: {
          filter: makeFilter(event)
        },
        onData(payload) {
          const data = payload?.domainEvents?.data;

          if (data) {
            const information = JSON.parse(data) as Data;
            callback(information);
          }
        }
      }
    ]
  );
}
