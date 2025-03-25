import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
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
          <h2 className="text-center mb-4">Posts You've Liked</h2>
          {posts.length ? (
            posts.map((post) => (
              <PostCard key={post.id} {...post} setPosts={setPosts} />
            ))
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