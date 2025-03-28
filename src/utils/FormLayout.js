import React from 'react';
import { Row, Col, Form, Button, Image } from 'react-bootstrap';
import Asset from '../components/Asset';
import Upload from '../assets/images/upload.png';
import styles from '../styles/PostCreateForm.module.css';
import sharedStyles from '../styles/SharedStyles.module.css';

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
        <Form.Group className={`${styles.formGroup} mb-4`}>
          <Form.Label className={`${styles.formLabel} fw-bold`}>
            Title
          </Form.Label>
          <Form.Control
            className={`${styles.formControl} ${sharedStyles.formInput} shadow-sm`}
            name="title"
            placeholder="Add an engaging title for your recipe"
            value={postData.title}
            onChange={(e) => handleChange(e, setPostData)}
            isInvalid={!!validationErrors.title}
          />
          <Form.Control.Feedback type="invalid" className="ps-2">
            {validationErrors.title?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className={`${styles.formGroup} mb-4`}>
          <Form.Label className={`${styles.formLabel} fw-bold`}>
            Introduction
          </Form.Label>
          <Form.Control
            className={`${styles.formControl} ${sharedStyles.formInput} shadow-sm`}
            as="textarea"
            rows={3}
            name="introduction"
            placeholder="Tell us about the story behind this recipe..."
            value={postData.content.introduction}
            onChange={(e) => handleChange(e, setPostData)}
            isInvalid={!!validationErrors.introduction}
          />
          <Form.Control.Feedback type="invalid" className="ps-2">
            {validationErrors.introduction?.[0]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className={`${styles.formGroup} mb-4`}>
          <Form.Label className={`${styles.formLabel} fw-bold`}>
            Ingredients
          </Form.Label>
          <div
            className={`${sharedStyles.flexCenter} mb-3`}
            style={{ gap: 'var(--spacing-sm)' }}
          >
            <Form.Control
              className={`${styles.formControl} ${sharedStyles.formInput} shadow-sm`}
              value={newIngredient}
              placeholder="Add an ingredient"
              onChange={(e) => setNewIngredient(e.target.value)}
              isInvalid={!!validationErrors.ingredients}
            />
            <Button
              className={`${sharedStyles.button} ${sharedStyles['button--bright']} px-3`}
              onClick={() =>
                handleAddItem(
                  'ingredients',
                  newIngredient,
                  setNewIngredient,
                  setPostData
                )
              }
            >
              Add
            </Button>
          </div>
          <div className={`${styles.listContainer} border rounded p-2`}>
            {postData.content.ingredients.map((ing, i) => (
              <div
                key={i}
                className={`${styles.listItem} ${sharedStyles.flexSpaceBetween} ${sharedStyles.backgroundTransition} mb-2 p-2 rounded`}
              >
                <span className={`${styles.listItemContent} flex-grow-1`}>
                  {ing}
                </span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={() =>
                    handleRemoveItem('ingredients', i, setPostData)
                  }
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
          {validationErrors.ingredients && (
            <div className="text-danger ps-2 mt-1">
              {validationErrors.ingredients[0]}
            </div>
          )}
        </Form.Group>

        <Form.Group className={`${styles.formGroup} mb-4`}>
          <Form.Label className={`${styles.formLabel} fw-bold`}>
            Steps
          </Form.Label>
          <div
            className={`${sharedStyles.flexCenter} mb-3`}
            style={{ gap: 'var(--spacing-sm)' }}
          >
            <Form.Control
              className={`${styles.formControl} ${sharedStyles.formInput} shadow-sm`}
              value={newStep}
              placeholder="Add a step"
              onChange={(e) => setNewStep(e.target.value)}
              isInvalid={!!validationErrors.steps}
            />
            <Button
              className={`${sharedStyles.button} ${sharedStyles['button--bright']} px-3`}
              onClick={() =>
                handleAddItem('steps', newStep, setNewStep, setPostData)
              }
            >
              Add
            </Button>
          </div>
          <div className={`${styles.listContainer} border rounded p-2`}>
            {postData.content.steps.map((step, i) => (
              <div
                key={i}
                className={`${styles.listItem} ${sharedStyles.flexSpaceBetween} ${sharedStyles.backgroundTransition} mb-2 p-2 rounded`}
              >
                <span className={`${styles.listItemContent} flex-grow-1`}>
                  {step}
                </span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleRemoveItem('steps', i, setPostData)}
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
          {validationErrors.steps && (
            <div className="text-danger ps-2 mt-1">
              {validationErrors.steps[0]}
            </div>
          )}
        </Form.Group>

        <Form.Group className={`${styles.formGroup} mb-4`}>
          <Form.Label className={`${styles.formLabel} fw-bold`}>
            Conclusion
          </Form.Label>
          <Form.Control
            className={`${styles.formControl} ${sharedStyles.formInput} shadow-sm`}
            as="textarea"
            rows={2}
            name="conclusion"
            placeholder="Add your final thoughts..."
            value={postData.content.conclusion}
            onChange={(e) => handleChange(e, setPostData)}
          />
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group className={`${styles.formGroup} mb-4`}>
          <Form.Label className={`${styles.formLabel} fw-bold`}>
            Recipe Image <span className="text-danger">*</span>
          </Form.Label>
          <div className="text-center">
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  className={`${styles.uploadedImage} ${sharedStyles.transformTransition} img-fluid rounded shadow`}
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setPostData((prev) => ({ ...prev, image: null }));
                    setImagePreview(null);
                    setErrors((prev) => ({ ...prev, image: null }));
                  }}
                >
                  Remove Image
                </Button>
              </>
            ) : (
              <Form.Label htmlFor="image-upload" className="d-block">
                <Asset
                  src={Upload}
                  message="Click to upload a recipe image"
                  className={`${sharedStyles.transformTransition} mx-auto`}
                  style={{
                    width: '200px',
                    height: '200px',
                    cursor: 'pointer',
                    opacity: 0.7,
                  }}
                />
              </Form.Label>
            )}
            <Form.Control
              id="image-upload"
              type="file"
              hidden
              onChange={(e) =>
                handleChangeImage(e, setPostData, setImagePreview, setErrors)
              }
              isInvalid={!!validationErrors.image}
            />
            {validationErrors.image && (
              <div className="text-danger mt-2">
                {validationErrors.image?.[0]}
              </div>
            )}
          </div>
        </Form.Group>

        <Form.Group className={`${styles.formGroup} mb-4`}>
          <Form.Label className={`${styles.formLabel} fw-bold`}>
            Category
          </Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={postData.category}
            onChange={(e) => handleChange(e, setPostData)}
            className={`${styles.formControl} ${sharedStyles.formInput} shadow-sm`}
          >
            <option value="seafood">Seafood</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="cold">Cold Dishes</option>
            <option value="warm">Warm Dishes</option>
            <option value="desert">Dessert</option>
            <option value="others">Others</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className={`${styles.formGroup} mb-4`}>
          <Form.Label className={`${styles.formLabel} fw-bold`}>
            Tags{' '}
            <span className="text-muted">
              (hold Ctrl/Cmd to select multiple)
            </span>
          </Form.Label>
          <Form.Control
            as="select"
            multiple
            value={postData.tags}
            onChange={(e) => handleTagChange(e, setPostData)}
            className={`${styles.formControl} ${sharedStyles.formInput} shadow-sm`}
          >
            {availableTags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className={`${styles.formGroup} mb-4`}>
          <Form.Label className={`${styles.formLabel} fw-bold`}>
            Image Filter
          </Form.Label>
          <Form.Control
            as="select"
            name="image_filter"
            value={postData.image_filter}
            onChange={(e) => handleChange(e, setPostData)}
            className={`${styles.formControl} ${sharedStyles.formInput} shadow-sm`}
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