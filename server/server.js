const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('hello from heroku')
});
// const CONNECTION_URL = "mongodb+srv://petAdmin:petAdmin123@cluster0.cl8lm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5050;

mongoose.connect("mongodb+srv://petAdmin:petAdmin123@cluster0.cl8lm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>{
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  })
  .catch((error) => console.log(error));

mongoose.set("useFindAndModify", false);
