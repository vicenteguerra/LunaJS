let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
    name: String
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
