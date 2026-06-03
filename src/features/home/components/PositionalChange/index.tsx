import { useEffect, useReducer } from 'react';

import './styles.css';

type ButtonProps = {
  isVisible: boolean;
  toggleIsVisible: () => void;
};

function Button({ isVisible, toggleIsVisible }: ButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={isVisible}
      aria-controls="conditionally-rendered-element"
      onClick={toggleIsVisible}
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
  }, []);

  return <span>Sensor</span>;
}

// doesn't happen with conditional rendering as null preserves the slot and Sensor doesn't lose its position e.g.
// {
//   isVisible ? <ConditionallyRenderedElement /> : null;
// }
// <Sensor />;

export function PositionalChange() {
  const [isVisible, toggleIsVisible] = useReducer((isVisible) => !isVisible, true);

  return (
    <article className="positional-change">
      <Button isVisible={isVisible} toggleIsVisible={toggleIsVisible} />

      <h3>Remounts on position change</h3>
      <p>
        When the conditionally rendered element is removed, React compares each index in the list of
        children against the same index in the new list to detect positional changes. At index 0, it
        previously detected <em>ConditionallyRenderedElement</em> and now detects <em>Sensor</em>.
        As those elements are of a different type <em>Sensor</em> gets remounted instead of
        rerendered.
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

      <h3>Workaround: Using fragments</h3>
      <p>
        In both branches a fragment is placed at index 0, that never changes type between rerenders
        even when the content of said fragment changes. React can reuse <em>Sensor</em> and rerender
        it instead of remounting it.
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
        In both branches <em>Sensor</em> has a stable key. When a key is present, React matches by
        key rather than by position. Since <em>Sensor</em>'s key is the same in both branches, React
        identifies it as the same instance and rerenders rather than remounts it.
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
    </article>
  );
}
