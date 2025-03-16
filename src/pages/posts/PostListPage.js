import React, { useState, useEffect, useRef, useCallback } from "react";
import { axiosReq } from "../../api/axiosDefault";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/PostListPage.module.css";

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosReq.get(`/posts/?page=${page}`);
        if (isMounted) {
          setPosts((prevPosts) => {
            const newPosts = data.results.filter(
              (newPost) => !prevPosts.some((post) => post.id === newPost.id)
            );
            return [...prevPosts, ...newPosts];
          });
          setHasMore(!!data.next);
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
  }, [page]);

  // Infinite scroll setup
  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  if (loading && page === 1) return <h2 className="text-center my-4"><Spinner animation="border" /> Loading posts...</h2>;
  if (error) return <Container className="text-center"><Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert></Container>;

  return (
    <Container className={styles.container}>
      <Row>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Col
              md={4}
              key={post.id}
              className={styles.cardColumn}
              ref={index === posts.length - 1 ? lastPostRef : null} // Apply ref to last post
            >
              <Card className={styles.postCard}>
                <Link to={`/posts/${post.id}`}>
                  <Card.Img
                    variant="top"
                    src={post.image}
                    alt={post.title}
                    className={styles.postImage}
                    loading="lazy"
                  />
                </Link>
                <Card.Body className={styles.cardBody}>
                  <Card.Title className={styles.postTitle}>{post.title}</Card.Title>
                  <Card.Subtitle className={styles.postSubtitle}>By {post.author}</Card.Subtitle>
                  <Card.Text className={styles.postText}>{post.content.substring(0, 100)}...</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h4 className="text-center">No posts available</h4>
        )}
        {loading && posts.length > 0 && (
          <Col xs={12} className="text-center my-4">
            <Spinner animation="border" /> Loading more posts...
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PostListPage;