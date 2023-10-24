import React from "react";
import {
  Form,
  Button,
  Grid,
  Container,
  Header,
  Divider,
} from "semantic-ui-react";
import "./SubmitProjectForm.css";
import HamburgerMenu from "./hamenu";

function About() {
  return (
    <Container>
      <Header style={{ textAlign: "center", marginTop: "5px" }} size="huge">
        Perspectives
      </Header>
      <HamburgerMenu></HamburgerMenu>
      <Divider></Divider>
      <Divider hidden></Divider>
      <center>
        <h1>About Us</h1>
        <p>
          Perspectives is your window to diverse views. At Perspectives, we're
          dedicated to providing you with a curated collection of news and
          articles that cover a wide spectrum of opinions on various topics. Our
          innovative algorithm scours the web to uncover articles spanning from
          strongly opinionated pieces to neutral and informative content. Our
          Mission: To empower you with a comprehensive understanding of current
          affairs by presenting you with articles that reflect diverse
          viewpoints. We believe that exploring a range of opinions can lead to
          more informed and well-rounded perspectives.
        </p>
        <div class="ui statistic">
          <div class="label">Articles Analyzed</div>
          <div class="value">51,000+</div>
        </div>
      </center>
    </Container>
  );
}

export default About;
