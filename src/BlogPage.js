import React, { useEffect, useState } from "react";
import { Container, Card, Header, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Navbar from "./Navbar";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    // Fetch documents from the "blog" collection
    const firestore = getFirestore();
    const fetchBlogPosts = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "blog"));
        const blogPostsData = snapshot.docs.map((doc) => doc.data());
        setBlogPosts(blogPostsData);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);
  return (
    <Container>
      <Header style={{ textAlign: "center", marginTop: "5px" }} size="huge">
        Perspectives
      </Header>
      <Navbar activeItem="blog" />

      <Divider></Divider>
      <Header as="h1" textAlign="center">
        Blog
      </Header>
      <Divider hidden></Divider>
      <Divider hidden></Divider>

      <Card.Group centered stackable>
        {blogPosts.map((post, index) => (
          <Link to={"/post?id=" + post.id} key={index}>
            <Card>
              <Card.Content>{post.title}</Card.Content>
            </Card>
          </Link>
        ))}
      </Card.Group>
    </Container>
  );
};

export default BlogPage;
