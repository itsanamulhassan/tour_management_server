import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,

  params: (_req, file) => {
    const fileName = file.originalname
      .slice(-1)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\./g, "-")
      // eslint-disable-next-line no-useless-escape
      .replace(/[^a-z0-9\-]/g, "");
    // const extension = file.originalname.split(".").pop();
    const uniqueFileName =
      Math.random().toString(36).substring(2) + "-" + Date.now() + fileName;
    return {
      public_id: uniqueFileName,
      folder: "tour-management-system",
      resource_type: "auto",
    };
  },
});

export const multerUpload = multer({
  storage,
});
