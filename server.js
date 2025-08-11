// server.js
const express = require('express');
const userRouter = require('./router/router');
const connectDB = require('./model/dbconnect')
const app = express();
const Port = process.env.PORT || 5000;
app.use(express.json());
app.use('/', userRouter);




(async () => {
    try {
        await connectDB();
        app.listen(Port, () => {
            console.log(`Server is running on port ${Port}`);
        });
    } catch (error) {
        console.error(error);
    }
})();