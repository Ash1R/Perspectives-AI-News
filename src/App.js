import React, { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  Loader,
  Message,
  Header,
  Divider,
  Image,
} from "semantic-ui-react";
import BlogPage from "./BlogPage";
import "./BlogPage.css"; // Import the custom CSS

import Home from "./Home";
import Analysis from "./analysis";
import OpinionatednessCalculator from "./opinionator";
import BlogPost from "./BlogPost";
import SubmitProjectForm from "./submit";
import About from "./About";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/calculator" element={<OpinionatednessCalculator />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/post" element={<BlogPost />} />
      <Route path="/submit" element={<SubmitProjectForm />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
