import { useState } from "react";
import img from './img/1.png'

function App() {

  const handleClick = () => {
    
  }

  const [text, setText] = useState('');
  const [result, setResult] = useState([]);
  return (
    <div>
      input text:
      <input onChange={(e) => setText(e.target.value)}>
      </input>
      <button>
        run
      </button>
      <br />
      <br />
      {text}
      <br />
      <br />
      {result}
      <br />
      <img src={img} alt='task' />
    </div>
  );
}

export default App;
