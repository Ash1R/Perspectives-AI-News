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
        <center>
          <h1>About Us</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras hendrerit viverra nunc, sit amet sagittis ligula fermentum in. Donec consectetur ex nibh, in lacinia risus laoreet vel. Donec metus purus, mattis vel magna in, pellentesque finibus tortor. Nullam hendrerit quam ut magna molestie, imperdiet venenatis lectus consequat. In accumsan at ante ut pretium. Duis porta tellus a eros scelerisque dapibus. Vestibulum iaculis felis non nisi imperdiet efficitur. Vestibulum non sapien in felis consectetur placerat eu vel diam. Donec libero quam, sagittis a elementum sed, facilisis et felis.</p>
          <div class="ui statistic">
          <div class="label">
            Articles Analyzed
          </div>
          <div class="value">
            40,509
          </div>
          </div>
        </center>
        </Container>
    )
};

export default About