// API GET route => '/api/db/user/list?list=${list}&userId=${userId}'
const mongoose = require("mongoose");
// decrypt from https://www.labnol.org/code/encrypt-decrypt-javascript-200307
const CryptoJS = require("crypto-js");

const decrypt = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

export default async (req, res) => {
    const userId = decrypt(req.query.userId);
    const uid = mongoose.Types.ObjectId(userId);

    const MongooseUser = mongoose.model("User");

    if (req.method === "GET") {
        const user = await MongooseUser.findById(uid);
        console.log(user);
        const userPayments = user?.payments;

        // console.log(`user = ${user}`);

        console.log(
            `/api/db/payment GET payments of ${userId} => \n${JSON.stringify(
                userPayments
            )}`
        );
        res.status(200).json(userPayments);
    } else if (req.method === "POST") {
        const { operation, payment } = req.body;
        console.log(`POST API /db/user/payment => payment = ${JSON.stringify(payment)}`)

        try {
            if (operation == "add")
                await MongooseUser.updateOne(
                    { _id: uid },
                    { $addToSet: { payments: payment } }
                );
            else if (operation == "remove")
                await MongooseUser.updateOne(
                    { _id: uid },
                    { $pull: { payments: payment } }
                );
            else console.log("operation not recognized");
        } catch (err) {
            console.log(
                `\nError while trying to update payments of user ${userId}:`
            );
            console.log(err);
            res.end(
                `\nError while trying to update payments of user ${userId}:\nError: ${err}`
            );
        }

        console.log(
            `/api/db/user/list POST payments of ${userId}, ${operation}: ${payment}`
        );
        res.end(`user ${userId} updated wishlist, ${operation}: ${payment}`);

        res.status(201);
    }
};
