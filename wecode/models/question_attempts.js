'use strict';
module.exports = function(sequelize, DataTypes) {
  var question_attempts = sequelize.define('question_attempts', {
    attempt_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    question_id: {
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
      },
      type: DataTypes.INTEGER
    },
    user_id: {
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
      },
      type: DataTypes.INTEGER
    },
    upload_code: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: DataTypes.TEXT
    },
    upload_output: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: DataTypes.TEXT
    },
    success: {
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      type: DataTypes.BOOLEAN
    },
    upload_time: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return question_attempts;
};
