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
    </main>
  );
}
