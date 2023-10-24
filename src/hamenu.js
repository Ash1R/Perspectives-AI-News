import React, { useState } from "react";
import { Menu, Icon, Input, Dropdown, Flag } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const HamburgerMenu = (props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [value, setValue] = useState("us");
  const handleClick = (e, { value }) => {
    setValue(value);
  };

  const languages = ["us", "ca", "fr", "in"];

  return (
    <Menu stackable fluid fitted>
      <Menu.Item>
        <Icon name="bars" size="large" onClick={handleToggleMenu} />
      </Menu.Item>
      {isOpen && (
        <Menu.Menu>
          <Link to="/">
            <Menu.Item header as="h3" name="Home" />
          </Link>
          <Link to="/calculator">
            {" "}
            <Menu.Item
              position="left"
              header
              as="h3"
              name="Opinion Dectector"
            />
          </Link>
          <Link to="/blog">
            {" "}
            <Menu.Item position="left" header as="h3" name="Blog" />
          </Link>
          <Link to="/about">
            {" "}
            <Menu.Item position="left" header as="h3" name="About Us" />
          </Link>
          <Link to="/submit">
            <Menu.Item
              position="left"
              header
              as="h3"
              name="submit your project or feedback"
            />
          </Link>

          <Menu.Item position="left" header as="h3" name="please donatw">
            Please donate
          </Menu.Item>
        </Menu.Menu>
      )}
    </Menu>
  );
};

export default HamburgerMenu;
