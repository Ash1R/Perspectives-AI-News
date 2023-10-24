import React, { useState, useEffect } from "react";
import { Card, Image, Container, Divider, Header } from "semantic-ui-react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";

const BlogPost = ({ title, author, content }) => {
  const url = new URLSearchParams(window.location.search);
  const id = url.get("id");

  const [blogData, setBlogData] = useState({ title: "", author: "", text: "" });

  useEffect(() => {
    const fetchBlogData = async () => {
      const db = getFirestore();
      const docRef = doc(db, "blog", id);

      try {
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          console.log("yes!");
          let x = docSnapshot.data();
          x.text = x.text.replace(/\\n/g, "\n");
          setBlogData(x);
          console.log(x);
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchBlogData();
    console.log(blogData);
  }, [id]);

  return (
    <Container>
      <Header style={{ textAlign: "center", marginTop: "5px" }} size="huge">
        Perspectives
      </Header>
      <Navbar activeItem="blog" />
      <Divider></Divider>
      <h2>{blogData.title}</h2>
      <p>{blogData.author}</p>
      <Divider hidden></Divider>
      <p style={{ whiteSpace: "pre-line" }}>{blogData.text}</p>
    </Container>
  );
};

export default BlogPost;
