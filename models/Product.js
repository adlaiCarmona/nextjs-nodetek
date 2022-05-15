const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    quantity: {type:Number, required:true},
    img: {type:Object, require:true},
});

export default mongoose.models?.Product || mongoose.model('Product', productSchema);