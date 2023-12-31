import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Dropdown,
  Header,
  Divider,
  Image,
  Card,
  Placeholder,
} from "semantic-ui-react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import "./styles.css"; // Import the CSS file you created
import Navbar from "./Navbar";
import ArticlePlaceholder from "./ArticlePlaceholder";

const App = () => {
  const [value, setValue] = useState("us");

  const handleClick = (e, { value }) => {
    setValue(value);
  };

  const languages = ["us", "fr"];
  const map = new Map();
  map.set("us", "United States");
  map.set("fr", "France (may contain some English articles)");

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function convertDateToPST(date) {
    return new Date(
      date.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      })
    );
  }

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  // null newsdata means nothing is known and show placeholder.
  // [] means an empty result was returned.
  const [newsData, setNewsData] = useState(null);
  const [date2, setdate2] = useState(convertDateToPST(new Date()));

  useEffect(() => {
    setNewsData(null);
    handleSearch(date2, "");
  }, [date2, value]);

  const truncateDescription = (description, maxLength) => {
    //console.log(description);
    if (description == null) {
      return "";
    }
    if (description.length <= maxLength) {
      return description;
    }
    return description.slice(0, maxLength) + "...";
  };

  const handleSearch = async (d, val) => {
    const dat = formatDate(d);
    console.log(dat);
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
      const searchmap = new Map();
      searchmap.set("United States", "us");
      searchmap.set("France", "fr");
      console.log(value);
      console.log(searchmap.get(value));
      const q = query(
        collection(db, "topics"),
        where("date", "==", dat),
        where("country", "==", value)
      );

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Process the data and update the search results
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Results:::", results);
      var returnVal = [];
      for (const result in results) {
        var inputObject = results[result];
        //console.log(inputObject);
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
        //console.log(chosenKey);

        const newObject = {
          cat: inputObject.cat,
          date: inputObject.date,
          id: inputObject.id,
          keyword: inputObject.keyword,
        };

        const returnObj = { ...newObject, ...inputObject[chosenKey] };
        returnVal.push(returnObj);
      }

      //console.log(returnVal);

      const groupedArticles = {};

      returnVal.forEach((article) => {
        const cate = article.cat;
        if (!groupedArticles[cate]) {
          groupedArticles[cate] = [];
        }
        groupedArticles[cate].push(article);
      });

      //console.log(groupedArticles);
      //setNewsData([]);
      setNewsData(groupedArticles);
    } catch (error) {
      console.log(error);
      console.log("failed to set data");
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
          <Grid.Column computer={4}>
            <Header as="h2" color="blue">
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

            <DatePicker
              showIcon
              wrapperClassName="datePicker"
              selected={date2}
              onChange={(date) => setdate2(convertDateToPST(date))}
            />
            <Divider hidden />
          </Grid.Column>
          {!newsData && <Placeholder />}
          {newsData && Object.keys(newsData).length === 0 && (
            <Card>
              <Card.Content header="No data found!" />
              <Card.Content
                description={
                  "Unfortunately no data found for this date " +
                  formatDate(date2)
                }
              />
            </Card>
          )}
          {newsData && Object.keys(newsData).length > 0 && (
            <Grid.Column computer={12}>
              {Object.entries(newsData).map(([category, articles]) => (
                <div key={category}>
                  <Header as="h2" color="blue">
                    {capitalize(category)}
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
          )}
        </Grid>
      </Container>
    </Container>
  );
};

export default App;
