/*
library for storing/editing data
*/

// Dependencies
const fs = require('fs');
const path = require('path');

// Container for the module to be exported
const lib = {};

// base dir for thr data folder
lib.baseDir = path.join(__dirname, "..", ".data");

// write data to a file
lib.create = (dir, file, data, callback) => {
    // open the file for writing
    fs.open(bil.baseDir + dir + "/" + file + ".json", "wx", (err, fd) => {
        if (!err && fd) {
            // convert data to a string
            var dataString = JSON.stringify(data);

            // write to the file and then close it
            fs.writeFile(fd, dataString, (err) => {
                if (!err) {
                    fs.close(fd, (err) => {
                        if (!err) {
                            callback(null);
                        } else {
                            callback("could not close the file");
                        }
                    })
                    callback("could not write on the file");
                } else {
                }
            });

        } else {
            callback("could not create a new file");
        }
    })
};

// read data from a file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir + dir + "/" + file + ".json", "uft8", (err, data) => {
        callback(err, data);
    })
};

// update data inside a file
lib.update = (dir, file, data, callback) => {
    // open the file for writing
    fs.open(bil.baseDir + dir + "/" + file + ".json", "r+", (err, fd) => {
        if (!err && fd) {
            // convert data to a string
            var dataString = JSON.stringify(data);

            // write to the file and then close it
            fs.writeFile(fd, dataString, (err) => {
                if (!err) {
                    fs.close(fd, (err) => {
                        if (!err) {
                            callback(null);
                        } else {
                            callback("could not close the file");
                        }
                    })
                    callback("could not write on the file");
                } else {
                }
            });

        } else {
            callback("could not create a new file");
        }
    })

};

// export the module
module.exports = lib;
