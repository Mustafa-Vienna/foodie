import React from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import styles from "../../styles/ProfilePage.module.css";
import sharedStyles from "../../styles/SharedStyles.module.css";

const ProfileBio = ({ profile, isEditing, profileData, errors, handleChange, handleSubmit, hasChanged, setProfileData, setErrors, setIsEditing, isOwner }) => {
  return (
    <Card.Body className={styles.profileBody}>
      {isEditing ? (
        <>
          <h4 className={styles.sectionTitle}>Edit Your Bio</h4>
          <Alert variant="info" className="mb-3">
            <i className="fa-solid fa-circle-info me-2"></i>
            You are now in edit mode. Make your changes and click "Save Changes" when done.
          </Alert>
          <Form.Group className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="content"
              value={profileData.content}
              onChange={handleChange}
              isInvalid={!!errors.content}
              placeholder="Tell us about yourself..."
            />
            <Form.Text className="text-muted">
              Share a little about yourself, your interests, or your cooking style.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.content?.join(", ")}
            </Form.Control.Feedback>
          </Form.Group>
        </>
      ) : (
        <>
          <h4 className={styles.sectionTitle}>Bio</h4>
          <p className={styles.profileBio}>
            {profile.content || "No bio available."}
          </p>
        </>
      )}
      {Object.keys(errors).length > 0 && 
       !errors.name && !errors.content && !errors.image && (
        <Alert variant="danger">
          {Object.keys(errors).map((key) => (
            <p key={key}>{key}: {Array.isArray(errors[key]) ? errors[key].join(", ") : errors[key]}</p>
          ))}
        </Alert>
      )}
      {isOwner && (
        <div className={styles.profileActions}>
          {isEditing ? (
            <>
              <Button
                className={`${sharedStyles.button} ${sharedStyles["button--gray"]}`}
                onClick={() => {
                  setIsEditing(false);
                  setProfileData({
                    name: profile.name || "",
                    content: profile.content || "",
                    image: profile.image || "",
                  });
                  setErrors({});
                }}
              >
                Cancel
              </Button>
              <Button
                className={`${sharedStyles.button} ${sharedStyles["button--green"]}`}
                onClick={handleSubmit}
                disabled={!hasChanged}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              className={`${sharedStyles.button} ${sharedStyles["button--orange"]}`}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
      )}
    </Card.Body>
  );
};

export default ProfileBio;