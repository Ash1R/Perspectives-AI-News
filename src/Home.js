import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Input,
  Dropdown,
  Header,
  Divider,
  Image,
  Button,
  Card,
} from "semantic-ui-react";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import "./styles.css"; // Import the CSS file you created
import Navbar from "./Navbar";

const App = () => {
  const [value, setValue] = useState("United States");

  const handleClick = (e, { value }) => {
    setValue(value);
  };

  useEffect(() => {
    handleSearch(date2, "");
  }, []);

  const languages = ["us", "fr", "ca", "in", "au", "nz", "uk"];
  const map = new Map();
  map.set("us", "United States");
  map.set("fr", "France");
  map.set("ca", "Canada (beta, English)");
  map.set("uk", "United Kingdom (beta)");
  map.set("au", "Australia (beta)");
  map.set("nz", "New Zealand (beta)");
  map.set("in", "India (beta, English)");

  function formatDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const d = new Date("2023-09-13");
  const [newsData, setNewsData] = useState([]);
  const [date2, setdate2] = useState(formatDate(d));

  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const truncateDescription = (description, maxLength) => {
    console.log(description);
    if (description == null) {
      return "";
    }
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + "...";
  };

  const handleSearch = async (dat, val) => {
    const isNumeric = async (str) => {
      if (typeof str != "string") return false; // we only process strings!
      return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
      ); // ...and ensure strings of whitespace fail
    };

    try {
      const db = getFirestore();
      // Create a query to filter documents based on whether the search string is contained in the name field
      const q = query(collection(db, "topics"), where("date", "==", dat));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Process the data and update the search results
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(results);
      var returnVal = [];
      for (const result in results) {
        var inputObject = results[result];
        console.log(inputObject);
        let highestValue = -Infinity;
        let chosenKey = "inf";
        let highestnon = -1;
        for (const key in inputObject) {
          if (inputObject.hasOwnProperty(key)) {
            const value = inputObject[key];

            if (
              isNumeric(key) &&
              Number(key) <= 1 &&
              Number(key) !== Infinity &&
              Number(key) > highestValue
            ) {
              highestValue = value;
              chosenKey = key;
            }

            if (isNumeric(key) && Number(key) > 1 && Number(key) !== Infinity) {
              highestnon = key;
            }
          }
        }

        if (highestnon != -1 && chosenKey == "inf") {
          chosenKey = highestnon;
        }
        console.log(chosenKey);

        const newObject = {
          cat: inputObject.cat,
          date: inputObject.date,
          id: inputObject.id,
          keyword: inputObject.keyword,
        };

        const returnObj = { ...newObject, ...inputObject[chosenKey] };
        returnVal.push(returnObj);
      }

      console.log(returnVal);

      const groupedArticles = {};

      returnVal.forEach((article) => {
        const cate = article.cat;
        if (!groupedArticles[cate]) {
          groupedArticles[cate] = [];
        }
        groupedArticles[cate].push(article);
      });

      console.log(groupedArticles);
      setNewsData([]);
      setNewsData(groupedArticles);
    } catch (error) {
      console.log("failed to set data");
      setSearchResults([]);
    }
    console.log("does this end");
  };

  return (
    <Container style={{ backgroundColor: "#f7f9fc" }}>
      <Container style={{ paddingTop: "20px" }}>
        <Header textAlign="center" size="huge">
          Perspectives
        </Header>
        <Navbar activeItem="home" />
        <Divider />

        <Grid columns={3} stackable>
          <Grid.Column computer={12}>
            {Object.entries(newsData).map(([category, articles]) => (
              <div key={category}>
                <Header as="h2" color="blue">
                  {category}
                </Header>
                <Grid columns={2} stackable doubling>
                  {articles.map((article) => (
                    <Grid.Column key={article.title}>
                      <Link to={`/analysis?id=${article.id}`}>
                        <Card fluid>
                          <Image
                            src={article.urlToImage}
                            alt={"image blocked"}
                          />
                          <Card.Content>
                            <Card.Header>{article.title}</Card.Header>
                            <Card.Meta>{article.author}</Card.Meta>
                            <Card.Description>
                              {truncateDescription(article.description, 50)}
                            </Card.Description>
                          </Card.Content>
                        </Card>
                      </Link>
                    </Grid.Column>
                  ))}
                </Grid>
                <Divider />
              </div>
            ))}
          </Grid.Column>

          <Grid.Column computer={4}>
            <Header as="h2" color="purple">
              Settings
            </Header>
            <Divider />

            <label style={{ color: "gray" }}>Country (coming soon!):</label>
            <Dropdown
              text={map.get(value)}
              value={value}
              onChange={handleClick}
              options={languages.map((lang) => ({
                key: lang,
                value: lang,
                flag: lang,
                text: map.get(lang),
              }))}
            />

            <Divider />

            <Input
              onChange={(e) => setdate2(e.target.value)}
              value={date2}
              label="Date"
            />
            <Button
              basic
              onClick={() => handleSearch(date2, "")}
              style={{ margin: 5 }}
            >
              Get News
            </Button>
            <Divider hidden />
          </Grid.Column>
        </Grid>
      </Container>
    </Container>
  );
};

export default App;
