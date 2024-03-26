import * as React from 'react';
import { Page, PageSection, Title,TextArea, Button } from '@patternfly/react-core';

const SummaryApp: React.FunctionComponent = () => {
  const [data, setData] = React.useState('');
  const [inputPrompt ,setInputPrompt] = React.useState({});

  const handlePrompt = (event) =>{
    setInputPrompt({"messages": [
        {
          "content": "You only summarize Text in Bullet points",
          "role": "system"
        },
        {
          "content": event.target.value,
          "role": "user"
        },
      ]});
  }
  
  const handleButtonClick = () =>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(inputPrompt);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch("http://localhost:62049/v1/chat/completions", requestOptions)
    .then((response) => response.json())
    .then((result) => setData(result.choices[0].message.content))
    .catch((error) => console.error(error))
};

  return (
    <Page>
      <PageSection>
        <Title headingLevel="h1" size="lg">Claim Summarizer</Title>
      </PageSection>
      <TextArea
      placeholder='Copy and Paste Your Claim Here'
      autoResize={true}
      onChange={handlePrompt}
      style={{}}
      >
      </TextArea>
      <br />
      <TextArea
      autoResize={true}
      disabled={true}
      placeholder='Claim Summary ...'
      value={data ? data: ""}
      style={{minHeight:"300px"}}
      >
      </TextArea>
      <Button variant="primary" 
              ouiaId="Summarize" 
              size="sm"
              style={{width: "50%", margin: "auto", marginTop: "25px", marginBottom:"25px"}}
              onClick={handleButtonClick}
              >
        Summarize
      </Button>
    </Page>
  )
}

export { SummaryApp };
