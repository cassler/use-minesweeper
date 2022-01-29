import logo from './logo.svg';
import { Button, Text, useDesignToken } from '../lib/main';
import './App.css';

const { SubCaption, Caption, SubHeading } = Text;

function App() {
  const t = useDesignToken({ level: 3, inverted: false });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <SubHeading>
          {t}
        </SubHeading>
        <Text>This too</Text>
        <Caption>This too</Caption>
        <SubCaption>This too</SubCaption>
      </header>
      <Button text="your text" />
      <p><Text level="heading">heading - Hello Vite + Reacdsdt!</Text></p>
      <p><Text level="subheading">subheading - Hello Vite + React!</Text></p>
      <p><Text>Hello Vite + React!</Text></p>
      <p><Text level="caption">caption - Hello Vite + React!</Text></p>
      <p><Text level="subcaption">subcaption - Hello Vite + React!</Text></p>

    </div>
  );
}

export default App;
