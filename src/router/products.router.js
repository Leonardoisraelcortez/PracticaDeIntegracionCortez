import { Router } from "express";
import productManager from "../dao/managers/MongoDb/productManager.js";
import { Product } from '../dao/db/models/products.model.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    res.json(products);
} catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
}
});

productsRouter.get('/:pid', async (req, res) => {
try {
    const productpid = req.params.pid;
    const product = await productManager.getProductBypid(productpid);
    if (product) {
    res.json(product);
    } else {
    res.status(404).json({ error: 'Producto no encontrado' });
    }
} catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
}
});

productsRouter.post('/', async (req, res) => {
try {
    const newProduct = req.body;
    await productManager.addProduct(newProduct);
    res.status(201).json({ message: 'Producto agregado con éxito' });
} catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ error: 'Error al agregar el producto' });
}
});

productsRouter.put('/:pid', async (req, res) => {
try {
    const productpid = req.params.pid;
    const updatedProduct = req.body;
    await productManager.updateProduct(productpid, updatedProduct);
    res.status(200).json({ message: 'Producto actualizado con éxito' });
} catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
}
});

productsRouter.delete('/:pid', async (req, res) => {
try {
    const productpid = req.params.pid;
    await productManager.deleteProduct(productpid);
    res.status(204).send();
} catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
}
});

export default productsRouter;
