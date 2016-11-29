'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('user_upload');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.createTable('user_upload', {
      code_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uploaded_text: {
        type: Sequelize.TEXT
      },
      upload_code: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      upload_output: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
   });
  }
};
