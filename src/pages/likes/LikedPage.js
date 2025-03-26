import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import PostCard from "../../components/PostCard";
import { fetchLikedPosts } from "../posts/postDetailUtils/PostUtils";

function LikedPage() {
  const [posts, setPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const loadLikedPosts = async () => {
      try {
        const results = await fetchLikedPosts();
        setPosts(results);
      } catch (err) {
        console.log(err);
      } finally {
        setHasLoaded(true);
      }
    };

    if (currentUser) {
      loadLikedPosts();
    } else {
      setHasLoaded(true);
    }
  }, [currentUser]);

  return (
    <Container className={appStyles.Content}>
      {hasLoaded ? (
        <>
          <h2 className="text-center mb-5">Posts You've Liked</h2>
          {posts.length ? (
            <Row>
              {posts.map((post) => (
                <Col key={post.id} xs={12} md={6} lg={4} className="mb-5">
                  <PostCard {...post} setPosts={setPosts} />
                </Col>
              ))}
            </Row>
          ) : (
            <Container className={appStyles.Content}>
              <Asset 
                message="You haven't liked any posts yet!" 
                height={200}
              />
              <p className="text-center mt-3">
                When you find posts you enjoy, click the heart icon to like them and they'll appear here.
              </p>
            </Container>
          )}
        </>
      ) : (
        <Container className={appStyles.Content}>
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
}

export default LikedPage;