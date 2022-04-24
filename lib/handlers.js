/*
request handlers
*/

// Dependencies
const _data = require('./data');
const helpers = require('./helpers');

// Define the handlers
const handlers = {};

// users
handlers.users = (data, callback) => {
    var accetableMethods = ["post", "get", "put", "delete"];
    if (accetableMethods.indexOf(data.method) != -1) {
        handler._users[data.method](data, callback);
    } else {
        callback(405);
    }
}

// container for users submethods
handlers._users = {}

// users - get
handlers._users.get = (data, calleback)=> {

}

// users - post
// required data : firstname, lastname, phone, password, tosAgreement
// optional data : none
handlers._users.post = (data, calleback)=> {
    // check that all requiered data are filled
    var firstName = typeof(data.payload.firstName) === "string" && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof(data.payload.lastName) === "string" && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phone = typeof(data.payload.phone) === "string" && data.payload.phone.trim().length === 10 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) === "string" && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var tosAgreement = typeof(data.payload.tosAgreement) === "boolean" && data.payload.tosAgreement === true ? true : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure the user doesnt already exist
        _data.read("users", phone, (err, data) => {
            if (!err) {
                // hash the password
                var hashedPassword = helpers.hash(password);

                if (hashedPassword) {
                    // create the user object
                    var userObject = {
                        "firstName": firstName,
                        "lastName": lastName,
                        "phone": phone,
                        "password": hashedPassword,
                        "tosAgreement": true,
                    }

                    // store the user
                    _data.create("users", phone, userObject, (err) => {
                        if (!err) {
                            callback(200);
                        } else {
                            callback(500, {"Error": "could not create the new user"})
                        }
                    })
                } else {
                    callback(500, {"Error": "could not hash the password"})
                }

            } else {
                // user already exist
                calleback(400, {'Error', 'a user with number phone ' + phone + ' already exist'})
            }
        })

    } else {
        callback(400, {'Error', 'Missing required fields'})
    }
}

// users - put
handlers._users.put = (data, calleback)=> {

}

// users - delete
handlers._users.delete = (data, calleback)=> {

}

// ping handlers
handlers.ping = (data, callback) => {
    // callback http status code, and a payload object
    callback(200);
};

// Not found handlers
handlers.notFound = (data, callback) => {
    // callback http status code, and a payload object
    callback(404);
};

// exports the module
module.exports = handlers;
