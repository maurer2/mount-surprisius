import { Greeting } from './components/Greeting';

import "./Home.css";

export function HomePage() {
  return (
    <main className="home">
      <header>
        <h1>mount-surprisius</h1>
        <p>Text</p>
      </header>

      <section>
        <h2>Change of order of components</h2>

        <Greeting name="world" />
      </section>
    </main>
  );
}
