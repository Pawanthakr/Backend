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
})

app.get("/read", async (req, res) => {
    let users = await userModule.find();
    res.render("read", { users });
})


app.get("/delete/:id", async (req, res) => {
    let users = await userModule.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
})

app.post("/create", async (req, res) => {
    let { name, email, image } = req.body;
    let createduser = await userModule.create({
        name,
        email,
        image
    });
    res.redirect("/read");
})

app.listen(3000);