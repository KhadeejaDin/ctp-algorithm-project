'use strict';

var input = `14
-927101048 -927101048
-618970250 648940120
-804722077 -964548842
-366618439 -188307001
380565241 165732307
918809675 -215309091
842843672 -953850991
363785686 728361547
31682488 31682488
288101856 868511451
-325935686 -595215593
-382147959 231270880
-2 -2
-879489962 -88890426
`;

var output = `=
<
<
>
>
>
>
<
=
>
<
>
=
<
`;

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.bulkInsert('questions', [{
        question_title: 'Relational Operators',
        input: input,
        output: output,
        question_content: 'https://uva.onlinejudge.org/external/111/11172.pdf',
        number_attempts: 0,
        number_success: 0,
        date: '2016/11/24',
        createdAt: '2016/10/12',
        updatedAt: '2016/10/12'
      }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('questions', null, {});
  }
};
