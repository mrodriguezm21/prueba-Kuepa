const store = require("./store");
const logger  = require("../utils/logger");
const controller_name = "messageController";

const addUser = (user) => {
    const { username, name, password } = user;
    return new Promise((resolve, reject) => {
        if(!username || !name || !password){
            console.error(logger("Faltan datos", controller_name, "ERROR"));
            return reject("Los datos son incorrectos");
        }
        const newUser = {
            username: username,
            name: name,
            password: password,
        };
        try {
            
            let resp = store.add(newUser);
            if(resp === 409){
                console.error(logger("El usuario ya existe", controller_name, "ERROR"));
                return reject(409, "El usuario ya existe");
            }
            resolve(newUser);
        } catch (error) {

            
        }
    });

};

const getUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(store.list());
        } catch (error) {
            reject(500, "Error interno");
        }
    });
};


module.exports = {
    addUser,
    getUsers,

};
