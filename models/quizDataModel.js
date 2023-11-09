import mongoose from "mongoose";

const quizDataSchema = mongoose.Schema({
    "ques": {
        "type": String,
         required:true
    },
    "topic": {
        "type": String,
         required:true
    },
    "options": {
         type: [String],  // Array of options
         required:true
    }, 
    "correctAnswer": { 
          type: Number,   // Index of the correct answer in the 'options' array
          required:true
    },
    "explanation": {
        "type": String,
         required:false
    }

}, { timestamps: true});

/*In Mongoose, the timestamps option is a feature 
that allows you to automatically manage two fields, createdAt and updatedAt 
createdAt: This field is automatically set to the date and time when a document 
is first created. And updatedAt: This field is automatically updated to the 
current date and time whenever a document is updated. */

const Quiz = mongoose.model('Quiz', quizDataSchema);

export default Quiz;



