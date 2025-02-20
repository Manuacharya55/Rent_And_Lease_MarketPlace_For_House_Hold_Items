import { Client, Storage, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject("67b71ca900384deaad08"); // Replace with your project ID

const storage = new Storage(client);

export const handleUpload = async (file) => {
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
    return fileUrl;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
