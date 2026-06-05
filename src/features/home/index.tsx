import { TypeChange } from './components/TypeChange';
import { PositionalChange } from './components/PositionalChange';

export function HomePage() {
  return (
    <main>
      <header>
        <h1>mount-surprisius</h1>
        <p>Text</p>
      </header>
      <section aria-labelledby="positional-change-headline">
        <h2 id="positional-change-headline">Change of order of components</h2>
        <PositionalChange />
      </section>
      <section aria-labelledby="change-of-component-type-headline">
        <h2 id="change-of-component-type-headline">Change of component type</h2>
        <TypeChange />
      </section>
    </main>
  );
}
