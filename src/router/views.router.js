import { Router } from "express";
import { Product } from '../dao/db/models/products.model.js';

const router = Router();

router.get("/", async (req, res) => {
try {
    const products = await Product.find();

    res.render("index", { products });
} catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
}
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

export default router;
