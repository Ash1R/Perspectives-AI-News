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
import HamburgerMenu from "./hamenu";
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
const App = () => {
  const [value, setValue] = useState("United States");
  const [trigger, setTrigger] = useState(true);

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

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const d = new Date();
  const [date, setDate] = useState(formatDate(d));
  const [newsData, setNewsData] = useState([]);

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

  const handleSearch_ = async (dat, val) => {
    function isNumeric_(str) {
      if (typeof str != "string") return false; // we only process strings!
      return (
        !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
      ); // ...and ensure strings of whitespace fail
    }
    function processObject_(inputObject) {
      let highestValue = -Infinity;
      let chosenKey = null;

      for (const key in inputObject) {
        if (inputObject.hasOwnProperty(key)) {
          const value = inputObject[key];

          if (
            isNumeric_(key) &&
            Number(key) <= 1 &&
            Number(key) !== Infinity &&
            Number(key) > highestValue
          ) {
            highestValue = value;
            chosenKey = key;
          }
        }
      }

      if (chosenKey === null) {
        return null;
      }

      const newObject = {
        cat: inputObject.cat,
        date: inputObject.date,
        id: inputObject.id,
        keyword: inputObject.keyword,
      };

      const returnObj = { ...newObject, ...inputObject[chosenKey] };

      return returnObj;
    }

    try {
      const db = getFirestore();
      // Create a query to filter documents based on whether the search string is contained in the name field
      const q = query(collection(db, "topics"), where("date", ">=", dat));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Process the data and update the search results
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      var returnVal = [];
      for (const result in results) {
        returnVal.push(processObject_(results[result]));
      }

      const groupedArticles = {
        general: [],
        business: [],
        science: [],
        health: [],
        sports: [],
        technology: [],
        entertainment: [],
      };

      returnVal.forEach((article) => {
        const cate = article.cat;
        if (!groupedArticles[cate]) {
          groupedArticles[cate] = [];
        }
        groupedArticles[cate].push(article);
      });

      console.log(groupedArticles);

      await setNewsData(groupedArticles);
    } catch (error) {
      setSearchResults([]);
    }
  };
  useEffect(async () => {
    const handleSearch = async (dat, val) => {
      const isNumeric = async (str) => {
        if (typeof str != "string") return false; // we only process strings!
        return (
          !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
          !isNaN(parseFloat(str))
        ); // ...and ensure strings of whitespace fail
      };
      const processObject = async (inputObject) => {
        let highestValue = -Infinity;
        let chosenKey = null;

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
          }
        }

        if (chosenKey === null) {
          return null;
        }

        const newObject = {
          cat: inputObject.cat,
          date: inputObject.date,
          id: inputObject.id,
          keyword: inputObject.keyword,
        };

        const returnObj = { ...newObject, ...inputObject[chosenKey] };

        return returnObj;
      };

      try {
        const db = getFirestore();
        // Create a query to filter documents based on whether the search string is contained in the name field
        const q = query(collection(db, "topics"), where("date", ">=", dat));

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
          let highestValue = -Infinity;
          let chosenKey = null;

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
            }
          }

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

        setNewsData(groupedArticles);
      } catch (error) {
        setSearchResults([]);
      }
    };
    handleSearch(date, value);
  }, []);

  return (
    <Container>
      <Header style={{ textAlign: "center", marginTop: "5px" }} size="huge">
        Perspectives
      </Header>
      <HamburgerMenu></HamburgerMenu>

      <Divider></Divider>
      <Grid columns={3} stackable>
        <Grid.Column computer={12}>
          {Object.entries(newsData).map(([category, articles]) => (
            <div key={category}>
              <Header as="h2">{category}</Header>
              <Grid columns={2} stackable doubling>
                {articles.map((article) => (
                  <Grid.Column key={article.title}>
                    <Link to={"/analysis?id=" + article.id}>
                      <Card fluid>
                        <Image src={article.urlToImage} alt={article.title} />
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
          <Divider hidden></Divider>
          <Button onClick={() => handleSearch_(date, value)}>reload</Button>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default App;
