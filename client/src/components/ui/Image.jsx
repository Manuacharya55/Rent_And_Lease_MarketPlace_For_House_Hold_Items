import React from "react";
import { CiImageOn } from "react-icons/ci";

const Image = ({ label = "please select an image", index, url, handleImageChange }) => {
  const inputId = `custom-image-${index}`;

  return (
    <div className="image-component">
      <label className="image-label" htmlFor={inputId}>
        <span>{label}</span>
        <div className="custom-image-holder">
          {url ? (
            <img src={url} alt="preview" />
          ) : (
            <CiImageOn />
          )}
        </div>
      </label>
      <input
        id={inputId}
        className="custom-image"
        accept="image/*"
        type="file"
        onChange={(e) => handleImageChange(e, index)}
      />
    </div>
  );
};

export default Image;
