const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5001;

connectDb();
const app = express();

app.use(express.json());
app.use('/api/contact', require("./routes/contactRoute"));
app.use('/api/users', require("./routes/userRoute"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})