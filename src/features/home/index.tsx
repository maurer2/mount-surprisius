import { TypeChange } from './components/TypeChange';
import { PositionalChange } from './components/PositionalChange';
import { KeyedReorder } from './components/KeyedReorder';

import './styles.css';

export function HomePage() {
  return (
    <main className="main">
      <header>
        <h1>mount-surprisius</h1>
        <p>Text</p>
      </header>
      <section className="section" aria-labelledby="positional-change-headline">
        <h2 id="positional-change-headline">Change of order of components</h2>
        <div className="example">
          <PositionalChange />
        </div>
      </section>
      <section className="section" aria-labelledby="change-of-component-type-headline">
        <h2 id="change-of-component-type-headline">Change of component type</h2>
        <div className="example">
          <TypeChange />
        </div>
      </section>
      <section className="section" aria-labelledby="keyed-reorder-headline">
        <h2 id="keyed-reorder-headline">Reorder of keyed components</h2>
        <div className="example">
          <KeyedReorder />
        </div>
      </section>
    </main>
  );
}
