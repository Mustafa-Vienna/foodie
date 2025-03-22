import { axiosReq } from "../api/axiosDefault";

export const fetchTags = async (setAvailableTags) => {
  try {
    const { data } = await axiosReq.get("/posts/tags/");
    setAvailableTags(data.results || []);
  } catch (err) {
    console.error("Error fetching tags:", err);
  }
};