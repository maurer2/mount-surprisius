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

function Sensor() {
  useEffect(() => {
    console.log('Sensor mounted');
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
    <div className="positional-change">
      {isVisible ? (
        <>
          <Button isVisible={isVisible} toggleIsVisible={toggleIsVisible} />
          {/* <> */}
          {/* doesn't unmount and remount if wrapped in a fragment in both cases as fragment avoids positional change */}
          <ConditionallyRenderedElement />
          {/* </> */}
          <Sensor /> {/* unmounts and remounts */}
          {/* <Sensor key="sensor" /> doesn't unmount and remount */}
        </>
      ) : (
        <>
          <Button isVisible={isVisible} toggleIsVisible={toggleIsVisible} />
          {/* <></> */}
          <Sensor /> {/* unmounts and remounts */}
          {/* <Sensor key="sensor" /> doesn't unmount and remount */}
        </>
      )}
    </div>
  );
}
