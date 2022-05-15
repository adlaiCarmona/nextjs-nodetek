const mongoose = require('mongoose');
const User = require('../../../../models/User');

export default async function handler(req, res) {
    if (req.method === 'GET'){
        // console.log(mongoose.models.User);
        // console.log(mongoose.model('User'))
        // console.log(User)
        const MongooseUser = mongoose.model('User');
        const user = await MongooseUser.findOne({ email: req.query.email}).exec();
        
        res.send(user);
    } else if (req.method === 'POST'){
        res.status(201).json(null);
    }
}