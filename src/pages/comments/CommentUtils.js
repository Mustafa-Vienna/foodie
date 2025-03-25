import { axiosReq } from "../../api/axiosDefault";

export const fetchComments = async (postId, page = 1) => {
  try {
    const { data } = await axiosReq.get(`/comments/?post=${postId}&page=${page}`);
    return data;
  } catch (err) {
    console.error("Error fetching comments:", err);
    throw err;
  }
};

export const postComment = async (postId, content) => {
  try {
    const { data } = await axiosReq.post("/comments/", { post: postId, content });
    return data;
  } catch (err) {
    console.error("Error posting comment:", err);
    throw err;
  }
};

export const updateComment = async (commentId, content) => {
  try {
    const { data } = await axiosReq.put(`/comments/${commentId}/`, { content });
    return data;
  } catch (err) {
    console.error("Error updating comment:", err);
    throw err;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await axiosReq.delete(`/comments/${commentId}/`);
  } catch (err) {
    console.error("Error deleting comment:", err);
    throw err;
  }
};