import { Client, Storage, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject("67b71ca900384deaad08"); // Replace with your project ID

const storage = new Storage(client);

export { storage };
