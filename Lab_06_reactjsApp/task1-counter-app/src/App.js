import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState(""); // state for warning message

  const increment = () => {
    setCount(count + 1);
    setWarning(""); // clear warning when incrementing
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setWarning(""); // clear warning if valid
    } else {
      setWarning("⚠️ Count cannot go below 0!");
    }
  };

  const reset = () => {
    setCount(0);
    setWarning(""); // clear warning on reset
  };

  return (
    <div className="container">
      <h1 className="title">- Countify -</h1>
      <h3 className="subtitle">Your daily counting companion</h3>
      <div className="counter-box">
        <h2 className="count">{count}</h2>
        {warning && <p className="warning">{warning}</p>}
        <div className="buttons">
          <button className="btn increment" onClick={increment}>Increment</button>
          <button className="btn decrement" onClick={decrement}>Decrement</button>
          <button className="btn reset" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
