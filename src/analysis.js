import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Container,
  Grid,
  Card,
  Loader,
  Message,
  Header,
  Divider,
  Image,
  Table,
  Menu,
  Segment,
} from "semantic-ui-react";
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import HamburgerMenu from "./hamenu";
import { initializeApp } from "firebase/app";

const Analysis = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [data, setData] = useState(null);
  const [categorizedData, setCategorizedData] = useState([]);

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

  useEffect(() => {
    const db = getFirestore();

    const fetchData = async () => {
      try {
        const docRef = doc(db, "topics", id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setData(docSnapshot.data());
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      const categorized = [];

      for (const key in data) {
        if (
          data.hasOwnProperty(key) &&
          key !== "cat" &&
          key !== "country" &&
          key !== "date" &&
          key !== "keyword"
        ) {
          const numericalValue = parseFloat(key);

          let category = "Unable to categorize";

          if (!isNaN(numericalValue)) {
            if (numericalValue >= 0.9 && numericalValue <= 0.97) {
              category = "Unopinionated";
            } else if (numericalValue >= 0.8 && numericalValue < 0.9) {
              category = "Mildly Opinionated";
            } else if (numericalValue < 0.8) {
              category = "Opinionated";
            }
          }

          categorized.push({ key, value: data[key], category });
        }
      }
      console.log(categorized);
      const categorizedNews = {
        Unopinionated: [],
        "Mildly Opinionated": [],
        Opinionated: [],
        "Unable to categorize": [],
      };
      categorized.forEach((newsItem) => {
        const { category } = newsItem;
        categorizedNews[category].push(newsItem);
      });
      console.log(categorizedNews);
      console.log(categorizedNews["Unopinionated"]);
      setCategorizedData(categorizedNews);
    }
  }, [data]);

  return (
    <Container>
      <Header style={{ textAlign: "center", marginTop: "5px" }} size="huge">
        Perspectives
      </Header>
      <HamburgerMenu></HamburgerMenu>
      <Divider></Divider>
      <Divider hidden></Divider>

      <Card style={{ margin: "auto" }}>
        <Image wrapped ui={false} />
        <Card.Content>
          <Card.Header>{"hi"}</Card.Header>
          <Card.Description>{"hhhhhhhhhh"}</Card.Description>
        </Card.Content>
      </Card>
      <Divider hidden></Divider>
      <Divider hidden></Divider>
      <Divider hidden></Divider>

      <Header style={{ margin: "auto" }} as="h2">
        More Perspectives
      </Header>
      <Divider hidden></Divider>
      <Divider hidden></Divider>
      <Grid columns={3} stackable>
        <Grid.Column>
          <Segment>
            <Header>Opinionated</Header>
            {categorizedData["Opinionated"] ? (
              categorizedData["Opinionated"].map((newsItem, index) => (
                <Card key={index} style={{ margin: "auto" }}>
                  <Image src={newsItem["value"]["urlToImage"]} />
                  <Card.Content>
                    <Card.Header>{newsItem["value"]["title"]}</Card.Header>
                    <Card.Description>
                      {truncateDescription(newsItem["value"]["description"])}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <Loader active>Loading...</Loader>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header>Mildly Opinionated</Header>
            {categorizedData["Mildly Opinionated"] ? (
              categorizedData["Mildly Opinionated"].map((newsItem, index) => (
                <Card key={index} style={{ margin: "auto" }}>
                  <Image src={newsItem["value"]["urlToImage"]} />
                  <Card.Content>
                    <Card.Header>{newsItem["value"]["title"]}</Card.Header>
                    <Card.Description>
                      {truncateDescription(newsItem["value"]["description"])}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <Loader active>Loading...</Loader>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header>Unopinionated</Header>
            {categorizedData["Unopinionated"] ? (
              categorizedData["Unopinionated"].map((newsItem, index) => (
                <Card key={index} style={{ margin: "auto" }}>
                  <Image src={newsItem["value"]["urlToImage"]} />
                  <Card.Content>
                    <Card.Header>{newsItem["value"]["title"]}</Card.Header>
                    <Card.Description>
                      {truncateDescription(newsItem["value"]["description"])}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <Loader active>Loading...</Loader>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default Analysis;
