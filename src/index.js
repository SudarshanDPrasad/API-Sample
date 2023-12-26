// Purpose: Entry point for the application
import express from 'express'
import {
   getAllUsers,
   createUser,
   queryUserName,
   deleteUser,
   createUserArticle,
   getAllArticles,
   deleteArticle
} from '../database.js'
import Joi from 'joi'

const app = express();

app.use(express.json());

// Users
app.get("/users", async (req, res) => {
   const users = await getAllUsers()
   res.status(200).send(users[0])
})

app.post("/newuser", async (req, res) => {
   console.log(req.body)
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
      res.status(200).send(users);
   }
});

app.get("/searchuser", async (req, res) => {
   const { username, password } = req.query;
   const users = await queryUserName(username,password)
   const articlesList = await getAllArticles();
   const articleExist = []
   articlesList[0].forEach((user) => {
      if (user.username === username) {
         articleExist.push(user)
      }
   })
   if (users.length === 0) {
      res.status(200).send({ "error": "Please check the credientals" })
   } else {
      res.status(200).send({
         "user": users[0],
         "articles": articleExist
      })
   }
});

app.delete("/deleteuser", async (req, res) => {
   const username = req.query.username
   const users = await deleteUser(username)
   res.status(200).send(users[0])
});

// Articles
app.get("/articles", async (req, res) => {
   const articles = await getAllArticles()
   if (articles[0].length === 0) {
      res.status(200).send({ "error": "sorry no articles" })
   } else {
      res.status(200).send(articles[0])
   }
})

app.post("/newArticle", async (req, res) => {
   const { username, author, title, urlToImage, description, url, publishedAt, content, sourceName } = req.body;
   const articlesList = await getAllArticles();
   const articleExist = []
   articlesList[0].forEach((user) => {
      if (user.username === username && user.title === title) {
         articleExist.push(user)
      }
   })
   if (articleExist.length > 0) {
      res.status(401).send({ "error": "sorry article already exists" });
   } else {
      const article = await createUserArticle(username, author, title, urlToImage, description, url, publishedAt, content, sourceName)
      res.status(200).send(article);
   }
});

app.delete("/deleteArticle", async (req, res) => {
   const { id, username } = req.body;
   console.log(req.body)
   const users = await deleteArticle(id, username)
   res.status(200).send({ "message": "article deleted" })
});

const port = process.env.PORT || 5432
app.listen(port, () => {
   console.log("Server Listening on PORT " + port);
});
