
const connect = async () =>{
    console.log("Mock Connecting");

}

const findUser = async (obj) => {
    await user.findOne().exec()
}

const saveUser = async (user) => {
    console.log("Mock User")
    return Promise.resolve({
        firstName: "Kalani",
        email: "KMKitkouski@student.fullsail.edu",
        password: "Bob"
    })
}

const disconnect = async () =>{
    console.log("Mock Disconnecting");
}

module.exports = {connect, findUser, saveUser, disconnect}