import { useState } from "react";
import { updateProfile } from "./ProfileApi";
import { useCurrentUser } from "../../../contexts/CurrentUserContext";

const UseProfileForm = (initialData, profileId, setProfile) => {
  const currentUser = useCurrentUser();
  const [profileData, setProfileData] = useState(initialData);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [hasChanged, setHasChanged] = useState(false);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
    setHasChanged(true);
  };

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(imageFile);
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0]),
      });
      setImageFile(event.target.files[0]);
      setHasChanged(true);
    }
  };

  const handleSubmit = async () => {
    try {
      setErrors({});
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("content", profileData.content);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const data = await updateProfile(profileId, formData);
      setProfile(data);
      setProfileData({
        name: data.name || "",
        content: data.content || "",
        image: data.image || "",
      });
      setImageFile(null);
      if (currentUser && currentUser.profile_id === parseInt(profileId)) {
        try {
          const userData = JSON.parse(localStorage.getItem("currentUser") || "{}");
          userData.profile_image = data.image;
          localStorage.setItem("currentUser", JSON.stringify(userData));
          window.location.reload();
        } catch (err) {}
      }
      setHasChanged(false);
      return true;
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        setErrors({ non_field_errors: ["An error occurred while updating your profile."] });
      }
      return false;
    }
  };

  return {
    profileData,
    errors,
    hasChanged,
    handleChange,
    handleImageChange,
    handleSubmit,
    setProfileData,
    setErrors,
  };
};

export default UseProfileForm;