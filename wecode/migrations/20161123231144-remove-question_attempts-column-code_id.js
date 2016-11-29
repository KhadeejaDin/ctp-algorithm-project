'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('question_attempts', 'code_id')
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'question_attempts',
        'code_id',
        {
            allowNull: false,
            references: { model: 'uploaded_codes', key: 'code_id' },
            type: Sequelize.INTEGER
        }
    );
  }
};
