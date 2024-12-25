import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import "dotenv/config";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // The folder in cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'], // Allowed formats
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional transformations
  }
});


// Create/configure multer upload middleware
// MIME (Multipurpose Internet Mail Extensions) Type: A standard way to indicate the type of a file transmitted over the web.
export const multerUpload = multer({ 

  storage: storage,
  fileFilter: (req, file, cb) => {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images.'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});


