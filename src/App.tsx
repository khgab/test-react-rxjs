import React from "react";
import "./App.css";
import { useRandomCall, useRandomCallRxjs } from "./hooks";

function App() {
  const { setSearchTerm, results } = useRandomCall();
  const { setSearchTermRxjs, resultsRxjs } = useRandomCallRxjs();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Test RXjs</h1>
        <input type="text" onChange={e => setSearchTerm(e.target.value)} />

        <ul>
          {results.map(res => (
            <li> {res.email}</li>
          ))}
        </ul>
        <input type="text" onChange={e => setSearchTermRxjs(e.target.value)} />

        <ul>
          {resultsRxjs.map(res => (
            <li> {res.email}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
