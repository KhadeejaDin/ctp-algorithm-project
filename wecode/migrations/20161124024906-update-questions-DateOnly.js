'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     return queryInterface.changeColumn(
        'questions',
        'date',
        {
          type: Sequelize.DATEONLY
        }
  )
  },

  down: function (queryInterface, Sequelize) {
     return queryInterface.changeColumn(
        'questions',
        'date',
        {
          type: Sequelize.DATE
        }
  )
  }
};
