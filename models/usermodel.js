const { name } = require("ejs");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
})


module.exports = mongoose.model("user", userSchema);