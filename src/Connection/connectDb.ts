import mongoose from "mongoose";
const DB = process.env.DB
mongoose.connect(DB!)
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB!")
})

mongoose.connection.on("error", () => {
    console.log("Error connecting to MongoDB!")
})