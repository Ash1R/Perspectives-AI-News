import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import NavbarMb from "./NavbarMb";
import NavbarLg from "./NavbarLg";
export default function Navbar({ activeItem }) {
  const renderLinks = () => {
    return (
      <>
        <Link to="/">
          <Menu.Item name="home" active={activeItem === "home"} />
        </Link>

        <Link to="/calculator">
          <Menu.Item
            name="Opinion Detector"
            active={activeItem === "calculator"}
          />
        </Link>

        <Link to="/blog">
          <Menu.Item name="Blog" active={activeItem === "blog"} />
        </Link>

        <Link to="/about">
          <Menu.Item name="About Us" active={activeItem === "about"} />
        </Link>

        <Link to="/submit">
          <Menu.Item name="Submit Feedback" active={activeItem === "submit"} />
        </Link>
      </>
    );
  };

  const none = useMediaQuery({ query: "(max-width:576px)" });
  const sm = useMediaQuery({ query: "(min-width:576px)" });
  const md = useMediaQuery({ query: "(min-width:768px)" });
  const lg = useMediaQuery({ query: "(min-width:992px)" });
  const xl = useMediaQuery({ query: "(min-width:1200px)" });
  const xxl = useMediaQuery({ query: "(min-width:1400px)" });
  const size = { none, sm, md, lg, xl, xxl };
  return (
    <div>
      {size.sm ? (
        <NavbarLg renderLinks={renderLinks} />
      ) : (
        <NavbarMb renderLinks={renderLinks} />
      )}
    </div>
  );
}
