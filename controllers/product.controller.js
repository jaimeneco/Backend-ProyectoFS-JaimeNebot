import Product from '../models/product.model.js';
import fs from 'fs';

// ✅ CREATE - Crear un producto
export const createProduct = async (req, res) => {
    const { title, description, price } = req.body;
    const image = req.file?.filename;

    try {
        const product = new Product({
            title,
            description,
            price,
            image,
            createdBy: req.user._id,
        });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ✅ READ - Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('createdBy', 'username');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ READ - Obtener un solo producto por ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('createdBy', 'username');
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ UPDATE - Actualizar producto
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        // Opcionalmente podrías validar que solo el creador o un admin actualice
        Object.assign(product, req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ✅ DELETE - Eliminar producto
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        // Borra la imagen del servidor si existe
        if (product.image) {
            fs.unlink(`uploads/${product.image}`, (err) => {
                if (err) console.error('Error al borrar imagen:', err);
            });
        }

        await product.deleteOne();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ EXTRA - Alquilar producto
export const rentProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product || !product.available)
            return res.status(400).json({ message: 'Producto no disponible' });

        product.available = false;
        product.rentedBy = req.user._id;
        await product.save();
        res.json({ message: 'Producto alquilado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
