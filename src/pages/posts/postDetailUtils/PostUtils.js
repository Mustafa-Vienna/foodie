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

export const fetchLikedPosts = async () => {
  try {
    const { data: likes } = await axiosReq.get("/likes/");
    if (!likes.results || likes.results.length === 0) return [];

    const uniquePostIds = [];
    const seenPostIds = new Set();

    likes.results.forEach((like) => {
      if (!seenPostIds.has(like.post)) {
        uniquePostIds.push(like.post);
        seenPostIds.add(like.post);
      }
    });

    const { data: postsData } = await axiosReq.get("/posts/", {
      params: { id__in: uniquePostIds.join(",") },
    });

    const postsMap = postsData.results.reduce((acc, post) => {
      acc[post.id] = post;
      return acc;
    }, {});

    return uniquePostIds.map(id => postsMap[id]).filter(Boolean);
  } catch (err) {
    console.error("Error fetching liked posts:", err);
    throw err;
  }
};