'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameTable('uploaded_codes', 'user_upload');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameTable('user_upload', 'uploaded_codes');
  }
};
