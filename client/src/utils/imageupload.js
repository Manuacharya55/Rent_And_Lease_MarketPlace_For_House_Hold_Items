import { Client, Storage, ID, Permission, Role } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const storage = new Storage(client);

export const handleUpload = async (file) => {
  if (!file) return alert("Please select a file!");

  try {
    const response = await storage.createFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID, // Bucket ID
      ID.unique(),
      file,
      [Permission.read(Role.any())] // Public access
    );
    const fileUrl = storage.getFileView(import.meta.env.VITE_APPWRITE_BUCKET_ID, response.$id);

    return fileUrl;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};