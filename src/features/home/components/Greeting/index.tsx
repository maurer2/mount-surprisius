import { useState } from 'react';

import './Greeting.css';

type GreetingProps = {
  name: string;
};

export function Greeting({ name }: GreetingProps) {
  const [count, setCount] = useState(0);
  const hasGreeted = count > 0;

  const handleClick = () => {
    setCount((previous) => previous + 1);
  };

  return (
    <article className="greeting" aria-live="polite">
      <h3 className="greeting__title">Hello, {name}!</h3>
      <p className="greeting__body">
        {hasGreeted
          ? `You have said hi ${count} time${count === 1 ? '' : 's'}.`
          : 'Say hi to get started.'}
      </p>
      <button type="button" className="greeting__button" onClick={handleClick}>
        Wave
      </button>
    </article>
  );
}
