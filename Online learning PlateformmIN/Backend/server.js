import app from "./app.js";
const PORT = process.env.PORT || 5000;
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
