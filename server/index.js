// IMPORTS FROM PACKAGES
const express = equire("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// IMPORTS FROM OTHER FILES
const adminRouter = require("./routes/admin");
const authRouter = require( "./rputes/auth");
const productRouter = require("./routes/pr)oduct");
const userRouter = require( "./routes/user");

// INIT 
const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config()

app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

mongoose
    .connect(process.env.MONGO)
    .then( () => {
    console.log("Connected to MongoDB!")
    })
    .catch((err) => {
    console.log(err)
    })

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`connected at port ${PORT}`);
      });

