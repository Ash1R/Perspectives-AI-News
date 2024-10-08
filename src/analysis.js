import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Container,
  Grid,
  Card,
  Loader,
  Header,
  Divider,
  Image,
  Segment,
} from "semantic-ui-react";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import Navbar from "./Navbar";
import ArticlePlaceholder from "./ArticlePlaceholder";

const Analysis = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idFromQuery = queryParams.get("id");

  const [data, setData] = useState(null);
  const [categorizedData, setCategorizedData] = useState([]);

  useEffect(() => {
    const db = getFirestore();

    const fetchData = async () => {
      try {
        const docRef = doc(db, "topics", idFromQuery);
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
  }, []);

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

      setCategorizedData(categorizedNews);
    }
  }, [data]);

  return (
    <>
      {data && (
        <Container>
          <Header textAlign="center" style={{ marginTop: "20px" }} size="huge">
            Perspectives
          </Header>
          <Navbar />
          <Divider />

          <Header style={{ textAlign: "center" }} as="h2">
            The Algorithm Detected a Topic: {data["keyword"]}
          </Header>

          <Header style={{ textAlign: "center", margin: "20px 0" }} as="h4">
            Here Are the Different Perspectives
          </Header>

          <Divider hidden />

          <Grid columns={4} stackable centered>
            {[
              "Opinionated",
              "Mildly Opinionated",
              "Unopinionated",
              "Unable to categorize",
            ].map((category) => (
              <Grid.Column key={category} style={{ maxWidth: "400px" }}>
                <Segment>
                  <Header textAlign="center">{category}</Header>

                  {categorizedData[category] ? (
                    categorizedData[category].map((newsItem, index) => (
                      <Container key={index}>
                        <Divider />
                        <h4 style={{ color: "gray" }}>
                          Opinion score: {newsItem["key"]}
                        </h4>
                        <Divider hidden />
                        <a
                          href={newsItem["value"]["url"]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Card style={{ margin: "auto", width: "100%" }}>
                            <Image
                              src={newsItem["value"]["urlToImage"]}
                              wrapped
                              ui={false}
                            />
                            <Card.Content>
                              <Card.Header>
                                {newsItem["value"]["title"]}
                              </Card.Header>
                              <Card.Description>
                                {newsItem["value"]["description"]}
                              </Card.Description>
                            </Card.Content>
                          </Card>
                        </a>
                      </Container>
                    ))
                  ) : (
                    <Loader active>Loading...</Loader>
                  )}
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </Container>
      )}
      {!data && <ArticlePlaceholder />}
    </>
  );
};
export default Analysis;
