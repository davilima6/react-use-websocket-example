import { useMemo, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://localhost:1201';
const WS_OPTIONS = { share: true };

type Props = {
  shouldConnect: boolean;
};

function Child(props: Props) {
  // console.log('child: rendered');
  const options = useMemo(
    () => ({
      ...WS_OPTIONS,
      onOpen: () => console.log('child: opened'),
      onError: () => console.log('child: errored'),
      onMessage: () => console.log('child: received msg'),
      onClose: () => console.log('child: closed'),
    }),
    []
  );

  useWebSocket(WS_URL, options, props.shouldConnect);

  return <span>child!</span>;
}

function AnotherChild(props: Props) {
  // console.log('another child: rendered');
  const options = useMemo(
    () => ({
      ...WS_OPTIONS,
      onOpen: () => console.log('another child: opened'),
      onError: () => console.log('another child: errored'),
      onMessage: () => console.log('another child: received msg'),
      onClose: () => console.log('another child: closed'),
    }),
    []
  );

  useWebSocket(WS_URL, options, props.shouldConnect);

  return <span>kid.</span>;
}

export default function App() {
  // console.log('app: rendered');
  const [shouldConnect, setShouldConnect] = useState(true);
  const options = useMemo(
    () => ({
      ...WS_OPTIONS,
      onOpen: () => console.log('app: opened'),
      onError: () => console.log('app: errored'),
      onMessage: () => console.log('app: received msg'),
      onClose: () => console.log('app: closed'),
    }),
    []
  );

  useWebSocket(WS_URL, options, shouldConnect);

  return (
    <article>
      <section>
        <h1>
          Hello, <Child shouldConnect={shouldConnect} />
        </h1>
        <h2>
          Hi, <AnotherChild shouldConnect={shouldConnect} />
        </h2>
        <p>The web socket should be: {shouldConnect ? 'ON' : 'OFF'}</p>
      </section>
      <button onClick={() => setShouldConnect(!shouldConnect)}>{shouldConnect ? 'Disconnect' : 'Connect'}</button>
    </article>
  );
}
