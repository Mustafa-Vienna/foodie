import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { Container, Card, Spinner, Alert, Row, Col } from "react-bootstrap";
import appStyles from "../../App.module.css";

const PostsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPost = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        if (isMounted) {
          setPost(data);
        }
      } catch (err) {
        setError("Post not found or an error occurred.");
        console.error("Error fetching post:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <h2 className="text-center my-4"><Spinner animation="border" /> Loading post...</h2>;
  if (error) return <Container className="text-center"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Card>
          <Card.Img variant="top" src={post.image} alt={post.title} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle>By {post.author}</Card.Subtitle>
            <Card.Text>{post.content}</Card.Text>
            <Card.Text><strong>Category:</strong> {post.category}</Card.Text>
            <Card.Text><strong>Likes:</strong> {post.likes_count}</Card.Text>
          </Card.Body>
        </Card>
        <Container className={appStyles.Content}>Comments will be displayed here...</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
};

export default PostsPage;