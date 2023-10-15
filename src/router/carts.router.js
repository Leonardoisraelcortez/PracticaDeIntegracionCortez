import { Router } from "express";
import CartsManager from "../dao/managers/MongoDb/cartmanager.js";

const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
try {
    const newCart = await CartsManager.createCart();
    res.status(201).json(newCart);
} catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
}
});

cartsRouter.get('/:cid', async (req, res) => {
try {
    const cartId = req.params.cid;
    const cart = await CartsManager.getCartById(cartId);
    if (!cart) {
    res.status(404).json({ error: 'Carrito no encontrado' });
    return;
    }
    res.json(cart.products);
} catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
}
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = parseInt(req.body.quantity || 1);

    const cart = await CartsManager.addProductToCart(cartId, productId, quantity);
    if (!cart) {
    res.status(404).json({ error: 'Carrito no encontrado' });
    return;
    }
    res.json(cart);
} catch (error) {
    res.status(500).json({ error: 'Error al agregar un producto al carrito' });
}
});

export default cartsRouter;
