const dotenv = require("dotenv");
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;

dotenv.config();

mongoose
  .connect(process.env.DATABSE_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error(err.message);
  });


const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.use('/',  require('./routes/pageRouters'));
app.use('/signup', require('./routes/registerRouter'));
app.use('/signin', require('./routes/authRouter'));
app.use('/logout', require('./routes/logoutRouter'));
app.use('/', require('./routes/mePageRouter'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});