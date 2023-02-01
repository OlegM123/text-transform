import { useEffect, useState } from "react";
import styled from "styled-components";

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

  const handleClick = () => {

    if (text.length > msgLimit) { //if text lenght less or equals 140 we just push it as a result

      const resArr = []; //result
      let i = workText[0].length; // length of current fragment counter
      let offset = 0; // offset
      let fragmentCounter = 1; // fragments counter

      while (workText[offset] !== undefined) {
        let item = '';

        while (
          i < msgLimit &&
          workText[offset] !== undefined && // that means end of initial array
          (item.length + workText[offset].length + countOfFragments.toString().length + fragmentCounter.toString().length + 2) <= msgLimit // that checks if result item length will less than 140 after adding suffix 
        ) {
          // ^ sum of length of current fragment, current word that we want to add, number of current dragment, number of count of fragments and symbols " /" 
          item += workText[offset] + ' ';
          i = item.length;
          offset++;
        }

        i = 0;
        resArr.push(item + fragmentCounter + '/' + countOfFragments);
        fragmentCounter++;

      }
      setResult(resArr.map(item => { return item.substring(0, item.length - fragmentCounter.toString().length) + `${fragmentCounter - 1}` }));
    } else {
      setResult([text]);
    }
  }

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
        onClick={handleClick}
        disabled={minMsgLimit > msgLimit || text.trim() === ''}
      >
        RUN
      </StyledButton>
      <br />
      {minMsgLimit > msgLimit && 'Message limit is too small'}
      {!!result.length && result.map((item, index) => {
        return (
          <ResultItem key={index}>
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