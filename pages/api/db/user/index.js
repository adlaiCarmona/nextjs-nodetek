const mongoose = require('mongoose');
const User = require('../../../../models/User');
// decrypt from https://www.labnol.org/code/encrypt-decrypt-javascript-200307
const CryptoJS = require('crypto-js');

const decrypt = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

export default async function handler(req, res) {
    const MongooseUser = mongoose.model('User');
    if (req.method === 'GET'){
        const user = await MongooseUser.findOne({ email: req.query.email}).exec();
        
        res.send(user);
    } else if (req.method === 'POST'){
        if (req.body.operation == "update") {
            const userId = decrypt(req.query.userId);

            MongooseUser.findByIdAndUpdate(
                userId,
                req.body.newUser,
                function (err) {
                    if (err) return console.error(err);
                    console.log(`updated to: ${JSON.stringify(req.body.newUser)}`);
                }
            );
        }
        res.status(201).json(null);
    }
}