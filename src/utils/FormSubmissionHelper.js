import { axiosReq } from "../api/axiosDefault";
import { validatePostData } from "./FormValidation";

export const handleSubmit = async (event, postData, setErrors, navigate) => {
  event.preventDefault();

  const errors = validatePostData(postData);

  if (Object.keys(errors).length) {
    setErrors(errors);
    window.scrollTo(0, 0);
    return;
  }

  // Prepare form data
  const formData = new FormData();
  formData.append("title", postData.title.trim());
  formData.append("content", JSON.stringify(postData.content));
  formData.append("category", postData.category);
  formData.append("image_filter", postData.image_filter);

  // Append each tag_id using bracket notation
  postData.tags.forEach((tagId) => {
    formData.append("tag_ids[]", tagId);
  });

  // Ensure image is a File instance
  if (postData.image && postData.image instanceof File) {
    formData.append("image", postData.image);
  } else {
    setErrors({ image: ["Please select a valid image file."] });
    return;
  }

  // Submit to backend
  try {
    const { data } = await axiosReq.post("/posts/", formData);
    navigate(`/posts/${data.id}`);
  } catch (err) {
    console.error("Submission error:", err.response?.data);
    setErrors(err.response?.data || {});
    window.scrollTo(0, 0);
  }
};