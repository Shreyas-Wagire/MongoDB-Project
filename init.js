const mongoose = require('mongoose');
const Chat = require('./models/chat');

main().then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "Tarak",
        to: "Jethalal",
        msg: "Masti time",
        time: new Date()
    },
    {
        from: "Bhide",
        to: "DR. Hathi",
        msg: "Haan bhai",
        time: new Date()
    },
    {
        from: "Popatlal",
        to: "Iyer",
        msg: "Kya chal raha hai",
        time: new Date()
    },
    {
        from: "Babita",
        to: "Tapu",
        msg: "Kuch nahi",
        time: new Date()
    }
];

Chat.insertMany(allChats);