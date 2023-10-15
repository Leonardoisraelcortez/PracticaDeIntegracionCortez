import mongoose from 'mongoose';

const cartsItemSchema = new mongoose.Schema({
product: String,
quantity: Number,
});

const cartsSchema = new mongoose.Schema({
products: [cartsItemSchema],
});

const Carts = mongoose.model('Carts', cartsSchema);

export default Carts;


