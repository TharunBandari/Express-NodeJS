const { checkConnection, checkInsertStatus, statusMessage, statusMessage, statusMessage } = require('./ExpressToMSSQL2');

function insertUser(request, response) {
    name = request.body.name;
    mobile = request.body.mobile;
    emailid = request.body.emailid;
    console.log(name + "\t\t" + mobile + "\t\t" + emailid);
    mssqlconnection.connect(checkConnection);
    mssqlconnection.query(
        'insert into users values (?,?,?)',
        [name, mobile, emailid], checkInsertStatus);
    response.send(JSON.stringify(statusMessage));
}
exports.insertUser = insertUser;
