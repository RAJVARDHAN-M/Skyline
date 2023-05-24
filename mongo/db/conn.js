const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/student")
.then(()=> {
    console.log("DB connected");
})
.catch((err) => {
    console.log(err);
})

const students_schema = new mongoose.Schema({
    name: {
        type: String
    },
    roll_no: {
        type: Number
    },
    wad: {
        type: Number
    },
    dsbda: {
        type: Number
    },
    cns: {
        type: Number
    },
    cc: {
        type: Number
    },
    ai: {
        type: Number
    }
})

const studentmarks = mongoose.model("studentmarks", students_schema)

module.exports = studentmarks