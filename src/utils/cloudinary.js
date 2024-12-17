import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has uploaded successfull

    //console.log("file is uploaded on ", response.url);
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file.
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed.
    return null;
  }
};

// const deleteFromCloudinary = async (publicId) => {
//   try {
//     if (!publicId) return null;

//     const response = await cloudinary.uploader.destroy(publicId);

//     if (response.result === "ok") {
//       console.log(`File with public ID ${publicId} deleted successfully.`);
//       return response;
//     } else {
//       console.error(`Failed to delete file with public ID ${publicId}.`);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error while deleting file to cloudinary", error);
//     return null;
//   }
// };

 export { uploadOnCloudinary };
