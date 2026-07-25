/*require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));*/

const express = require("express");
const app = express();
const Path = require("path");
const eventModel = require("./models/eventmodel");
const userModel = require("./models/usermodel");
const session = require("express-session");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(Path.join(__dirname, "public")));
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});


app.get("/", function (req, res) {
    res.render("index", {
        user: req.session.user
    });
});

app.get("/read", async (req, res) => {
    let events = await eventModel.find();
    res.render("read", {
        events,
        user: req.session.user
    });
});

function isLoggedIn(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }
    next();
}

app.get("/add", isLoggedIn, async (req, res) => {
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

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.post("/login", async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    console.log("User found:", user);

    if (!user || user.password !== password) {
        return res.send(`
            <script>
                alert("Invalid email or password");
                window.history.back();
            </script>
        `);
    }
    req.session.user = user;
    res.redirect("/");
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

app.post("/create", isLoggedIn, async (req, res) => {
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
        description,
        creator: req.session.user.fullname
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
    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return res.send('<script>alert("User already exists. Please login."); window.location.href="/login";</script>');
    }

    let user = await userModel.create({
        fullname,
        email,
        password,
    });
    req.session.user = user;
    res.redirect("/");
});

app.listen(3000);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });