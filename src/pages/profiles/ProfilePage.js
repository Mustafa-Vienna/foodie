import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Card, Spinner, Alert } from "react-bootstrap";
import sharedStyles from "../../styles/SharedStyles.module.css";
import styles from "../../styles/ProfilePage.module.css";
import ProfilePosts from "./ProfilePosts";
import UseProfileData from "./profileUtils/UseProfileData";
import UseProfileForm from "./profileUtils/UseProfileForm";
import ProfileHeader from "./ProfileHeader";
import ProfileBio from "./ProfileBio";

const ProfilePage = () => {
  const { id } = useParams();
  const { profile, loading, setProfile } = UseProfileData(id);
  const initialData = {
    name: profile?.name || "",
    content: profile?.content || "",
    image: profile?.image || "",
  };
  const { profileData, errors, hasChanged, handleChange, handleImageChange, handleSubmit, setProfileData, setErrors } = UseProfileForm(initialData, id, setProfile);
  const [isEditing, setIsEditing] = useState(false);
  const isOwner = profile?.is_author || false;

  if (loading) {
    return (
      <Container className="text-center my-4">
        <Spinner animation="border" />
        <p>Loading profile...</p>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container className="text-center my-4">
        <Alert variant="danger">
          Profile not found or could not be loaded. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className={styles.profileContainer}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className={`${sharedStyles.baseCard} ${styles.profileCard}`}>
            <ProfileHeader
              profile={profile}
              isEditing={isEditing}
              profileData={profileData}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              errors={errors}
              isOwner={isOwner}
            />
            <ProfileBio
              profile={profile}
              isEditing={isEditing}
              profileData={profileData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              hasChanged={hasChanged}
              setProfileData={setProfileData}
              setErrors={setErrors}
              setIsEditing={setIsEditing}
              isOwner={isOwner}
            />
          </Card>
          <div className="mt-4">
            <ProfilePosts profileId={id} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;