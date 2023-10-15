import mongoose from 'mongoose';
import BasicManager from './basicManager.js';
import CartsModel from '../../db/models/carts.model.js';

class CartsManager extends BasicManager {
    constructor() {
        super(CartsModel);
    }
}

export default new CartsManager();
