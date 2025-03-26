import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import styles from "../../styles/ProfilePage.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";
import PostCard from "../../components/PostCard";

const ProfilePosts = ({ profileId }) => {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchPosts = async () => {
      try {
        console.log("Fetching posts for profile ID:", profileId);
        const { data } = await axiosReq.get(`/posts/?author__profile=${profileId}&page=${page}`);
        console.log("Posts data received:", data);
        
        if (isMounted) {
          setPosts((prevPosts) => ({
            ...data,
            results: page > 1 ? [...prevPosts.results, ...data.results] : data.results,
          }));
          setHasMore(!!data.next);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        // Handle 404 specifically
        if (err.response?.status === 404) {
          console.error("Posts endpoint not found - 404 error");
        }
      } finally {
        if (isMounted) {
          setHasLoaded(true);
        }
      }
    };

    setHasLoaded(false);
    fetchPosts();
    
    return () => {
      isMounted = false;
    };
  }, [profileId, page]);

  return (
    <Container className={styles.postsSection}>
      <h3 className={styles.sectionTitle}>Posts</h3>
      
      {!hasLoaded ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {posts.results.length ? (
            <>
              <Row>
                {posts.results.map((post) => (
                  <Col xs={12} md={6} lg={4} key={post.id} className={`${sharedStyles.cardGridColumn} mb-4`}>
                    <PostCard 
                      id={post.id}
                      title={post.title}
                      content={post.content}
                      image={post.image}
                      likes_count={post.likes_count}
                      comments_count={post.comments_count}
                      like_id={post.like_id}
                    />
                  </Col>
                ))}
              </Row>
              
              {hasMore && (
                <div className="text-center mt-4">
                  <Button
                    className={`${sharedStyles.button} ${sharedStyles["button--orange"]}`}
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Card className={`${sharedStyles.contentContainer} text-center`}>
              <Card.Body>
                <p>No posts yet.</p>
                <Link to="/posts/create">
                  <Button className={`${sharedStyles.button} ${sharedStyles["button--orange"]}`}>
                    Create a post
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </Container>
  );
};

export default ProfilePosts;