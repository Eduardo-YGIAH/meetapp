const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_ID,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
