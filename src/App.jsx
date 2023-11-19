import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import AnotherComponent from './AnotherComponent';

function App() {
  const [count, setCount] = useState(0);

  function decrement() {
    setCount(previousValue => previousValue - 1);
  }

  function increment() {
    setCount(previousValue => previousValue + 1);
  }

  const someStyle = {
    background: 'blue',
    color: 'white',
    fontSize: '28px',
    fontWeight: 'bold',
  };

  return (
    <div className="App">
      <header className="App-header">
        <AnotherComponent name="John Doe" />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <span>{count}</span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
          </div>
        </div>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {true && (
          <div>
            <p style={someStyle}>{2 + 3}</p>
            <p style={{ background: 'blue' }}>{2 + 3}</p>
          </div>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
