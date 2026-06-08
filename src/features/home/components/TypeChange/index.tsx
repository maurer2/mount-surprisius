import { useEffect, useReducer } from 'react';

import './styles.css';

type ToggleButtonProps = {
  isActive: boolean;
  onClick: () => void;
};

function ToggleButton({ isActive, onClick }: ToggleButtonProps) {
  return (
    <button type="button" aria-pressed={isActive} onClick={onClick} className="toggle-button">
      List type
    </button>
  );
}

type ListContentProps = {
  items: string[];
};

function ListContent({ items }: ListContentProps) {
  useEffect(() => {
    console.log('list mounted');
  }, []);

  return (
    <>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </>
  );
}

export function TypeChange() {
  const [isUnordered, toggleIsUnordered] = useReducer((state) => !state, true);

  return (
    <article className="type-change">
      <ToggleButton isActive={isUnordered} onClick={toggleIsUnordered} />

      <h3>Remounts on type change of wrapping element</h3>
      <p>Text</p>
      {isUnordered ? (
        <ul className="list">
          <ListContent items={['Item 1', 'Item 2', 'Item 3']} />
        </ul>
      ) : (
        <ol className="list">
          <ListContent items={['Item 1', 'Item 2', 'Item 3']} />
        </ol>
      )}
    </article>
  );
}
