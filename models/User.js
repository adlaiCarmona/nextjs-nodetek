const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {type:String}, //required?
    email: {type:String, required:true},
    password: {type:String, required:true},
    shoppingCart: {type: Array},
    wishlist: {type: Array},
    locations: {type: Array},
    payments: {type: Array},
    orders: {type: Array},
    isAdmin: {type: Boolean},
});

export default mongoose.models?.User || mongoose.model('User', userSchema);