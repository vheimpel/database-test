var knexConfig = {
  client: 'postgresql',
  connection: {
    "user": "development",
    "password": "development",
    "database": "vagrant",
    "hostname": "localhost",
    "port": 5432,
    "ssl": true
  }
}
var knex = require('knex')(knexConfig)

var someId = process.argv[2];

if (!someId) { //Checks if the user has provided a name before continuing
    console.error('Empty!');
 } else {

knex
  .select('first_name').from('famous_people').where('first_name', someId)
  .then(results => {
    if ('first_name' != someId) {
    console.error('Not in database!');
    } else {
      console.log(results); // Prints the results
    }
  })
}



