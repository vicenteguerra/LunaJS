let mongoose = require("mongoose");

let BaseSchema = new mongoose.Schema({
    name: String
}, { timestamps: true });

module.exports = mongoose.model('Base', BaseSchema);
