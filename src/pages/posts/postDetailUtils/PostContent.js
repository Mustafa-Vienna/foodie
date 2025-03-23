import React from "react";
import styles from "../../../styles/PostDetailPage.module.css";

const PostContent = ({ content }) => {
  const renderIntroduction = () => content?.introduction || "";
  
  const renderIngredients = () => {
    if (!content?.ingredients || !Array.isArray(content.ingredients)) {
      return <p>No ingredients listed.</p>;
    }
    
    return (
      <ul>
        {content.ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient}</li>
        ))}
      </ul>
    );
  };
  
  const renderSteps = () => {
    if (!content?.steps || !Array.isArray(content.steps)) {
      return <p>No steps listed.</p>;
    }
    
    return (
      <ol>
        {content.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    );
  };
  
  const renderConclusion = () => content?.conclusion || "";

  return (
    <div className={styles.postContent}>
      <h4>Introduction</h4>
      <p>{renderIntroduction()}</p>

      <h4>Ingredients & Materials</h4>
      {renderIngredients()}

      <h4>Step-by-Step Cooking Process</h4>
      {renderSteps()}

      <h4>Conclusion & Serving Suggestions</h4>
      <p>{renderConclusion()}</p>
    </div>
  );
};

export default PostContent;