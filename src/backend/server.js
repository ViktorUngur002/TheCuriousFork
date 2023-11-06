const dotenv = require("dotenv");
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
//const { checkTokenInCookie } = require('./middlewares/checkLoggedMiddleware');
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
app.use(cookieParser());
app.use('/public/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));
//app.use(checkTokenInCookie);

app.use('/',  require('./routes/pageRouters'));
app.use('/signup', require('./routes/registerRouter'));
app.use('/signin', require('./routes/authRouter'));
app.use('/logout', require('./routes/logoutRouter'));
app.use('/user/update', require('./routes/updateUserRouter'));
app.use('/user/delete', require('./routes/deleteUserRouter'));
app.use('/addProducts', require('./routes/addProductRouter'));
app.use('/product/update', require('./routes/updateProductRouter'));
app.use('/product/delete', require('./routes/deleteProductRouter'));
app.use('/addOrder', require('./routes/addOrderRouter'));
app.use('/', require('./routes/getOneProductRouter'));
app.use('/', require('./routes/mePageRouter'));
app.use('/', require('./routes/getMainCourseProductsRouter'));
app.use('/', require('./routes/getDessertsProductsRouter'));
app.use('/', require('./routes/getSaladsProductsRouter'));
app.use('/', require('./routes/getAllUsers'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});