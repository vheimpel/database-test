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

//Function to loop through array
let printLine = (row) => {
      console.log("-"+
        row.id,
        row.first_name,
        row.last_name,
       "'"+row.birthdate.toISOString().slice(0, 10)+"'");
    }

if (!someId) { //Checks if the user has provided a name before continuing
    console.error('Empty!');
 } else {

knex
  .select('*').from('famous_people').where('first_name', someId)
  .then(results => {
    if (results.length === 0) {
    console.error('Not in database!');
    } else {
      // display all results received
      results.forEach(printLine)
    }
  })
}



