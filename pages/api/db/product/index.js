const mongoose = require("mongoose");
const User = require("../../../../models/Product");

export default async function handler(req, res) {
    const MongooseProduct = mongoose.model("Product");
    if (req.method === "GET") {
        

        if (req.query.id) {
            console.log(`/api/db/product GET ${req.query.id}`);
            res.send(
                await MongooseProduct.findOne({ _id: req.query.id }).exec()
            );
        } else {
            console.log("api/db/product GET all");
            res.send(await MongooseProduct.find().exec());
        }
    } else if (req.method === "POST") {

        if (req.body.operation == "add") {
            const newProduct = new MongooseProduct({
                name: req.body.newProduct?.name,
                description: req.body.newProduct?.description,
                img: req.body.newProduct?.img,
                price: req.body.newProduct?.price,
                quantity: req.body.newProduct?.quantity,
            });

            newProduct.save(function (err, product) {
                if (err) return console.error(err);
                console.log(product.name + " saved to products collection.");
            });
        } else if (req.body.operation == "update") {
            console.log(`type of newProduct._id = ${typeof req.body.newProduct._id}`)
            MongooseProduct.findByIdAndUpdate(
                req.body.newProduct._id,
                req.body.newProduct,
                function (err) {
                    if (err) return console.error(err);
                    console.log(`updated to: ${JSON.stringify(req.body.newProduct)}`);
                }
            );
        }

        res.status(201).json(null);
    }
}
