import { axiosReq } from "../../../api/axiosDefault";

export const fetchProfile = async (id) => {
  const { data } = await axiosReq.get(`/profiles/${id}/`);
  return data;
};

export const updateProfile = async (id, formData) => {
  const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
  return data;
};