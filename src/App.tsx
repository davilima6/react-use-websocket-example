import { HDSIcon } from '@here/hds-react-components'
import useWebSocket, { Options } from 'react-use-websocket';
import './App.scss';

const WS_URL = 'ws://localhost:1201';

let initialInterval: number;

async function reconnectInterval(): Promise<number> {
  initialInterval = initialInterval === undefined ? 2 : initialInterval * 2;
  console.log(`Reconnecting in ${initialInterval}s`);

  return initialInterval * 1000;
}

export default function App() {
  const options: Options = {
    share: false,
    onOpen: () => console.log('app: opened'),
    onError: () => console.log('app: errored'),
    onClose: () => console.log('app: closed'),
    // retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: 5,
    reconnectInterval,
    // reconnectInterval: async () => 2000,
  };

  const { readyState } = useWebSocket(WS_URL, options)

  return (
    <article>
      <section>
        <HDSIcon name="here-logo" size="64" />
        <HDSIcon name="plus" size="32" />
        <HDSIcon name="substract" size="128" />
        <HDSIcon name="driving" iconStyle="outline" size="64" />
        <h1>Hello, world.</h1>
        <p>The web socket should be: {readyState}</p>
      </section>
    </article>
  );
}
