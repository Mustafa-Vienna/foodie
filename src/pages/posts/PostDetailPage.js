import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { Container, Card, Spinner, Alert, Row, Col, Button } from "react-bootstrap";
import styles from "../../styles/PostDetailPage.module.css";
import LikeButton from "../../pages/likes/LikeButton";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPost = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        if (isMounted) {
          setPost(data);
          setLikesCount(data.likes_count || 0); // Sync initial likes count
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

  if (loading) return (
    <Container className="text-center my-4">
      <Spinner animation="border" /> Loading post details...
    </Container>
  );
  if (error) return (
    <Container className="text-center">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );
  if (!post) return <Container className="text-center">Post not found.</Container>;

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Card className={styles.postCard}>
          <Card.Img variant="top" src={post.image} alt={post.title} className={styles.postImage} />
          <Card.Body className={styles.cardBody}>
            <Card.Title className={styles.postTitle}>{post.title}</Card.Title>
            <Card.Subtitle className={styles.postSubtitle}>By {post.author}</Card.Subtitle>
            <Card.Text className={styles.postContent}>{post.content}</Card.Text>
            <Card.Text className={styles.postMeta}>
              <strong>Category:</strong> {post.category}
            </Card.Text>
            {post.tags && post.tags.length > 0 && (
              <Card.Text className={styles.postMeta}>
                <strong>Tag:</strong>{" "}
                {post.tags.map((tag) => (
                  <Link key={tag.id} to={`/posts/?tags=${tag.id}`} className={styles.postTag}>
                    {tag.name}
                  </Link>
                )).reduce((prev, curr) => [prev, ", ", curr])}
              </Card.Text>
            )}
            <Card.Text className={styles.postMeta}>
              <div className={styles.socialStats}>
                <div className={styles.statItem}>
                  <LikeButton
                    postId={id}
                  />
                  <span> Likes: {likesCount}</span>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className={styles.postCard}>
          <Card.Body className="text-center">
            <Button variant="outline-primary" className={styles.loadCommentsBtn}>
              Load Comments
            </Button>
            <p className="mt-3">Comments will be displayed here once loaded...</p>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <h5>Popular Profiles</h5>
        <p>(Content to be added)</p>
      </Col>
    </Row>
  );
};

export default PostDetailPage;