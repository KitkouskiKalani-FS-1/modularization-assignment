const {connect, saveUser, disconnect, findUser} = require('./db');
const User = require("../api/models/user");
const mongoose = require("mongoose");

jest.mock('./db');

describe("DB Function", ()=>{
    test("As a user I want to post a user to MongoDb", async ()=>{
        const newUser = User({
            _id: mongoose.Types.ObjectId(),
            firstName: 'Kalani',
            email: 'KMKitkouski@student.fullsail.edu',
            password: 'Bob',

        });

        await connect();
        const user = await saveUser(newUser);

        expect(user.firstName).toEqual('Kalani');
        expect(user.email).toEqual('KMKitkouski@student.fullsail.edu');
        expect(user.password).toEqual('Bob');

        await disconnect();
    })
    test("As a user I want to login to an account", async ()=>{
        await connect();
        const user = await findUser("KMKitkouski@student.fullsail.edu");

        expect(user.firstName).toEqual('Kalani');
        expect(user.email).toEqual('KMKitkouski@student.fullsail.edu');
        expect(user.password).toEqual('Bob');

        await disconnect();
    })
})