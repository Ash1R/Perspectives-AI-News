import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  Input,
  Dropdown,
  Header,
  Divider,
  Image,
} from "semantic-ui-react";
import HamburgerMenu from "./hamenu";

const App = () => {
  const [value, setValue] = useState("United States");
  const handleClick = (e, { value }) => {
    setValue(value);
  };

  const languages = ["us", "fr", "ca", "in", "au", "nz", "uk"];
  const map = new Map();
  map.set("us", "United States");
  map.set("fr", "France");
  map.set("ca", "Canada (beta, English)");
  map.set("uk", "United Kingdom (beta)");
  map.set("au", "Australia (beta)");
  map.set("nz", "New Zealand (beta)");
  map.set("in", "India (beta, English)");

  const d = new Date();
  const [date, setDate] = useState(d.toString());
  const newsData = [
    {
      title: "Breaking News",
      image: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et rutrum mauris, et tincidunt est.",
      id: "1",
    },
    {
      title: "Latest Update",
      image: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque condimentum, ullamcorper mi eu, commodo felis.",
      id: "2",
    },
    {
      title: "Breaking News",
      image: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et rutrum mauris, et tincidunt est.",
      id: "1",
    },
    {
      title: "Latest Update",
      image: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque condimentum, ullamcorper mi eu, commodo felis.",
      id: "2",
    },
    {
      title: "Breaking News",
      image: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et rutrum mauris, et tincidunt est.",
      id: "1",
    },
    {
      title: "Latest Update",
      image: "",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut neque condimentum, ullamcorper mi eu, commodo felis.",
      id: "2",
    },
    // Add more news items here...
  ];

  return (
    <Container>
      <Header style={{ textAlign: "center", marginTop: "5px" }} size="huge">
        Perspectives
      </Header>
      <HamburgerMenu date={date}></HamburgerMenu>

      <Divider></Divider>
      <Grid columns={3} stackable>
        <Grid.Column computer={12}>
          <Header as="h2">Politics</Header>

          {newsData
            .filter((news, index) => index % 2 === 0)
            .map((news, index) => (
              <Container>
                <Grid.Row
                  style={{ display: "flex", justifyContent: "space-between" }}
                  computer={6}
                  key={index}
                >
                  <Link to={"/analysis?id=" + newsData[index].id}>
                    <Card>
                      <Image src={newsData[index].image} wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{newsData[index].title}</Card.Header>
                        <Card.Description>
                          {newsData[index].description}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Link>
                  <Link to={"/analysis?id=" + newsData[index + 1].id}>
                    <Card>
                      <Image
                        src={newsData[index + 1].image}
                        wrapped
                        ui={false}
                      />
                      <Card.Content>
                        <Card.Header>{newsData[index + 1].title}</Card.Header>
                        <Card.Description>
                          {newsData[index + 1].description}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Link>
                </Grid.Row>
              </Container>
            ))}
        </Grid.Column>

        <Grid.Column computer={4}>
          <Header as="h2">Settings</Header>
          <Divider></Divider>
          <label>Country: </label>
          <Dropdown text={value} value={value}>
            <Dropdown.Menu>
              {languages.map((lang) => (
                <Dropdown.Item
                  key={lang}
                  flag={{ name: lang }}
                  value={map.get(lang)}
                  text={map.get(lang)}
                  onClick={handleClick}
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Divider></Divider>
          <Input
            onChange={(e) => setDate(e.target.value)}
            value={date}
            label="date"
          ></Input>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default App;
