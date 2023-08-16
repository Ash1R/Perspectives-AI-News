import React, { useState } from "react";
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

function SubmitProjectForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectLink, setProjectLink] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      Name: name,
      Email: email,
      ProjectLink: projectLink,
    };
    console.log(data);

    // Clear state variables
    setName("");
    setEmail("");
    setProjectLink("");
  };

  return (
    <Container>
      <Header style={{ textAlign: "center", marginTop: "5px" }} size="huge">
        Perspectives
      </Header>
      <HamburgerMenu></HamburgerMenu>

      <Divider></Divider>
      <Divider hidden></Divider>

      <Grid centered columns={2}>
        <Grid.Column>
          <Header as="h2">Submit your project!</Header>
          <p>
            ...or idea... or your thoughts. We want to promote computational
            journalism, so whatever you say, we'll feature on our blog!
          </p>
          <Form className="submit-form" onSubmit={onSubmit}>
            <Form.Field>
              <label>Name*</label>
              <input
                name="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                type="text"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Email*</label>
              <input
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Project Link, Document, or Site</label>
              <input
                name="ProjectLink"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                placeholder="Project Link"
                type="text"
                required
              />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
          <p>
            Check out our code on
            <a
              href="https://github.com/Ash1R/Perspectives/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              our GitHub
            </a>
          </p>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default SubmitProjectForm;
