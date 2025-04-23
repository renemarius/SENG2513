// models/attempts.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Quiz from './quiz.js';
import User from './user.js';

// Attempts Table
const Attempts = sequelize.define('attempts', {
  attemptsID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'userID',
    },
  },
  quizID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Quiz,
        key: 'quizID',
    },
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


export default Attempts;
export{ Attempts };