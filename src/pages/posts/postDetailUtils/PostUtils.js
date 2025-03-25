import { axiosReq } from "../../../api/axiosDefault";

export const fetchPost = async (postId) => {
  try {
    const { data } = await axiosReq.get(`/posts/${postId}/`);
    return data;
  } catch (err) {
    console.error("Error fetching post:", err);
    throw err;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const formData = new FormData();
    formData.append("title", postData.title.trim());
    formData.append("content", JSON.stringify(postData.content));
    formData.append("category", postData.category || "");
    formData.append("image_filter", postData.image_filter || "");
    if (postData.tags && Array.isArray(postData.tags)) {
      postData.tags.forEach((tagId) => formData.append("tag_ids[]", tagId));
    }
    if (postData.image && postData.image instanceof File) {
      formData.append("image", postData.image);
    }
    const { data } = await axiosReq.put(`/posts/${postId}/`, formData);
    return data;
  } catch (err) {
    console.error("Error updating post:", err);
    throw err;
  }
};

export const deletePost = async (postId) => {
  try {
    await axiosReq.delete(`/posts/${postId}/`);
  } catch (err) {
    console.error("Error deleting post:", err);
    throw err;
  }
};