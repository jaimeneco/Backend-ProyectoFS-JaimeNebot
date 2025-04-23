import { Producto } from '../db/models/producto.model.js'
import { BACKEND_URL } from '../config/config.js'

const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}

export const createProducto = async (req, res, next) => {
    const { name, precio, img, tipo, owner } = req.body

    try {
        const nuevoProducto = await Producto.create({
            name,
            precio,
            img,
            tipo,
            owner
        });

        responseAPI.msg = "Producto creado con exito";
        responseAPI.data = nuevoProducto;

        res.status(201).json(responseAPI)
    } catch (e) {
        console.error('error creando producto', e)
        next(e)
    }
}

export const getProducto = async (req, res, next) => {
    const { id } = req.params

    try {
        const producto = await Producto.findById(id)

        responseAPI.msg = "Producto encontrado";
        responseAPI.data = producto;
        responseAPI.status = "ok";

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error(`tuvimos un error en el try del producto`, err)
        next(err);
    }
}

export const getProductos = async (req, res, next) => {

    try {
        const productos = await Producto.find()

        responseAPI.msg = "Productos encontrados";
        responseAPI.data = productos;
        responseAPI.status = "ok";

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error(`tuvimos un error en el try del usuario`, err)
        next(err);
    }
}

export const updateProductos = async (req, res, next) => {
    const {id} = req.params
    const {name, precio, tipo} = req.body

    try{
        const updateProducto = await Producto.findByIdAndUpdate(id, {
            name:name,
            precio:precio,
            //img: req.file.filename,
            tipo:tipo

        }, {new:true})

        if(!updateProducto){
            responseAPI.msg = `No se encontró el producto con ID ${id}`
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }


        responseAPI.msg = "Producto encontrado";
        responseAPI.data = updateProducto;
        responseAPI.status = "ok";
        res.status(200).json(responseAPI);


    }catch(e){
        console.error(`tuvimos un error en el try del update del producto`, err)

        next(e)
    }

}

export const updateImage = async(req,res, next) =>{
    const {id} = req.params

    if(!req.file){
        return res.status(404).json({
            success:false,
            message: "No se ha proporcionado una img"
        })
    }
    console.log('Archivo recibido en el controller: ', req.file);


    console.log('Archivo recibido: ', req.file.filename);

    try{
        const updateImageProduct = await Producto.findByIdAndUpdate(id, {
            img: req.file.filename
        }, {new:true})


        if(!updateImageProduct){
            responseAPI.msg = `No se encontró el producto con ID ${id}`
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }

        const imageUrl = `${BACKEND_URL}/uploads/${req.file.filename}`;
        // aseguramos q imageUrl forme parte de la respuesta
        updateImageProduct.imageUrl = imageUrl

        console.log('updateImg:',updateImageProduct)

        responseAPI.msg = "Img del producto actualizado";
        responseAPI.data = updateImageProduct;
        responseAPI.status = "ok";
        res.status(200).json(responseAPI);

    }catch(e){
        console.error(`tuvimos un error en el try del update del producto`, e)
        next(e)
    }
}



//--------------------------
// EJEMPLO CHATGPT
//--------------------------
// import Product from '../models/product.model.js';
// import fs from 'fs';

// // ✅ CREATE - Crear un producto
// export const createProduct = async (req, res) => {
//     const { title, description, price } = req.body;
//     const image = req.file?.filename;

//     try {
//         const product = new Product({
//             title,
//             description,
//             price,
//             image,
//             createdBy: req.user._id,
//         });
//         await product.save();
//         res.status(201).json(product);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // ✅ READ - Obtener todos los productos
// export const getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find().populate('createdBy', 'username');
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // ✅ READ - Obtener un solo producto por ID
// export const getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id).populate('createdBy', 'username');
//         if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
//         res.json(product);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // ✅ UPDATE - Actualizar producto
// export const updateProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

//         // Opcionalmente podrías validar que solo el creador o un admin actualice
//         Object.assign(product, req.body);
//         await product.save();
//         res.json(product);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // ✅ DELETE - Eliminar producto
// export const deleteProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

//         // Borra la imagen del servidor si existe
//         if (product.image) {
//             fs.unlink(`uploads/${product.image}`, (err) => {
//                 if (err) console.error('Error al borrar imagen:', err);
//             });
//         }

//         await product.deleteOne();
//         res.json({ message: 'Producto eliminado correctamente' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // ✅ EXTRA - Alquilar producto
// export const rentProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product || !product.available)
//             return res.status(400).json({ message: 'Producto no disponible' });

//         product.available = false;
//         product.rentedBy = req.user._id;
//         await product.save();
//         res.json({ message: 'Producto alquilado correctamente' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
