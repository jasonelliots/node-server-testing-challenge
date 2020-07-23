const express = require("express");

const Users = require("../users/usersModel.js");

const server = express();

server.use(express.json());

// get

server.get("/", (req, res) => {
    res.status(200).json({ api: "up"})
})

// get

server.get("/users", (req, res) => {
    Users.getAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// post

server.post("/users", (req, res) => {

    Users.insert(req.body)
        .then(user => {
            res.status(201).json({user})
        })
        .catch(err => {
            console.log(req.body); 
            res.status(500).json({ message: "could not add user", error: err.message})
        })
})

// delete

server.delete("/users/:id", (req, res) => {
    Users.remove(req.params.id)
    .then(user => {
        res.status(201).json({user})
    })
    .catch(err => {
        res.status(500).json({ message: "could not remove user"})
    })
})


module.exports = server;
