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

function SubmitProjectForm() {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
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
              <input name="Name" placeholder="Name" type="text" required />
            </Form.Field>
            <Form.Field>
              <label>Email*</label>
              <input name="Email" placeholder="Email" type="email" required />
            </Form.Field>
            <Form.Field>
              <label>Project Link, Document, or Site</label>
              <input
                name="ProjectLink"
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
              href="https://github.com/yourusername/your-repo"
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
