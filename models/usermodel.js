const { name } = require("ejs");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/mongodbpractice');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
})


module.exports = mongoose.model("user", userSchema);