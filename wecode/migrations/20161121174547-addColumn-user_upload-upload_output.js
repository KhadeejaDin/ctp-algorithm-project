'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     return queryInterface.addColumn(
        'user_upload',
        'upload_output',
        {
          type: Sequelize.TEXT,
          allowNull: false
        }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('user_upload', 'upload_output');
  }
};
