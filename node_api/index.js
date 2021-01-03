const express = require('express');

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data
const users = [{name: "krut", age: 12}, {name: "bine", age: 20}];

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.json("server is available");
});

app.get('/api/users', (request, response) => {
  console.log('api/users called!')
  response.json(users);
});

app.post('/api/user', (request, response) => {
  const user = request.body.user;
  console.log('Adding user: ', user);
  users.push(user);
  response.json("user added");
});


app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});