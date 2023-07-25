import React, { useState } from "react";
import {
  Form,
  Input,
  Message,
  Grid,
  Header,
  Divider,
  Container,
  Button,
  Dropdown,
} from "semantic-ui-react";
import "./OpinionatednessCalculator.css"; // Custom CSS file
import HamburgerMenu from "./hamenu";

const OpinionatednessCalculator = () => {
  const [inputText, setInputText] = useState("");
  const [opinionatedness, setOpinionatedness] = useState(null);
  const [language, setLang] = useState("English");

  var languages = ["English", "French"];

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  const handleClick = (e, { value }) => {
    setLang(value);
  };

  const calculateOpinionatedness = () => {
    // Simple example calculation: Count the number of exclamation marks in the input text
    const exclamationMarks = (inputText.match(/!/g) || []).length;
    const totalChars = inputText.length;

    // Calculate opinionatedness on a scale of 0 to 1
    const calculatedOpinionatedness = exclamationMarks / totalChars;

    // Set the calculated value to the state
    setOpinionatedness(calculatedOpinionatedness);
  };

  return (
    <Container>
      <Grid centered>
        <Header style={{ textAlign: "center", marginTop: "20px" }} size="huge">
          Perspectives
        </Header>
        <HamburgerMenu></HamburgerMenu>
        <Divider hidden></Divider>
        <Divider hidden></Divider>
        <Grid.Column mobile={16} tablet={8} computer={12}>
          <Header style={{ margin: "auto" }}>about opinion detector:</Header>
          <Divider hidden></Divider>
          <p style={{ margin: "auto" }}>
            Opinion detector uses the Word Mover's Distance formula to compute
            the distance from a precomputed lexicon of "biased" words (see blog
            for methodology) and the text you input here.
          </p>
          <Divider></Divider>
          <Form>
            <Form.Field>
              <label>Enter your text:</label>
              <Input
                style={{ borderStyle: "solid" }}
                className="half-height-input"
                placeholder="Type here..."
                value={inputText}
                onChange={handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              {" "}
              <Button
                color="blue"
                size="huge"
                onClick={calculateOpinionatedness}
              >
                Analyze
              </Button>
              <Divider hidden vertical />
              <Dropdown
                style={{ marginLeft: "20px", borderStyle: "dotted" }}
                text={language}
                value={language}
              >
                <Dropdown.Menu>
                  {languages.map((lang) => (
                    <Dropdown.Item
                      key={lang}
                      flag={{ name: lang }}
                      value={lang}
                      text={lang}
                      onClick={handleClick}
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Field>
          </Form>
          {opinionatedness !== null && (
            <Message>
              <p>
                Opinionatedness level: {opinionatedness.toFixed(2)} (0 =
                completely opinionated, 1 = completely unopinionated. Vast
                majority of text falls between 0.6 and 1.0)
              </p>
            </Message>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default OpinionatednessCalculator;
