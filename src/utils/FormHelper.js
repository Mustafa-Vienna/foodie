import { updatePost, deletePost } from "../pages/posts/postDetailUtils/PostUtils";
import { validatePostData } from "../utils/FormValidation";

export const handleAddItem = (type, value, setter, setPostData) => {
  if (value.trim()) {
    setPostData((prev) => ({
      ...prev,
      content: { ...prev.content, [type]: [...prev.content[type], value.trim()] },
    }));
    setter("");
  }
};

export const handleRemoveItem = (type, index, setPostData) => {
  setPostData((prev) => ({
    ...prev,
    content: {
      ...prev.content,
      [type]: prev.content[type].filter((_, i) => i !== index),
    },
  }));
};

export const handleUpdate = async (postId, editedPost, setPost, setShowEditModal, setValidationErrors, setError, setIsModifying) => {
  const errors = validatePostData(editedPost, true);
  if (Object.keys(errors).length) {
    setValidationErrors(errors);
    return;
  }

  setIsModifying(true);
  try {
    const updatedPost = await updatePost(postId, editedPost);
    setPost(updatedPost);
    setShowEditModal(false);
    setValidationErrors({});
  } catch (err) {
    setError("Failed to update post.");
  } finally {
    setIsModifying(false);
  }
};

export const handleDelete = async (postId, navigate, setError, setIsModifying) => {
  setIsModifying(true);
  try {
    await deletePost(postId);
    navigate("/feed");
  } catch (err) {
    setError("Failed to delete post.");
  } finally {
    setIsModifying(false);
  }
};