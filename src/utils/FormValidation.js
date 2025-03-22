export const validatePostData = (postData) => {
  const errors = {};

  if (!postData.title.trim()) {
    errors.title = ['Please add a title'];
  }

  if (!postData.content.introduction.trim()) {
    errors.introduction = ['Please add an introduction'];
  }

  if (!postData.content.ingredients.length) {
    errors.ingredients = ['Please add at least one ingredient'];
  }

  if (!postData.content.steps.length) {
    errors.steps = ['Please add at least one step'];
  }

  if (!postData.image) {
    errors.image = ['Please add an image'];
  }

  return errors;
};