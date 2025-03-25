import React from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import Asset from "../components/Asset";
import Upload from "../assets/images/upload.png";
import styles from "../styles/PostCreateForm.module.css";
import sharedStyles from "../styles/SharedStyles.module.css";

export const FormLayout = ({
  postData,
  setPostData,
  newIngredient,
  setNewIngredient,
  newStep,
  setNewStep,
  imagePreview,
  availableTags,
  handleChange,
  handleChangeImage,
  handleTagChange,
  handleAddItem,
  handleRemoveItem,
  setErrors,
  setImagePreview,
  validationErrors = {},
}) => {
  return (
    <Row className="gx-5">
      <Col md={6}>
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Title</Form.Label>
          <Form.Control
            className={`${styles.formControl} ${sharedStyles.formInput}`}
            name="title"
            placeholder="Add title"
            value={postData.title}
            onChange={(e) => handleChange(e, setPostData)}
            isInvalid={!!validationErrors.title}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.title?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Introduction</Form.Label>
          <Form.Control
            className={`${styles.formControl} ${sharedStyles.formInput}`}
            as="textarea"
            rows={3}
            name="introduction"
            placeholder="Enter introduction"
            value={postData.content.introduction}
            onChange={(e) => handleChange(e, setPostData)}
            isInvalid={!!validationErrors.introduction}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.introduction?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Ingredients</Form.Label>
          <div className={`${sharedStyles.flexCenter} mb-4`} style={{ gap: 'var(--spacing-sm)' }}>
            <Form.Control
              className={`${styles.formControl} ${sharedStyles.formInput}`}
              value={newIngredient}
              placeholder="Add ingredient"
              onChange={(e) => setNewIngredient(e.target.value)}
              isInvalid={!!validationErrors.ingredients}
            />
            <Button
              className={`${sharedStyles.button} ${sharedStyles["button--bright"]}`}
              onClick={() => handleAddItem("ingredients", newIngredient, setNewIngredient, setPostData)}
            >
              Add
            </Button>
          </div>
          <ul>
            {postData.content.ingredients.map((ing, i) => (
              <li key={i} className={`${styles.listItem} ${sharedStyles.flexSpaceBetween} ${sharedStyles.backgroundTransition}`}>
                <span className={styles.listItemContent}>{ing}</span>
                <Button
                  className={`${sharedStyles.button} ${sharedStyles["button--gray"]} ${sharedStyles["button--small"]}`}
                  onClick={() => handleRemoveItem("ingredients", i, setPostData)}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
          {validationErrors.ingredients && (
            <div className="invalid-feedback d-block">{validationErrors.ingredients[0]}</div>
          )}
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Steps</Form.Label>
          <div className={`${sharedStyles.flexCenter} mb-4`} style={{ gap: 'var(--spacing-sm)' }}>
            <Form.Control
              className={`${styles.formControl} ${sharedStyles.formInput}`}
              value={newStep}
              placeholder="Add step"
              onChange={(e) => setNewStep(e.target.value)}
              isInvalid={!!validationErrors.steps}
            />
            <Button
              className={`${sharedStyles.button} ${sharedStyles["button--bright"]}`}
              onClick={() => handleAddItem("steps", newStep, setNewStep, setPostData)}
            >
              Add
            </Button>
          </div>
          <ol>
            {postData.content.steps.map((step, i) => (
              <li key={i} className={`${styles.listItem} ${sharedStyles.flexSpaceBetween} ${sharedStyles.backgroundTransition}`}>
                <span className={styles.listItemContent}>{step}</span>
                <Button
                  className={`${sharedStyles.button} ${sharedStyles["button--gray"]} ${sharedStyles["button--small"]}`}
                  onClick={() => handleRemoveItem("steps", i, setPostData)}
                >
                  X
                </Button>
              </li>
            ))}
          </ol>
          {validationErrors.steps && (
            <div className="invalid-feedback d-block">{validationErrors.steps[0]}</div>
          )}
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Conclusion</Form.Label>
          <Form.Control
            className={`${styles.formControl} ${sharedStyles.formInput}`}
            as="textarea"
            rows={2}
            name="conclusion"
            placeholder="Add conclusion"
            value={postData.content.conclusion}
            onChange={(e) => handleChange(e, setPostData)}
          />
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>
            Image <span style={{ color: "red" }}>*</span>
          </Form.Label>
          {imagePreview ? (
            <Image src={imagePreview} className={`${styles.uploadedImage} ${sharedStyles.transformTransition}`} />
          ) : (
            <Form.Label htmlFor="image-upload">
              <Asset
                src={Upload}
                message="Click to upload a recipe image"
                className={`${sharedStyles.transformTransition}`}
                style={{ width: '160px', height: '160px', cursor: 'pointer' }}
              />
            </Form.Label>
          )}
          <Form.Control
            id="image-upload"
            type="file"
            hidden
            onChange={(e) => handleChangeImage(e, setPostData, setImagePreview, setErrors)}
            isInvalid={!!validationErrors.image}
          />
          <Form.Control.Feedback type="invalid">
            {validationErrors.image?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={postData.category}
            onChange={(e) => handleChange(e, setPostData)}
          >
            <option value="seafood">Seafood</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="cold">Cold Dishes</option>
            <option value="warm">Warm Dishes</option>
            <option value="desert">Dessert</option>
            <option value="others">Others</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>
            Tags <span className="text-muted">(hold Ctrl/Cmd to select multiple)</span>
          </Form.Label>
          <Form.Control
            as="select"
            multiple
            value={postData.tags}
            onChange={(e) => handleTagChange(e, setPostData)}
          >
            {availableTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Image Filter</Form.Label>
          <Form.Control
            as="select"
            name="image_filter"
            value={postData.image_filter}
            onChange={(e) => handleChange(e, setPostData)}
          >
            <option value="normal">Normal</option>
            <option value="vintage">Vintage</option>
            <option value="black_and_white">Black & White</option>
            <option value="sepia">Sepia</option>
            <option value="contrast">High Contrast</option>
            <option value="bright">Bright</option>
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};