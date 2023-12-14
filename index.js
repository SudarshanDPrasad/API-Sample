const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    const user = request.query.user;
 
    response.send(user + "!");
 });
 
 const users = [];
 
 router.post("/user", (request, response) => {
    const { user } = request.body;
 
    users.push({ username: user.username, password: user.password });
 
    response.json({ loggedIn: true, stauts: "Loggin success" })
 });
 
 router.get("/users", (request, response) => {
    response.json(users);
 })
 
 router.delete("/delete", (request, response) => {
    const { username, password } = request.body;
 
    const exisitingUser = users.find(u =>
       u.username === username && u.password === password);
 
    if (!exisitingUser) {
       response.status(401).json({ errorStatus: "Credientals Not found" });
    }
 
    users.splice(users.indexOf(exisitingUser), 1);
    response.json(users);
 })

module.exports = router;