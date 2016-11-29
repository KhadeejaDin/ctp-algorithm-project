'use strict';
module.exports = function(sequelize, DataTypes) {
  var questions = sequelize.define('questions', {
    question_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    question_title: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: DataTypes.STRING
    },
    input: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: DataTypes.TEXT
    },
    output: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: DataTypes.TEXT
    },
    question_content: {
      allowNull: false,
      validate: {
          notEmpty: true,
      },
      type: DataTypes.TEXT
    },
    number_attempts: {
      type: DataTypes.INTEGER
    },
    number_success: {
      type: DataTypes.INTEGER
    },
    date: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: DataTypes.DATEONLY
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return questions;
};
