// @flow
import Link from 'next/link';

type Props = {
  children: Node
}

const App = ({ children }: Props) => {
  return (
    <div>
      <header role="banner">
        <div className="brand">
          <Link href="/">
            <a className="brand__name">
              Brian Hanson
            </a>
          </Link>
          <div className="brand__tagline">
            Designer / Developer
          </div>
        </div>
      </header>
      <nav>
        <Link href="/work">
          <a>
            Work
          </a>
        </Link>
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
};

export default App;
