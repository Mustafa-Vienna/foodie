import React from "react";
import { Card, Image, Button } from "react-bootstrap";
import sharedStyles from "../styles/SharedStyles.module.css";
import styles from "../styles/PostCreateForm.module.css";

export const FormPreview = ({ postData, imagePreview, handleSubmit, errors }) => (
  <Card className={`${sharedStyles.baseCard} p-3 ${styles.previewCard}`}>
    <Card.Title className={styles.previewCardTitle}>{postData.title}</Card.Title>
    {imagePreview && <Image src={imagePreview} className={`${styles.uploadedImage} ${sharedStyles.transformTransition}`} />}
    <Card.Body className={styles.previewCardBody}>
      <p><strong>Introduction:</strong> {postData.content.introduction}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>{postData.content.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
      <p><strong>Steps:</strong></p>
      <ol>{postData.content.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
      <p><strong>Conclusion:</strong> {postData.content.conclusion}</p>
    </Card.Body>
    <Button
      className={`${sharedStyles.button} ${sharedStyles["button--bright"]}`}
      onClick={(e) => {
        handleSubmit(e);
      }}
    >
      Submit Recipe
    </Button>
  </Card>
);