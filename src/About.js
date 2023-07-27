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
    return(
        <Container>
        <Header style={{ textAlign: "center", marginTop: "5px" }} size="huge">Perspectives</Header>
        <HamburgerMenu></HamburgerMenu>

        <Divider></Divider>
        <Divider hidden></Divider>
        </Container>
    )
};

export default About