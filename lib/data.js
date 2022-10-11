const fs = require('fs');
const path = require('path');

const lib = {};

//base directory of the data folder
lib.dirname = path.join(__dirname, '/../.data/');

//write data to file
lib.create = (dir, file, data, callback) => {
    //open the file for writing
    fs.open(`${lib.dirname + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            const stringData = JSON.stringify(data);

            fs.writeFile(fileDescriptor, stringData, (err2, data) => {
                if(!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if(!err3) {
                            callback(false);
                        } else {
                            callback("Error closing the new file");
                        }
                    });
                } else {
                    callback("Error writing on the new file");
                }
            })
        } else {
            callback(err)
        }
    })
}

//Function for reading data
lib.read = (dir, file, callbacks) => {
    fs.readFile(`${lib.dirname + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    })
}

//Function for updating data
lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.dirname + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);

            fs.ftruncate(fileDescriptor, (err2) => {
                if(!err2) {
                    fs.writeFile(fileDescriptor, stringData, (err3) => {
                        if(!err3) {
                            fs.close(fileDescriptor, (err4) => {
                                if(!err4) {
                                    callback(false);
                                } else {
                                    callback('Error closing the file');
                                }
                            });
                        } else {
                            callback('Error writing the file');
                        }
                    })
                } else {
                    callback('Error truncating the file');
                }
            })
        } else {
            callback('Error opening the file');
        }
    })
}

//Functino for deleting data
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.dirname + dir}/${file}.json`, (err) => {
        if(!err) {
            callback(false);
        } else {
            callback("Error deleting the file");
        }
    })
}

module.exports = lib;