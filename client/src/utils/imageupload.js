import { Client, Storage, ID, Permission, Role } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67b71ca900384deaad08");

const storage = new Storage(client);

export const handleUpload = async (file) => {
  if (!file) return alert("Please select a file!");

  try {
    const response = await storage.createFile(
      "67b7203b0016cae0edb1", // Bucket ID
      ID.unique(),
      file,
      [Permission.read(Role.any())] // Public access
    );
    const fileUrl = storage.getFileView("67b7203b0016cae0edb1", response.$id);
    return fileUrl;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};