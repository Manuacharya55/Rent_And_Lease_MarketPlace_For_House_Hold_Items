import React from "react";
import Image from "./ui/Image";

const ImageUploader = ({ imageArray = [], handleFileUpload, maxImages = 4 }) => {
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        {Array.from({ length: maxImages }).map((_, idx) => (
          <div key={idx}>
            <Image
              previewSrc={imageArray[idx]}
              onFileSelected={(file) => handleFileUpload(file, idx)}
              label={`Image ${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
