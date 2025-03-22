export const handleChange = (event, setPostData) => {
  const { name, value } = event.target;
  setPostData((prev) => ({
    ...prev,
    content: ["introduction", "conclusion"].includes(name)
      ? { ...prev.content, [name]: value }
      : prev.content,
    [name]: ["introduction", "conclusion"].includes(name) ? prev[name] : value,
  }));
};

export const handleChangeImage = (event, setPostData, setImagePreview, setErrors) => {
  if (event.target.files.length) {
    const file = event.target.files[0];

    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      setErrors({ image: ["Image size cannot exceed 2MB."] });
      return;
    }

    // If size is okay, update the state
    setPostData((prev) => ({ ...prev, image: file }));
    if (setImagePreview) URL.revokeObjectURL(setImagePreview);
    setImagePreview(URL.createObjectURL(file));
  }
};

export const handleTagChange = (event, setPostData) => {
  const selectedTags = Array.from(event.target.selectedOptions, (opt) => opt.value);
  setPostData((prev) => ({
    ...prev,
    tags: selectedTags,
  }));
};