const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.json())
const { users } = require('./state')
let usersCount = users.length;

// BEGIN - create routes here ---------------------------------------------------------------------

// * GET /users
app.get('/users', (req, res) => {
  return res.json(users);
})

//   * GET /users/1
app.get('/users/1', (req, res) => {
  console.log(req.body);
  return res.json(users[0]);
})

// * POST /users
// app.post('/users', (req, res) => {
//   let newUser = {
//     "_id": 6,
//     "name": "Cody",
//     "occupation": "Bounty Hunter",
//     "avatar": "http://vignette4.wikia.nocookie.net/deadliestfiction/images/d/de/Spike_Spiegel_by_aleztron.jpg/revision/latest?cb=20130920231337"
//   }
//   users.push(newUser);
//   res.json(users);
// }) 

// * PUT /users/1
app.put('/users/1', (req, res) => {
  console.log(users[0].name);
  users[0].name = "Jeff Goldblum";
  console.log(users[0].name);
  return res.json(users[0].name);
})

//* DELETE /users/1
app.delete('/users/1', (req, res) => {
  const user = users[0];
  users.splice(user, 1);
  return res.json(users);
})

// ## Part 2. Body-parser module
app.post('/users', (req, res) => {
  console.log(req.body.name);
  // let counter = users.length + 1;
  const user = {
    id: usersCount++,
    ...req.body
  };
  // user._id = counter;
  users.push(user);
  console.log(users);
  res.json(user);
});

//Part 2: body-parser module
app.post('/users')



//  * GET /users/1 => GET /users/:userId
app.get('/users/:userId', (req, res) => {
  // const id = req.params.userID;
  // console.log(id);
  const findUser = users.find(user => user._id === req.params.userId)
  // const filteredUsers = users.filter((user) => user._id === Number(id));
  res.json(findUser)
});

// END - create routes here ---------------------------------------------------------------------

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))