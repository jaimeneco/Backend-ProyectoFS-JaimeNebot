import { Router } from 'express';
import multer from 'multer';
import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    rentProduct,
} from '../controllers/product.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Configuración de multer para subida de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Rutas
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken, upload.single('image'), createProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);
router.patch('/rent/:id', verifyToken, rentProduct);

export default router;
