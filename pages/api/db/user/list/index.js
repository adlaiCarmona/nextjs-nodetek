// API GET route => '/api/db/user/list?list=${list}&userId=${userId}'
const mongoose = require('mongoose');
// decrypt from https://www.labnol.org/code/encrypt-decrypt-javascript-200307
const CryptoJS = require('crypto-js');

const decrypt = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

export default async (req, res) => {
    // should change instead of list == 'wishlist' or 'shoppingCart' be ie 0 => wishlist; 1 => shoppingCart
    //console.log('API route /api/db/user/list\nreqs => ' + JSON.stringify(req))
    const { listType } = req.query;
    const userId = decrypt(req.query.userId);
    const uid = mongoose.Types.ObjectId(userId);

    const MongooseUser = mongoose.model('User');
    
    if (req.method === 'GET') {
        const user = await MongooseUser.findById(uid);
        console.log(user);
        const userList = listType == 'shoppingCart' ? user?.shoppingCart : user?.wishlist; // put actual data from db

        // console.log(`user = ${user}`);

        console.log(`/api/db/user/list GET ${listType} of ${userId} => \n${JSON.stringify(userList)}`);
        res.status(200).json(userList);
    } else if (req.method === 'POST') {
        const { productId, operation } = req.body;

        try {
            if (listType == 'shoppingCart'){
                if (operation == 'add')
                    await MongooseUser.updateOne({ _id: uid}, { "$addToSet": { "shoppingCart": mongoose.Types.ObjectId(productId)}});
                else if (operation == 'remove')
                    await MongooseUser.updateOne({ _id: uid}, { "$pull": { "shoppingCart": mongoose.Types.ObjectId(productId)}});
                else
                    console.log('operation not recognized');
            }
            else{
                if (operation == 'add')
                    await MongooseUser.updateOne({ _id: uid}, { "$addToSet": { "wishlist": mongoose.Types.ObjectId(productId)}});
                else if (operation == 'remove')
                    await MongooseUser.updateOne({ _id: uid}, { "$pull": { "wishlist": mongoose.Types.ObjectId(productId)}});
                else
                    console.log('operation not recognized');
            }
        } catch(err) {
            console.log(`\nError while trying to update ${listType} of user ${userId}:`);
            console.log(err);
            res.end(`\nError while trying to update ${listType} of user ${userId}:\nError: ${err}`);
        }
    
        console.log(`/api/db/user/list POST ${listType} of ${userId}, ${operation}: ${productId}`);
        res.end(`user ${userId} updated wishlist, ${operation}: ${productId}`);

        res.status(201)
    }
}