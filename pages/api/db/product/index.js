const mongoose = require("mongoose");
const User = require('../../../../models/Product');

export default async function handler(req, res) {
    if (req.method === "GET") {
        const MongooseProduct = mongoose.model("Product");

        if (req.query.id) {
            console.log(`/api/db/product GET ${req.query.id}`)
            res.send(
                await MongooseProduct.findOne({ _id: req.query.id }).exec()
            );
        } else {
            console.log('api/db/product GET all')
            res.send(await MongooseProduct.find().exec());
        }
    } else if (req.method === "POST") {
        res.status(201).json(null);
    }
}
