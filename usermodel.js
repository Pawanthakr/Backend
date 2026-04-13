// MongoDB-> It is a data base which store data(text,photo,any data)
// Database(A,B,C)->collection(A->userdata,salesdata,etc)->document(A->userdata->1person,2person,etc)

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/mongodbpractice');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image: String
})


module.exports = mongoose.model("user", userSchema);