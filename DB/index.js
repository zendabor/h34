const lb = require('lowdb');
const DbFile = require('lowdb/adapters/FileSync');
const path = require("path");

const adapter = new DbFile(path.resolve(__dirname,'../','data.json'))
const db = lb(adapter)

module.exports = db