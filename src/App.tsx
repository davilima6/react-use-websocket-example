import useWebSocket, { Options } from 'react-use-websocket';
import './App.css';

const WS_URL = 'ws://localhost:1201';

export default function App() {
  const options: Options = {
    share: false,
    onOpen: () => console.log('app: opened'),
    onError: () => console.log('app: errored'),
    onClose: () => console.log('app: closed'),
    retryOnError: true,
    shouldReconnect: () => true,
    reconnectAttempts: 5,
    // reconnectInterval: 2000,
    reconnectInterval: async () => 2000,
  };

  const { readyState } = useWebSocket(WS_URL, options)

  return (
    <article>
      <section>
        <h1>Hello, world.</h1>
        <p>The web socket should be: {readyState}</p>
      </section>
    </article>
  );
}
