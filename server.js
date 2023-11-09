import express from "express";
import bodyParser from "body-parser";
// import HistoryQues from "./question.js";
import cors from 'cors';
import mongoose from "mongoose";
import Quiz from './models/quizDataModel.js';


const MONGO_URI = 'mongodb+srv://admin:NitishVerma@cluster0.a4iqsms.mongodb.net/EduQuiz?retryWrites=true&w=majority';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.urlencoded({extended : true}));
app.use(cors({ origin: "*" }));

app.get('/quiz/:topic', async (req, res) => {
    try {
        const topic = req.params.topic;

        console.log(topic);

        if (!topic) {
            throw new Error("topic is mandatory param!");
        }
        
        const quizData = await Quiz.find({topic: topic});
        let set = new Set(); 

        console.log(quizData);

        if (!quizData || !quizData.length) {
            throw new Error("no data for topic " + topic);
        }

        while(true) {
            set.add(Math.floor(Math.random() * quizData.length));
            if (set.size === 10) break;
        }
        const newArr = [...set];
        const tenRandomQues = newArr.map(index => quizData[index]);

        res.status(200).json({
            "status": {
                "code": 0,
                "message": "success"
            },
            "data": tenRandomQues
        });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: error.message
        });
    }
});

app.post('/question', async (req, res) => {
    try {
        const quiz = await Quiz.insertMany(req.body);
        console.log('quiz created succesfully');
        res.status(200).json(quiz);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({
            message: error.message
        });
    }
});

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("db is connected!");

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
    } catch (e) {
        console.log(`database is not connected! ${e.message}`);
    }
}

connectDB();