import React from "react";
import { Card, Image, Container, Divider, Header } from "semantic-ui-react";
import HamburgerMenu from "./hamenu";
const BlogPost = ({ title, author, content }) => {
  const url = new URLSearchParams(window.location.search);
  const id = url.get("id");

  return (
    <Container>
      <Header style={{ textAlign: "center", marginTop: "5px" }} size="huge">
        Perspectives
      </Header>
      <HamburgerMenu></HamburgerMenu>
      <Divider></Divider>
      <h2>the metaverse and its consequences</h2>
      <p>by ashir rao</p>
      <Divider hidden></Divider>
      <p>
        mark zuckerberg is modern hitler. the tech companies are oligarchs and
        its every software developer's solemn duty to halt the techno-apocalypse
        towards which we are hurtling
      </p>
    </Container>
  );
};

export default BlogPost;
