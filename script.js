// nodejs is a js runtime environment that allows us to run js code outside the browser.
// const fs = require('node:fs');

// fs.writeFile('hello.txt', 'hello kase ho ', function (err) {
//     if (err) console.error(err);
//     else console.log('File created successfully!');
// });

// fs.appendFile('hello.txt', 'ma badiya hu', function (err) {
//     if (err) console.error(err);
//     else console.log('File append successfully!');
// });

// fs.rename('hello.txt', 'greet.txt', function (err) {
//     if (err) console.error(err);
//     else console.log('File renamed successfully!')
// });

// fs.copyFile('greet.txt', './copy/greet_copy.txt', function (err) {
//     if (err) console.error(err);
//     else console.log('File copied successfully!')
// });

// fs.unlink('greet.txt', function (err) {
//     if (err) console.error(err);
//     else console.log('File deleted successfully!')
// });

// fs.rmdir('./copy', function (err) {
//     if (err) console.error(err);
//     else console.log('Directory deleted successfully!')
// });
// it remove the file but if the file is not empty it will throw an error so we can use fs.rm also to remove the directory and all its contents
// fs.rm('./copy', { recursive: true }, function (err) {
//     if (err) console.error(err);
//     else console.log('Directory and its contents deleted successfully!')
// });

// fs.readFile('greet.txt', "utf8", function (err, data) {
//     if (err) console.error(err);
//     else console.log(data);
// });


// fs.mkdir('./new_directory', { recursive: true }, function (err) {
//     if (err) console.error(err);
//     else console.log('Directory created successfully!');
// });

// fs.readdir('Backend', function (err, files) {
//     if (err) console.error(err.message);
//     else console.log(files);
// });



// nodejs core ma jo installe ata hai wo khelaate hai module.
// npm se donlowad krte hai usa package kehta hai.

// dependency --> package and package ke dependency
// dev dependency --> package that is only needed for development and not for production. like nodemon, eslint etc.

// express js is a npm package.
// it is a framework.
// it manages everything from receiving the request to sending the response.


// const express = require("express");
// const app = express();
// app.use(function (req, res, next) {
//     console.log("middleware chala");
//     next();
// });
// app.get("/", function (req, res) {
//     res.send("champion hu ma")
// });

// app.get("/profile", function (req, res, next) {
//     return next(new Error("profile page is under construction"));
// });

// error handling middleware-> it is a middleware that is used to handle errors. it takes four arguments, err, req, res, next. it is used to handle errors that occur in the application. it is defined after all the routes and other middleware. it is used to catch errors that occur in the application and send a response to the client. it is also used to log errors and perform other error handling tasks. 

// app.use(function (err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send("Something broke!");
// });

// app.listen(3000);


// middleware-> ya request or router ke beach me aata hai. ya hm kch bhi deatil print kra skte hai ya kch bhi kr skte hai. jaise ki authentication, logging, error handling etc. 

// session-> ya ek aisa mechanism hai jisme hum user ke data ko server side par store krte hai. jab user login krta hai to uska data session me store ho jata hai aur jab user logout krta hai to uska data session se delete ho jata hai. session me data store krne ke liye hum express-session package ka use krte hai.

// cookie-> ya ek aisa mechanism hai jisme hum user ke data ko client side par store krte hai. jab user login krta hai to uska data ka sath ek sring bhejta ha jissa servee ko pta rheta hai ki ap ho kon jb tk vo string hai string remove then dubara login krna padega.



// const express = require("express");
// const app = express();
// const Path = require("path");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(Path.join(__dirname, "public")));
// app.set("view engine", "ejs");

// app.get("/", function (req, res) {
//     res.render("index");
// });

// dynamic route
// app.get("/profile/:username", function (req, res) {
//     res.send(`Welcome ${req.params.username}`);
// });

// app.get("/profile/:username/:age", function (req, res) {
//     res.send(`Welcome ${req.params.username} of age ${req.params.age}`);
// });

// app.listen(3001, function () {
//     console.log("Server is running on port 3001");
// });





// const express = require("express");
// const app = express();
// const Path = require("path");
// const fs = require('node:fs');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(Path.join(__dirname, "public")));
// app.set("view engine", "ejs");


// app.get("/", function (req, res) {
//     fs.readdir('./files', function (err, files) {
//         res.render("index", { files: files });
//     })
// })

// app.post("/create", function (req, res) {
//     fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function (err) {
//         res.redirect("/");
//     })
// })

// app.get("/file/:filename", function (req, res) {
//     fs.readFile(`./files/${req.params.filename}`, "utf8", function (err, data) {
//         res.render("file", { title: req.params.filename, details: data });
//     })
// })

// app.get("/edit/:filename", function (req, res) {
//     res.render("edit", { filename: req.params.filename });

// })

// app.post("/edit", function (req, res) {
//     fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function (err) {
//         res.redirect("/");
//     })
// })

// app.listen(3001, function () {
//     console.log("Server is running on port 3001");
// })


const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
    res.send("hey")
})

app.get("/create", async (req, res) => {
    let createduser = await userModel.create({
        name: "kunal",
        username: "kunal12j",
        email: "kunalthakre12j@gmail.com"
    })
    res.send(createduser);
})

app.get("/read", async (req, res) => {
    let users = await userModel.find()
    res.send(users);
})


app.get("/update", async (req, res) => {
    let updateduser = await userModel.findOneAndUpdate({ name: "pawanthakre" }, { username: "pawan8n" }, { returnDocument: "after" })
    res.send(updateduser);
})


app.get("/delete", async (req, res) => {
    let deleteduser = await userModel.findOneAndDelete({ name: "kunal" })
    res.send(deleteduser);
})


app.listen(3000);