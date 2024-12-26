const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

main().then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

// index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    res.render("index", { chats });
});

// new chat route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// create chat route
app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        time: new Date()
    });
    newChat.save().then(() => {
        console.log("Chat saved successfully");
        res.redirect("/chats");
    }).catch((err) => {
        console.log(err);
    });
});

// edit chat route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params; 
    let chat = await Chat.findById(id);
    res.render("edit.ejs ", { chat });
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});