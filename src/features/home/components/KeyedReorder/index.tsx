import { useEffect, useReducer, useState, useEffectEvent } from 'react';

import './styles.css';

type ToggleButtonProps = {
  isActive: boolean;
  onClick: () => void;
};

function ToggleButton({ isActive, onClick }: ToggleButtonProps) {
  return (
    <button type="button" aria-pressed={isActive} onClick={onClick} className="toggle-button">
      Swap order
    </button>
  );
}

type BoxProps = {
  name: string;
};

function Box({ name }: BoxProps) {
  const [id] = useState(() => Math.random().toString());

  const onUseEffectRan = useEffectEvent(() => {
    console.log(`${name}'s useEffect ran - id (${id})`);
  });

  useEffect(() => {
    onUseEffectRan();
  }, []);

  return (
    <div className="box">
      {name} - {id}
    </div>
  );
}

export function KeyedReorder() {
  const [isSwapped, toggleIsSwapped] = useReducer((state) => !state, false);

  return (
    <article className="keyed-reorder">
      <ToggleButton isActive={isSwapped} onClick={toggleIsSwapped} />

      <h3>Effects rerun on reorder but without remounting (React 19 bug)</h3>
      <p>
        <em>useEffect</em> runs on every toggle for one of the components (not both), even though
        the components are keyed. Components dont remount as the id doesn't change. This is a bug in
        React 19. See <a href="https://github.com/react/react/issues/29585">Issue on GH</a>.
      </p>
      {isSwapped ? (
        <>
          <Box key="box-b" name="Box B" />
          <Box key="box-a" name="Box A" />
        </>
      ) : (
        <>
          <Box key="box-a" name="Box A" />
          <Box key="box-b" name="Box B" />
        </>
      )}
    </article>
  );
}
