'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('user_upload', 'uploaded_text', 'upload_code');
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.renameColumn('user_upload', 'upload_code', 'uploaded_text');
  }
};
