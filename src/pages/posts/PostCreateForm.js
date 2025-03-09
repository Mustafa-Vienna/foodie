import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container, Image, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";

// Import necessary components and assets
import Asset from "../../components/Asset";
import Upload from "../../assets/images/upload.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

const PostCreateForm = () => {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    category: "others",
    tags: [],
    image_filter: "normal",
    image: null,
  });
  const [availableTags, setAvailableTags] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const { title, content, category, tags, image_filter, image } = postData;

  // Fetch tags from backend
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await axiosReq.get("/posts/tags/");
        setAvailableTags(data.results || []);
      } catch (err) {
        console.error("Error fetching tags:", err);
        setAvailableTags([]);
      }
    };
    fetchTags();
  }, []);

  // Handle text input change
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image selection
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      setPostData({ ...postData, image: file });

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle multi-select tags
  const handleTagChange = (event) => {
    const selectedTags = Array.from(event.target.selectedOptions, (option) => option.value);
    setPostData({ ...postData, tags: selectedTags });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    formData.append("category", category);
    formData.append("image_filter", image_filter);
    tags.forEach((tag) => formData.append("tags", tag));

    if (image) {
      formData.append("image", image);
    }
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Error: No access token available, user might be logged out.");
      setErrors({ auth: ["User is not authenticated. Please log in again."] });
      return;
    }

    try {
      const { data } = await axiosReq.post("/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      navigate(`/posts/${data.id}`);
    } catch (err) {
      console.error("Error creating post:", err.response?.data);
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Container className={`${appStyles.Content} p-4 mt-5`}>
      <h2 className="text-center mb-4">Create a Post</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          {/* Image Upload Section */}
          <Col md={6} className="d-flex flex-column align-items-center">
            <Form.Group className="text-center">
              {imagePreview ? (
                <figure>
                  <Image className={styles.UploadedImage} src={imagePreview} rounded />
                </figure>
              ) : (
                <Form.Label className="d-flex justify-content-center" htmlFor="image-upload">
                  <Asset src={Upload} message="Click or tap to upload an image" />
                </Form.Label>
              )}
              <Form.Control id="image-upload" type="file" accept="image/*" onChange={handleChangeImage} hidden />
            </Form.Group>
          </Col>

          {/* Form Fields Section */}
          <Col md={6}>
            <Form.Group className={styles.FormGroup}>
              <Form.Label className={styles.FormLabel}>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                className={styles.FormControl}
                placeholder="Enter a descriptive title for your post"
              />
              {errors.title && <Alert variant="danger">{errors.title[0]}</Alert>}
            </Form.Group>

            <Form.Group className={styles.FormGroup}>
              <Form.Label className={styles.FormLabel}>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="content"
                value={content}
                onChange={handleChange}
                className={styles.FormControl}
                placeholder="Describe how to prepare this dish step by step"
              />
              {errors.content && <Alert variant="danger">{errors.content[0]}</Alert>}
            </Form.Group>

            <Form.Group className={styles.FormGroup}>
              <Form.Label className={styles.FormLabel}>Category</Form.Label>
              <Form.Control as="select" name="category" value={category} onChange={handleChange} className={styles.FormControl}>
                <option value="others">Others</option>
                <option value="seafood">Seafood</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="cold">Cold Dishes</option>
                <option value="warm">Warm Dishes</option>
                <option value="desert">Desert</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className={styles.FormGroup}>
              <Form.Label className={styles.FormLabel}>Tags</Form.Label>
              <Form.Control as="select" multiple name="tags" onChange={handleTagChange} value={tags} className={styles.FormControl}>
                {availableTags.length > 0 ? (
                  availableTags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading tags...</option>
                )}
              </Form.Control>
            </Form.Group>

            <Form.Group className={styles.FormGroup}>
              <Form.Label className={styles.FormLabel}>Image Filter</Form.Label>
              <Form.Control as="select" name="image_filter" value={image_filter} onChange={handleChange} className={styles.FormControl}>
                <option value="normal">Normal</option>
                <option value="vintage">Vintage</option>
                <option value="black_and_white">Black & White</option>
                <option value="sepia">Sepia</option>
                <option value="contrast">High Contrast</option>
                <option value="bright">Bright</option>
              </Form.Control>
            </Form.Group>

            <div className="d-flex justify-content-center align-item-center text-center mt-4">
              <Button className={`${btnStyles.Button} ${btnStyles.Gray}`} onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button className={`${btnStyles.Button} ${btnStyles.Bright}`} type="submit">
                Create Post
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default PostCreateForm;
