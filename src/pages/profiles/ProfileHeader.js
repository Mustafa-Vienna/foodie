import React from "react";
import { Image, Form } from "react-bootstrap";
import styles from "../../styles/ProfilePage.module.css";
import Asset from "../../components/Asset";

const ProfileHeader = ({ profile, isEditing, profileData, handleChange, handleImageChange, errors, isOwner }) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileImageContainer}>
        {isEditing ? (
          <Form.Group>
            <Form.Label className={styles.uploadButton} htmlFor="image-upload">
              {profileData.image ? (
                <>
                  <div className={styles.editOverlay}>
                    <span className={styles.editText}>
                      <i className="fa-solid fa-camera"></i>
                      <br />
                      Change
                    </span>
                  </div>
                  <Image
                    src={profileData.image}
                    className={styles.profileImage}
                    roundedCircle
                  />
                </>
              ) : (
                <Asset message="Click to upload" />
              )}
            </Form.Label>
            <Form.Control
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
            {errors.image && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.image.join(", ")}
              </Form.Control.Feedback>
            )}
            <Form.Text className="text-center d-block mt-2">
              Click the image to change your profile picture
            </Form.Text>
          </Form.Group>
        ) : (
          <Image
            src={profile.image}
            alt={profile.author}
            className={styles.profileImage}
            roundedCircle
            onError={(e) => {
              e.target.src = 'https://res.cloudinary.com/duemxeswe/image/upload/v1737306346/default_profile_girwrs.jpg';
            }}
          />
        )}
      </div>
      <div className={styles.profileInfo}>
        {isEditing ? (
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.join(", ")}
            </Form.Control.Feedback>
          </Form.Group>
        ) : (
          <h3 className={styles.profileName}>{profile.name || profile.author}</h3>
        )}
        <div className={styles.profileStats}>
          <div className={styles.statItem}>
            <span className={styles.statCount}>{profile.posts_count}</span>
            <span className={styles.statLabel}>Posts</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statCount}>{profile.followers_count}</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statCount}>{profile.following_count}</span>
            <span className={styles.statLabel}>Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;