import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Quiz from './quiz.js'; 

// Question Table
const Question = sequelize.define('question', {
  questionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quizID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Quiz,
        key: 'quizID',
    },
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


export default Question;
export{ Question };