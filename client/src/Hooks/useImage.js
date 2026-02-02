import { useState } from "react";
import toast from "react-hot-toast";
import {handleUpload} from "../utils/imageupload"

export const useImageUpload = (initialImages = []) => {
  const [images, setImages] = useState(initialImages);

  const uploadAtIndex = async (input, index) => {
    if (index === undefined || index === null) return;

    const file =
      input?.target?.files?.[0] ?? input;

    if (!file) return;

    try {
      const url = await toast.promise(handleUpload(file), {
        loading: "Uploading image...",
        success: "Image uploaded",
        error: "Upload failed",
      });

      setImages(prev => {
        const copy = [...prev];
        copy[index] = url;
        return copy;
      });
    } catch (err) {
      toast.error("Something went wrong");
      throw err;
    }
  };

  return {
    images,
    setImages,
    uploadAtIndex,
  };
};
