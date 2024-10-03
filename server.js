import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import orderRoutes from './routes/OrderRoutes.js';
import multer from 'multer';
import path from 'path';


config();
connectDB();

const app = express();
app.use(cors());
app.use(json());
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// Initialize multer for file uploads
const upload = multer({ storage }); // Use the storage configuration here

app.use('/api/orders', upload.fields([{ name: 'productImage' }, { name: 'trackingImage' }]), orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
