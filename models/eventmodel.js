// MongoDB-> It is a data base which store data(text,photo,any data)
// Database(A,B,C)->collection(A->userdata,salesdata,etc)->document(A->userdata->1person,2person,etc)

const { name } = require("ejs");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const eventSchema = mongoose.Schema({
    eventtitle: String,
    description: String,
    date: String,
    time: String,
    location: String,
    image: String,
    category: String,
    contact: Number
})


module.exports = mongoose.model("event", eventSchema);
