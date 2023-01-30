import { useEffect, useState } from "react";
import styled from "styled-components";

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState([]);
  const [workText, setWorkText] = useState([]);

  useEffect(() => {
    setWorkText(() => text.split(' ')); // text splitted by ' ' symbol   
  }, [text])

  const handleClick = () => {

    if (text.length > 140) { //if text lenght less or equals 140 we just push it as a result

      const countOfFragments = Math.ceil((text.length + ((Math.ceil(text.length / 140).toString().length * 2) + 3) * Math.ceil(text.length / 140)) / 140)
      const resArr = []; //result
      let i = workText[0].length; // length of current fragment counter
      let j = 0; // offset
      let a = 1; // fragments counter

      while (a <= countOfFragments) {

        let item = '';

        while (

          i < 140 &&
          workText[j] !== undefined && // that means end of initial array
          (item.length + workText[j].length + countOfFragments.toString().length + a.toString().length + 2) <= 140 // that checks if result item length will less than 140 after adding suffix 

        ) {
          // ^ sum of length of current fragment, current word that we want to add, number of current dragment, number of count of fragments and symbols " /" 
          item += workText[j] + ' ';
          i = item.length;
          j++;
        }

        i = 0;
        resArr.push(item + a + '/' + countOfFragments);
        a++;

      }
      setResult(resArr);
    } else {
      setResult([text]);
    }

  }

  return (
    <AppDiv>
      input text:
      <StyledInput onChange={(e) => setText(e.target.value)}>
      </StyledInput>
      <StyledButton onClick={handleClick}>
        run
      </StyledButton>
      <br />
      result: {result.map((item, index) => {
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