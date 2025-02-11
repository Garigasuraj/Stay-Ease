const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Listing Images',
      allowed_formats: ['jpg', 'png', 'jpeg',"avif"],
      public_id: (req, file) => 'computed-filename-using-request',
    },
    limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5 MB
})

module.exports = {cloudinary,storage}