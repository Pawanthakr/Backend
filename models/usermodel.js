// MongoDB-> It is a data base which store data(text,photo,any data)
// Database(A,B,C)->collection(A->userdata,salesdata,etc)->document(A->userdata->1person,2person,etc)

const { name } = require("ejs");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/mongodbpractice');

const userSchema = mongoose.Schema({
    eventtitle: String,
    description: String,
    date: String,
    time: String,
    location: String,
    image: String,
    category: String,
    contact: Number
})


module.exports = mongoose.model("event", userSchema);