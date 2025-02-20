import { useState } from "react";
import { storage } from "./appwrite.js"; // Import the Appwrite configuration
import { ID } from "appwrite";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    try {
      const response = await storage.createFile(
        "67b7203b0016cae0edb1", // Replace with your storage bucket ID
        ID.unique(),
        file
      );

      // Get the file preview URL
      const fileUrl = storage.getFilePreview(
        "67b7203b0016cae0edb1",
        response.$id
      );
      setFileUrl(fileUrl);
      console.log(fileUrl);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {fileUrl && <img src={fileUrl} alt="Uploaded Preview" width="200px" />}
    </div>
  );
};

export default ImageUpload;
