const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const rewardsRouter = require('./routes/rewardsRouter');
const PORT = process.env.PORT || 5000;
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/rewards", rewardsRouter);


const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://pavel:1q2w3e@cluster1.0ec6j4p.mongodb.net/?retryWrites=true&w=majority`,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            });
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();


