const express = require("express");
const app = express();
const router = require('../route');


// app.use((request, _, next) => {
//    next()
// })

app.use(express.json());
app.use("/api",router);
app.listen(process.env.PORT || 3000, () => {
   console.log("Server Listening on PORT 3000");
});
