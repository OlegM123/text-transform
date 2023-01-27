import { useState } from "react";
import styled from "styled-components";

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState([]);
  const [workText, setWorkText] = useState([]);

  const handleClick = () => {
    const countOfFragments = Math.ceil(text.length / 140);
    const resArr = [];
    setWorkText(() => text.split(' '));
    let i = workText[0].length;
    let j = 0;
    let a = 1;
    while (a <= countOfFragments) {
      let item = '';
      while (i < 140) {
        if (workText[j] === undefined) break;
        if (item.length + workText[j].length > 140) break;
        item += workText[j] + ' ';
        i = item.length;
        j++;
      }
      i = 0;
      resArr.push(item + a + '/' + countOfFragments)
      a++;
    }
    setResult(resArr);
  }

  return (
    <AppDiv>
      input text:
      <StyledInput onChange={(e) => setText(e.target.value)}>
      </StyledInput>
      <StyledButton onClick={() => handleClick()}>
        run
      </StyledButton>
      <br />
      <br />
      result: {result.map(item => {
        return (
          <ResultItem>
            {item}
          </ResultItem>
        )
      })}
    </AppDiv>
  );
}

const StyledInput = styled.textarea`
  width: 100%;
  min-height: 200px;
  margin: 10px 0px;
  
`

const AppDiv = styled.div`
  margin: 0px auto;
  max-width: 500px;
  padding: 10px;
  text-align: center;
`

const StyledButton = styled.button`
  margin: 10px auto;
  height: 40px;
  width: 100px;
  border-radius: 10px;
`

const ResultItem = styled.div`
  text-align: justify;
  border: 3px dashed green;
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0;
`

export default App;
