const express = require('express');
const router = express.Router();
const { DataTypes } = require("sequelize");
const Joi = require('joi');


router.get("/", (request, response) => {
   const user = request.query.user;

   response.send(user + "!");
});

const users = [];
const usersNew = [];

router.post("/user", (request, response) => {
   const schema = Joi.object().keys({
      username: Joi.string(),
      password: Joi.string().min(5).max(9)
   });
   const { error } = schema.validate(request.body);
   if (error) return response.status(400).send(error.details[0].message);

   const userExist = usersNew.find(
      u =>  u.name.username === request.body.username
   )

   if (userExist) {
      return response.status(401).send("user already exists");
   }

   const newUser = {
      id: usersNew.length + 1,
      name : {
         username : request.body.username
      },
      password : {
         password : request.body.password
      }
   }
   usersNew.push(newUser);
   // // response.json({ loggedIn: true, stauts: "Loggin success" })
   response.json(usersNew);

});

router.get("/users", (request, response) => {
   response.json(usersNew);
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