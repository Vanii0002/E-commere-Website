import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
  try {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    });

    if(!filePath){
      throw new Error('File path is required for upload');
    }

    const result = await cloudinary.uploader.upload(filePath)
    fs.unlinkSync(filePath); 

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }
    catch (error) {
           fs.unlinkSync(filePath); 
        console.error('Cloudinary Upload Error:', error);
    throw error;
  } 
};

export default uploadOnCloudinary;