const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client(settings);


var someId = process.argv[2];

//Function to loop through array
let printLine = (row) => {
      console.log("-"+
        row.id,
        row.first_name,
        row.last_name,
       "'"+row.birthdate.toISOString().slice(0, 10)+"'");
    }

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  // if (typeof(someId) !== "number") throw error;
  client.query(`SELECT * FROM famous_people WHERE first_name = $1;`, [someId], (error, results) => {
    if (err) {
      return console.error("error running query", err);
    }

    console.log(`Found ${results.rows.length} person(s) by the name '${someId}':`)

    // display all results received
    results.rows.forEach(printLine)

    client.end(error => {
      if (error) throw error;
    });
  });
  console.log("Searching...");
});
