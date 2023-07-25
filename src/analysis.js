import React, { useState, useEffect } from "react";
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
} from "semantic-ui-react";
import HamburgerMenu from "./hamenu";

const Analysis = () => {
  const queryparam = new URLSearchParams(window.location.search);
  const tableData = [
    {
      category: "Unopinionated",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      category: "Unopinionated",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      category: "Mildly Opinionated",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
    {
      category: "Opinionated",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
  ];

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

      <Table collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Unopinionated</Table.HeaderCell>
            <Table.HeaderCell>Mildly Opinionated</Table.HeaderCell>
            <Table.HeaderCell>Opinionated</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData.map((row, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                {row.category === "Unopinionated" ? row.content : ""}
              </Table.Cell>
              <Table.Cell>
                {row.category === "Mildly Opinionated" ? row.content : ""}
              </Table.Cell>
              <Table.Cell>
                {row.category === "Opinionated" ? row.content : ""}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
};
export default Analysis;
