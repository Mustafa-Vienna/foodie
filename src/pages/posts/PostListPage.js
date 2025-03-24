import React, { useState, useEffect, useRef, useCallback } from "react";
import { axiosReq } from "../../api/axiosDefault";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import PostCard from "../../components/PostCard";
import sharedStyles from "../../styles/SharedStyles.module.css";

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeWarning, setActiveWarning] = useState(null);

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

  useEffect(() => {
    if (activeWarning) {
      const timer = setTimeout(() => {
        setActiveWarning(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeWarning]);

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

  if (loading && page === 1)
    return (
      <h2 className="text-center my-4">
        <Spinner animation="border" /> Loading posts...
      </h2>
    );

  if (error)
    return (
      <Container className="text-center">
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      </Container>
    );

  return (
    <Container className={sharedStyles.pageContainer}>
      <Row>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <Col
              md={4}
              key={post.id}
              className={sharedStyles.cardGridColumn}
              ref={index === posts.length - 1 ? lastPostRef : null}
            >
              <PostCard
                id={post.id}
                title={post.title}
                content={post.content}
                image={post.image}
                likes_count={post.likes_count}
                comments_count={post.comments_count}
                activeWarning={activeWarning}
                setActiveWarning={setActiveWarning}
                like_id={post.like_id}
              />
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