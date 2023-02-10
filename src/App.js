import { useEffect, useState } from "react";
import styled from "styled-components";
import textTransform from "./TextTransform.ts";

function App() {

  const [msgLimit, setMsgLimit] = useState(140);
  const [minMsgLimit, setMinMsgLimit] = useState(0);
  const [text, setText] = useState('');
  const [result, setResult] = useState([]);
  const [workText, setWorkText] = useState([]);
  const countOfFragments = workText.join().length > msgLimit ?
    Math.ceil((text.length + ((Math.ceil(text.length / msgLimit).toString().length * 2) + 3) * Math.ceil(text.length / msgLimit)) / msgLimit)
    : 1;

  useEffect(() => {
    setWorkText(() => text.split(' ')); // text splitted by ' ' symbol  
    setResult([]);
  }, [text]);

  useEffect(() => {
    setMinMsgLimit(
      workText?.reduce((max, item) => max.length > item.length ? max : item, '').length + (countOfFragments > 1 ? (countOfFragments.toString().length) * 2 + 2 : 0)
    );
  }, [workText, countOfFragments]);

  return (
    <AppDiv>
      Enter the limit:
      <br />
      <input type="number" onChange={(e) => setMsgLimit(e.target.value.trim())} value={msgLimit} />
      <br />
      Enter the text:
      <StyledInput onChange={(e) => setText(e.target.value.trim())}>
      </StyledInput>
      <StyledButton
        onClick={() => setResult(textTransform(text, msgLimit))}
        disabled={minMsgLimit > msgLimit || text.trim() === ''}
      >
        RUN
      </StyledButton>
      <br />
      { minMsgLimit > msgLimit && 'Message limit is too small' }
  {
    !!result.length && result.map((item, index) => {
      return (
        <ResultItem key={index}>
          {item}
        </ResultItem>
      )
    })
  }
    </AppDiv >
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
  height: 30px;
  width: 70px;
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