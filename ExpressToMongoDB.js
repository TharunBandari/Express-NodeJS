const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
app.use(cors());

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000t&appName=ExpressToMongoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the Database.');
}).catch(() => {
  console.log("Unable to Connect. Check the URL.");
});

// Define the Schema for the "Users" collection
const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  password: String,
  emailId: String,
});

// Create a model for the "Users" collection
const UserData = mongoose.model('Users', userSchema);

// Retrieve all users
app.get('/allUsers', (req, res) => {
  UserData.find()
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Could not retrieve the data.');
    });
});

// Add a new user
app.post('/addUsers', (req, res) => {
  const { userId, password, emailId } = req.body;
  const udata = new UserData({ userId: userId, password, emailId });

  udata.save()
    .then(data => {
      console.log('Insert Successfully');
      res.send('Inserted Data Successfully');
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Unable to insert the data.');
    });
});

// Update user data
app.put('/update', (req, res) => {
  const { userId, password, emailId } = req.body;

  UserData.findOne({ 'userId': userId })
    .then(user => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        user.password = password;
        user.emailId = emailId;
        return user.save();
      }
    })
    .then(updatedUser => {
      if (updatedUser) {
        console.log('User data updated successfully');
        res.send('User data updated successfully');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error updating user');
    });
});


// Delete user
app.delete('/delete', (req, res) => {
  const userId = req.body.uid;

  UserData.findOneAndRemove({ 'userId': userId })
    .then(user => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        console.log('User deleted successfully');
        res.send('User deleted successfully');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error deleting user');
    });
});

app.listen(8000, () => {
  console.log('Connected to port 8000. Waiting for requests.');
  console.log('On the browser, visit http://localhost:8000/');
});

