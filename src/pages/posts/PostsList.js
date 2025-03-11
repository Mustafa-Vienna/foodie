import React, { useState, useEffect } from "react";
import { axiosReq } from "../../api/axiosDefault";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosReq.get("/posts/?page=1");
        if (isMounted) {
          setPosts(data.results || []);
        }
      } catch (err) {
        if (isMounted) {
          setError("Could not fetch posts. Please try again later.");
          console.error("Error fetching posts:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <h2 className="text-center my-4"><Spinner animation="border" /> Loading posts...</h2>;
  if (error) return <Container className="text-center"><Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert></Container>;

  return (
    <Container>
      <Row>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Col md={4} key={post.id}>
              <Card>
                <Link to={`/posts/${post.id}`}>
                  <Card.Img variant="top" src={post.image} alt={post.title} />
                </Link>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Subtitle>By {post.author}</Card.Subtitle>
                  <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h4 className="text-center">No posts available</h4>
        )}
      </Row>
    </Container>
  );
};

export default PostsList;