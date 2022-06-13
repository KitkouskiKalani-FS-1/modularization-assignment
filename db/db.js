const mongoose = require("mongoose");
const User = require("../api/models/user")

const connect = async () =>{
    console.log("Connecting");
    await mongoose.connect("mongodb://localhost:27017/demo");
}

const findUser = async (email) => {
    const user = await User.findOne(email).exec()
    return user;
}

const saveUser = async (user) => {
    return await user.save();
}

const disconnect = async () =>{
    console.log("Disconnecting");
    await mongoose.connection.close();
}

module.exports = {connect, findUser, saveUser, disconnect}