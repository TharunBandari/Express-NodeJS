// Import express.js
var express = require('express');
// Initialize express.js environment
var app = express();
var bparser = require('body-parser');
var bparserinit = bparser.urlencoded({ extended: false });

var users = [
    { userID: '100', firstName: 'Thaurn', lastName: 'Bandari' },
    { userID: '101', firstName: 'Varun', lastName: 'Bandari' },
    { userID: '102', firstName: 'Dinesh', lastName: 'k' },
    { userID: '103', firstName: 'Teja', lastName: 'S' }
];

function addNewUser(request, response) {
    var user_ID = request.body.uid;
    var first_Name = request.body.fname;
    var last_Name = request.body.lname;
    users.push({ userID: user_ID, firstName: first_Name, lastName: last_Name });
    response.send("<b>User Added. Total Users: " + users.length + "</b>");
}
app.post('/addUser', bparserinit, addNewUser);

function retrieveUser(request, response) {
    var status = false;
    var userID = request.query.uid;
    var firstName = request.query.fname;
    for (user of users) {
        if (userID == user.userID && firstName == user.firstName) {
            status = true;
            response.send(user);
            break;
        }
    }
    if (!status) {
        response.end("<b> No Employee with ID </b> " + userID);
    }
}
app.get("/getUser", retrieveUser);

function getAllUsers(request, response) {
    var resp = users;
    response.send(resp);
}
app.get("/getAllUsers", getAllUsers);

var visitorCount = 0;

function home(request, response) {
    var resp = "<html><body><b>Welcome to our site..<br>";
    resp += "<a href='/welcome'>Welcome page</a></body></html>"; // Use += to concatenate strings
    response.send(resp);
}

app.get('/', home);

function welcome(request, response) {
    var today = new Date();
    visitorCount++;
    var resp = "<html><body><b>Today : " + today;
    resp += "<b><br><b>Visitor count <b> :" + visitorCount;
    resp += "</body></html>";
    response.send(resp);
}

app.get('/welcome', welcome);

function feedback() {
    console.log("Server started on port 8080...");
    console.log("Open the browser and visit http://localhost:8080/welcome");
}

app.listen(8080, feedback);
