import path from "path";
import multer from "multer";

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB max
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const allowedExtensions = [".jpg", ".jpeg", ".webp", ".png", ".mp4", ".pdf"];
    if (!allowedExtensions.includes(ext)) {
      cb(new Error(`Unsupported file type! (${ext})`), false);
    } else {
      cb(null, true);
    }
  },
});

export default upload;
