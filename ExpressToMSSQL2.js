var mssql = require('mysql');
var exp = require('express');
var cors = require('cors');
var bparser = require('body-parser');
bparserInit = bparser.urlencoded({ extended: false });
var app = exp();
app.use(cors());
app.use(exp.json());

mssqlconnection = mssql.createConnection({
  host: 'localhost',
  database: 'hello', 
  user: 'root',
  password: 'root',
  port: 3306,
});

function checkConnection(error) {
  if (error == undefined) {
    console.log("Connected to the database......");
  } else {
    console.log("error code: " + error.errno);
    console.log(error.message);
  }
}

function feedback(error) {
  if (error != undefined) {
    console.log(error.errno);
    console.log(error.message);
  } else
    console.log("Open the browser and visit http://localhost:8001/welcome");
}

app.listen(8001, feedback);

function processResults(error, results) {
  queryresults = results;
  console.log(results);
}

function displayAllUsers(request, response) {
  mssqlconnection.connect(checkConnection);
  mssqlconnection.query('select * from users', processResults);
  response.send(queryresults);
}
app.get('/getAll', displayAllUsers);


var statusMessage = "";
function checkInsertStatus(error) {
  statusMessage = (error == undefined) ? "<B>Insert Successful</b>" :
    "<b>Insert Failure" + error.message + "</b>";
}

function insertUser(request, response) {
  var name = request.body.name; 
  var mobile = request.body.mobile;
  var emailid = request.body.emailid;

  console.log(name + "\t\t" + mobile + "\t\t" + emailid);
  mssqlconnection.connect(checkConnection);
  mssqlconnection.query(
    'insert into users values (?,?,?)',
    [name, mobile, emailid], checkInsertStatus);
  response.send(JSON.stringify(statusMessage));
}

app.post('/insertUser', bparserInit, insertUser);

