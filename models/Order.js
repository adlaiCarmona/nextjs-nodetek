const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    date: {type:Date, default:Date.now},
    client: {type:Schema.Types.ObjectId, ref:'users'},
    location: {type:Object, required:true},
    payment: {type:Object, required:true},
    order: {type:Array, required:true},
});

export default mongoose.models?.Order || mongoose.model('Order', orderSchema);