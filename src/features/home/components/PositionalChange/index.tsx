import { useEffect, useReducer } from 'react';

import './styles.css';

type ButtonProps = {
  isActive: boolean;
  onClick: () => void;
};

function Button({ isActive, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={isActive}
      aria-controls="conditionally-rendered-element"
      onClick={onClick}
      className="toggle-button"
    >
      Conditionally rendered element
      <span aria-hidden="true" className="toggle-button-icon" />
    </button>
  );
}

function ConditionallyRenderedElement() {
  return (
    <div id="conditionally-rendered-element" className="conditionally-rendered-element">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet
      ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et
      mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue.
    </div>
  );
}

type SensorProps = {
  name: string;
};

function Sensor({ name }: SensorProps) {
  useEffect(() => {
    console.log(`${name} mounted`);
  }, [name]);

  return <span>Sensor</span>;
}

// doesn't happen with conditional rendering as null preserves the slot and Sensor doesn't lose its position e.g.
// {
//   isVisible ? <ConditionallyRenderedElement /> : null;
// }
// <Sensor />;

export function PositionalChange() {
  const [isVisible, toggleIsVisible] = useReducer((state) => !state, true);

  return (
    <article className="positional-change">
      <Button isActive={isVisible} onClick={toggleIsVisible} />

      <h3>Remounts on position change</h3>
      <p>
        When <em>ConditionallyRenderedElement</em> is removed, React compares each index in the
        surrounding <em>Fragment</em>'s list of children against the same index in the new list. At
        index 0, it previously detected <em>ConditionallyRenderedElement</em> and now sees{' '}
        <em>Sensor</em>. As those elements are of a different type <em>Sensor</em> gets remounted
        instead of rerendered. If the hidden branch returns <em>Sensor</em> directly without a
        wrapping <em>Fragment</em>, the conditional's slot itself would change type from{' '}
        <em>Fragment</em> to <em>Sensor</em>, causing React to remount <em>Sensor</em>.
      </p>
      {isVisible ? (
        <>
          <ConditionallyRenderedElement />
          <Sensor name="Sensor 1" />
        </>
      ) : (
        <>
          <Sensor name="Sensor 1" />
        </>
      )}

      <h3>
        Workaround: Using <em>Fragment</em>s (or actual dom elements)
      </h3>
      <p>
        In each branch a <em>Fragment</em> is placed at index 0, that never changes type between
        rerenders even when the contents of those <em>Fragment</em>s change. React reuses{' '}
        <em>Sensor</em> and rerenders it instead of remounting it.
      </p>
      {isVisible ? (
        <>
          <>
            <ConditionallyRenderedElement />
          </>
          <Sensor name="Sensor 2" />
        </>
      ) : (
        <>
          <></>
          <Sensor name="Sensor 2" />
        </>
      )}

      <h3>Workaround: Using stable keys</h3>
      <p>
        In both branches <em>Sensor</em> has a stable key. When a key is present, React uses that
        key to identify the keyed element, ignoring its position within the sibling list as long as
        the type remains the same. Since <em>Sensor</em>'s key is the same in both branches, React
        identifies <em>Sensor</em> as the same instance and rerenders <em>Sensor</em> instead of
        remounting it. Both branches still need to produce the same element type at the top level
        slot, therefore both branches need to be wrapped in <em>Fragment</em>s (or dom-elements). If
        the visible branch returns a <em>Fragment</em> and the hidden branch returns <em>Sensor</em>{' '}
        directly without a fragment, React sees a type change at that position and remounts
        regardless of the key on <em>Sensor</em>.
      </p>
      {isVisible ? (
        <>
          <ConditionallyRenderedElement />
          <Sensor name="Sensor 3" key="sensor-3" />
        </>
      ) : (
        <>
          <Sensor name="Sensor 3" key="sensor-3" />
        </>
      )}

      <h3>
        Workaround: Avoid positional change with <em>null</em> placeholder
      </h3>
      <p>
        In this case the first slot is always occupied by either
        <em>ConditionallyRenderedElement</em> when visible or <em>null</em> when hidden. So{' '}
        <em>Sensor</em> always stays at index 1. React detects the same component type at the same
        index and rerenders <em>Sensor</em> instead of remounting it.
      </p>
      {isVisible ? <ConditionallyRenderedElement /> : null}
      <Sensor name="Sensor 4" />
    </article>
  );
}
