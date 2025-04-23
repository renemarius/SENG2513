// models/savedQuiz.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
//import Quiz from './savedResult.js'; 

// savedQuiz Table
const savedQuiz = sequelize.define('savedquiz', {
  questionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  /*quizID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Quiz,
      key: 'quizID',
    },
  },*/
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userAnswer: {
    type: DataTypes.STRING,
  },
  explanation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  
});


export default savedQuiz;
export{ savedQuiz };