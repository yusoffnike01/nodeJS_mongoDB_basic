const express = require("express");
const mongoose = require('mongoose');
const router = require("./routes/user-routes");

const app = express();

app.use(express.json());
app.use("/users", router); // users/

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://admin:1RuIQ6emloxsfHAx@cluster0.jirqhys.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>app.listen(5000, ()=> console.log("Connected and Listening on Port 5000"))
).catch((err)=> console.log(err));


