const express = require("express");
const app = express();
const Path = require("path");
const userModule = require("./models/usermodel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(Path.join(__dirname, "public")));


app.get("/", function (req, res) {
    res.render("index");
});

app.get("/read", async (req, res) => {
    let events = await userModule.find();
    res.render("read", { events });
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
    let event = await userModule.findOne({ _id: req.params.eventid });
    res.render("edit", { event: event });
});

app.post("/update/:eventid", async (req, res) => {
    let { eventtitle, location, image, date, time, category, contact, description } = req.body;
    let event = await userModule.findOneAndUpdate({ _id: req.params.eventid }, { eventtitle, location, image, date, time, category, contact, description }, { new: true });
    res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
    let events = await userModule.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
})

app.post("/create", async (req, res) => {
    let { eventtitle, location, image, date, time, category, contact, description } = req.body;
    let createdevent = await userModule.create({
        eventtitle,
        location,
        image,
        date,
        time,
        category,
        contact,
        description
    });
    console.log(req.body);
    res.redirect("/read");
})

app.listen(3000);