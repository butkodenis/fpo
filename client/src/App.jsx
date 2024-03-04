import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>React App</h1>
            <img src={reactLogo} alt="react-logo" width="200" />
          </div>
          <div className="col-md-6">
            <h1>Vite App</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
