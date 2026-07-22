require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const express = require("express");
const app = express();
const Path = require("path");
const eventModel = require("./models/eventmodel");
const userModel = require("./models/usermodel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(Path.join(__dirname, "public")));


app.get("/", function (req, res) {
    res.render("index");
});

app.get("/read", async (req, res) => {
    try {
        let events = await eventModel.find();
        res.render("read", { events });
    } catch (err) {
        console.error("Database Query Error:", err);
        res.status(500).send("Database Error: " + err.message);
    }
});
app.get("/add", async (req, res) => {
    res.render("add");
});
app.get("/about", async (req, res) => {
    res.render("about");
});
app.get("/contact", async (req, res) => {
    res.render("contact");
});
app.get("/signup", async (req, res) => {
    res.render("signup");
});
app.get("/login", async (req, res) => {
    res.render("login");
});

app.get("/edit/:eventid", async (req, res) => {
    let event = await eventModel.findOne({ _id: req.params.eventid });
    res.render("edit", { event: event });
});

app.post("/update/:eventid", async (req, res) => {
    let { eventtitle, location, image, date, time, category, contact, description } = req.body;
    let event = await eventModel.findOneAndUpdate({ _id: req.params.eventid }, { eventtitle, location, image, date, time, category, contact, description }, { new: true });
    res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
    let events = await eventModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
});

app.post("/create", async (req, res) => {
    let { eventtitle, location, image, date, time, category, contact, description } = req.body;
    if (
        !eventtitle ||
        !location ||
        !image ||
        !date ||
        !time ||
        !category ||
        !contact ||
        !description
    ) {
        return res.send('<script>alert("All fields are required"); window.history.back();</script>');
    }
    let createdevent = await eventModel.create({
        eventtitle,
        location,
        image,
        date,
        time,
        category,
        contact,
        description
    });
    res.redirect("/read");
});

app.post("/signup", async (req, res) => {
    let { fullname, email, password } = req.body;
    if (
        !fullname ||
        !email ||
        !password
    ) {
        return res.send('<script>alert("All fields are required"); window.history.back();</script>');
    }
    let createduser = await userModel.create({
        fullname,
        email,
        password,
    });
    res.redirect("/");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});