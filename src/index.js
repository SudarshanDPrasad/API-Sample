// Purpose: Entry point for the application
import express from 'express'
import { getAllUsers, createUser, queryUserName, deleteUser } from '../database.js'
import Joi from 'joi'

const app = express();

app.use(express.json());
app.get("/users", async (req, res) => {
   const users = await getAllUsers()
   res.status(200).send(users[0])
})


app.post("/users", async (req, res) => {
   const { username, password } = req.body;
   const usersList = await getAllUsers();
   const userExist = usersList[0].find(
      u => u.username === username
   )
   const schema = Joi.object().keys({
      username: Joi.string(),
      password: Joi.string().min(5).max(9)
   });
   const { error } = schema.validate(req.body);
   if (error) {
      res.status(400).send({ "error": error.details[0].message })
   } else if (userExist) {
      res.status(401).send({ "error": "sorry user already exists" });
   } else {
      const users = await createUser(username, password)
      res.status(201).send(users);
   }
});

app.get("/users/:username", async (req, res) => {
   const username = req.params.username
   const users = await queryUserName(username)
   res.status(200).send(users[0])
});

app.delete("/users/:username", async (req, res) => {
   const username = req.params.username
   const users = await deleteUser(username)
   res.status(200).send(users[0])
});

const port = process.env.PORT || 5432
app.listen(port, () => {
   console.log("Server Listening on PORT " + port);
});
