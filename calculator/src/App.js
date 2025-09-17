import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // We'll add styles later

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = async () => {
    if (!num1 || !num2) {
      setError('Please enter both numbers');
      return;
    }
    setError('');
    try {
      const response = await axios.post('http://localhost:18080/calculate', {
        num1: parseFloat(num1),
        num2: parseFloat(num2),
        operator,
      });
      setResult(response.data.result);
    } catch (err) {
      setError('Error calculating: ' + err.message);
    }
  };

  return (
    <div className="calculator">
      <h1>Simple Calculator</h1>
      <input
        type="number"
        placeholder="First number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input
        type="number"
        placeholder="Second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p>Result: {result}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;