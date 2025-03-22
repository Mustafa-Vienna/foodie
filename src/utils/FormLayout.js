import React from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import Asset from "../components/Asset";
import Upload from "../assets/images/upload.png";
import styles from "../styles/PostCreateForm.module.css";
import btnStyles from "../styles/Button.module.css";

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
}) => {
  return (
    <Row className="gx-5">
      {/* Left Column: Title, Introduction, Ingredients, Steps, Conclusion */}
      <Col md={6}>
        <Form.Group className={styles.FormGroup}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            className={styles.FormControl} // Added
            name="title"
            placeholder="Add title"
            value={postData.title}
            onChange={(e) => handleChange(e, setPostData)}
          />
        </Form.Group>

        <Form.Group className={styles.FormGroup}>
          <Form.Label>Introduction</Form.Label>
          <Form.Control
            className={styles.FormControl} // Added
            as="textarea"
            rows={3}
            name="introduction"
            placeholder="Enter introduction"
            value={postData.content.introduction}
            onChange={(e) => handleChange(e, setPostData)}
          />
        </Form.Group>

        <Form.Group className={styles.FormGroup}>
          <Form.Label>Ingredients</Form.Label>
          <div className={styles.InputButtonGroup}>
            <Form.Control
              className={styles.FormControl} // Added
              value={newIngredient}
              placeholder="Add ingredient"
              onChange={(e) => setNewIngredient(e.target.value)}
            />
            <Button
              className={`${btnStyles.Button} ${btnStyles.Bright}`}
              onClick={() => handleAddItem("ingredients", newIngredient, setNewIngredient, setPostData)}
            >
              Add
            </Button>
          </div>
          <ul>
            {postData.content.ingredients.map((ing, i) => (
              <li key={i} className={styles.ListItem}>
                <span className={styles.ListItemContent}>{ing}</span>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Gray} ${btnStyles.Small}`}
                  onClick={() => handleRemoveItem("ingredients", i, setPostData)}
                >
                  X
                </Button>
              </li>
            ))}
          </ul>
        </Form.Group>

        <Form.Group className={styles.FormGroup}>
          <Form.Label>Steps</Form.Label>
          <div className={styles.InputButtonGroup}>
            <Form.Control
              className={styles.FormControl} // Added
              value={newStep}
              placeholder="Add step"
              onChange={(e) => setNewStep(e.target.value)}
            />
            <Button
              className={`${btnStyles.Button} ${btnStyles.Bright}`}
              onClick={() => handleAddItem("steps", newStep, setNewStep, setPostData)}
            >
              Add
            </Button>
          </div>
          <ol>
            {postData.content.steps.map((step, i) => (
              <li key={i} className={styles.ListItem}>
                <span className={styles.ListItemContent}>{step}</span>
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Gray} ${btnStyles.Small}`}
                  onClick={() => handleRemoveItem("steps", i, setPostData)}
                >
                  X
                </Button>
              </li>
            ))}
          </ol>
        </Form.Group>

        <Form.Group className={styles.FormGroup}>
          <Form.Label>Conclusion</Form.Label>
          <Form.Control
            className={styles.FormControl} // Added
            as="textarea"
            rows={2}
            name="conclusion"
            placeholder="Add conclusion"
            value={postData.content.conclusion}
            onChange={(e) => handleChange(e, setPostData)}
          />
        </Form.Group>
      </Col>

      {/* Right Column: Image, Category, Tags, Image Filter */}
      <Col md={6}>
        <Form.Group className={styles.FormGroup}>
          <Form.Label>
            Image <span style={{ color: "red" }}>*</span>
          </Form.Label>
          {imagePreview ? (
            <Image src={imagePreview} className={styles.UploadedImage} />
          ) : (
            <Form.Label htmlFor="image-upload">
              <Asset src={Upload} message="Click to upload a recipe image" />
            </Form.Label>
          )}
          <Form.Control
            id="image-upload"
            type="file"
            hidden
            onChange={(e) => handleChangeImage(e, setPostData, setImagePreview, setErrors)}
          />
        </Form.Group>

        <Form.Group className={styles.FormGroup}>
          <Form.Label>Category</Form.Label>
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

        <Form.Group className={styles.FormGroup}>
          <Form.Label>Tags <span className="text-muted">(hold Ctrl/Cmd to select multiple)</span></Form.Label>
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

        <Form.Group className={styles.FormGroup}>
          <Form.Label>Image Filter</Form.Label>
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