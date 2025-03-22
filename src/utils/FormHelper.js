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