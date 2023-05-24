const db = require("./db/conn")
const express = require("express")
const app = express()

app.get("/", (req, res)=> {
    db.find()
    .then((data)=> {
        // console.log(data);
        // res.send(data)
        var tbody = `<table>
        <th>Name</th>
        <th>Roll No</th>
        <th>WAD</th>
        <th>DSBDA</th>
        <th>CNS</th>
        <th>CC</th>
        <th>AI</th>`

        data.forEach(student => {
            tbody += `<tr>
                <td>${student.name}<td>
                <td>${student.roll_no}<td>
                <td>${student.wad}<td>
                <td>${student.dsbda}<td>
                <td>${student.cns}<td>
                <td>${student.cc}<td>
                <td>${student.ai}<td>
            </tr>`
        })
        
        tbody += "</table>"

        res.send(tbody)
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get("/marks", (req, res) => {
    db.find({dsbda: {$gt:20}})
    .then((data)=> {
        console.log(data);
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get("/update", (req, res) => {

    const roll_nos = [33149, 33150]
    db.updateMany({roll_no: roll_nos}, { $inc: {ai: 10}})
    .then((data)=> {
        console.log(data);
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get("/getall", (req, res) => {
    db.find({dsbda: {$gt:10}, cns: {$gt:10}, cc: {$gt:10}, ai: {$gt:10}, wad: {$gt:10}})
    .then((data)=> {
        console.log(data);
        res.send(data)
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get("/delete/:id", (req, res) => {

    const roll_no = Number(req.params["id"])
    console.log(typeof(roll_no));
    db.deleteOne({roll_no: roll_no})
    .then(() => {
        db.find()
        .then((data)=> {
            console.log(data);
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
        })
    })
    .catch((err) => {
        console.log(err);
    })
})
// db.insertMany({
//     name: "Khalid",
//     roll_no: "33149",
//     wad: 100,
//     dsbda: 10,
//     cns: 100,
//     cc: 100,
//     ai: 100
// })
// .then((data)=> {
//     console.log(data);
// })
// .catch((err) => {
//     console.log(err);
// })


app.listen(5000, () => {
    console.log("Server started listening on port 5000...");
})