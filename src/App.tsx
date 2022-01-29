import logo from './logo.svg';
import { Button, Text } from '../lib/main';
import './App.css';

const { SubCaption, Heading, SubHeading } = Text;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><SubHeading>Hello Vite + React!</SubHeading></p>
        <p><Heading>Hello Vite + React!</Heading></p>
        <p><SubCaption>Hello Vite + React!</SubCaption></p>
        <p><Text.Caption>Hello Vite + React!</Text.Caption></p>
      </header>
      <Button text="your text" />
      <p><Text inverted level={6}>Hello Vite + React!</Text></p>
      <p><Text inverted level={5}>Hello Vite + React!</Text></p>
      <p><Text inverted level={4}>Hello Vite + Reacdsdt!</Text></p>
      <p><Text inverted level={3}>Hello Vite + React!</Text></p>
      <p><Text inverted level={2}>Hello Vite + React!</Text></p>
      <p><Text inverted level={1}>Hello Vite + React!</Text></p>
      <p><Text level={6}>Hello Vite + React!</Text></p>
      <p><Text level={5}>Hello Vite + React!</Text></p>
      <p><Text level={4}>Hello Vite + React!</Text></p>
      <p><Text level={3}>Hello Vite + React!</Text></p>
      <p><Text level={2}>Hello Vite + React!</Text></p>
      <p><Text level={1}>Hello Vite + React!</Text></p>

    </div>
  );
}

export default App;
