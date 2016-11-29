'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      queryInterface.addColumn(
          'question_attempts',
          'upload_code',
          {
            type: Sequelize.TEXT,
            allowNull: false
          }
      );
      queryInterface.addColumn(
          'question_attempts',
          'upload_output',
          {
            type: Sequelize.TEXT,
            allowNull: false
          }
      );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('user_upload', 'upload_output');
    queryInterface.removeColumn('user_upload', 'upload_output');
  }
};
