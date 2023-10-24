import { Menu, Segment } from "semantic-ui-react";
export default function NavbarLg({ renderLinks }) {
  return (
    <Segment attached size="mini">
      <Menu secondary>{renderLinks()}</Menu>
    </Segment>
  );
}
