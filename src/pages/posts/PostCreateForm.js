import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import sharedStyles from "../../styles/SharedStyles.module.css";

// Import helper functions
import { fetchTags } from "../../utils/FetchTags";
import { handleAddItem, handleRemoveItem } from "../../utils/FormHelper";
import { handleChange, handleChangeImage, handleTagChange } from "../../utils/FormStateHelper";
import { handleSubmit } from "../../utils/FormSubmissionHelper";
import { FormPreview } from "../../utils/FormPreview";
import { FormLayout } from "../../utils/FormLayout";

const PostCreateForm = () => {
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: { introduction: "", ingredients: [], steps: [], conclusion: "" },
    category: "others",
    tags: [],
    image_filter: "normal",
    image: null,
  });
  const [availableTags, setAvailableTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [newIngredient, setNewIngredient] = useState("");
  const [newStep, setNewStep] = useState("");
  const navigate = useNavigate();

  // Fetch available tags on component mount
  useEffect(() => {
    fetchTags(setAvailableTags);
  }, []);

  // Toggle between edit and preview modes
  const togglePreview = () => setShowPreview((prev) => !prev);

  return (
    <Container className={`${sharedStyles.contentContainer} p-4 mt-5`}>
      <div className={`${sharedStyles.flexSpaceBetween} mb-4`}>
        <h2>Create a Post</h2>
        <Button
          className={`${sharedStyles.button} ${sharedStyles["button--gray"]}`}
          onClick={togglePreview}
        >
          {showPreview ? "Edit Recipe" : "Preview Recipe"}
        </Button>
      </div>

      {/* Display errors if any */}
      {Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          <ul>
            {Object.entries(errors).map(([field, messages], i) =>
              messages.map((message, j) => (
                <li key={`${i}-${j}`}>{field.charAt(0).toUpperCase() + field.slice(1)}: {message}</li>
              ))
            )}
          </ul>
        </Alert>
      )}

      {/* Preview Mode */}
      {showPreview ? (
        <FormPreview
          postData={postData}
          imagePreview={imagePreview}
          handleSubmit={(e) => handleSubmit(e, postData, setErrors, navigate)}
          errors={errors}
        />
      ) : (
        // Edit Mode
        <Form
          onSubmit={(e) => {
            console.log("postData.image before submit (edit mode):", postData.image);
            handleSubmit(e, postData, setErrors, navigate);
          }}
          encType="multipart/form-data"
        >
          <FormLayout
            postData={postData}
            setPostData={setPostData}
            newIngredient={newIngredient}
            setNewIngredient={setNewIngredient}
            newStep={newStep}
            setNewStep={setNewStep}
            imagePreview={imagePreview}
            availableTags={availableTags}
            handleChange={handleChange}
            handleChangeImage={handleChangeImage}
            handleTagChange={handleTagChange}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            setErrors={setErrors}
            setImagePreview={setImagePreview}
          />
          <Button
            className={`${sharedStyles.button} ${sharedStyles["button--wide"]} ${sharedStyles["button--bright"]}`}
            type="submit"
          >
            Create Post
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default PostCreateForm;