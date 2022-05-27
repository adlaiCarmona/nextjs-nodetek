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
        const userLocations = user?.locations;

        // console.log(`user = ${user}`);

        console.log(
            `/api/db/location GET locations of ${userId} => \n${JSON.stringify(
                userLocations
            )}`
        );
        res.status(200).json(userLocations);
    } else if (req.method === "POST") {
        const { operation, location } = req.body;
        console.log(`POST API /db/user/location => location = ${location}`)

        try {
            if (operation == "add")
                await MongooseUser.updateOne(
                    { _id: uid },
                    { $addToSet: { locations: location } }
                );
            else if (operation == "remove")
                await MongooseUser.updateOne(
                    { _id: uid },
                    { $pull: { locations: location } }
                );
            else console.log("operation not recognized");
        } catch (err) {
            console.log(
                `\nError while trying to update locations of user ${userId}:`
            );
            console.log(err);
            res.end(
                `\nError while trying to update locations of user ${userId}:\nError: ${err}`
            );
        }

        console.log(
            `/api/db/user/list POST locations of ${userId}, ${operation}: ${location}`
        );
        res.end(`user ${userId} updated wishlist, ${operation}: ${location}`);

        res.status(201);
    }
};
