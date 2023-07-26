const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// Assuming you have other middleware and configurations to include,
// add them here using app.use(...)
app.use(cookieParser())

const db = require("./app/models");
const Role = db.role;

// Sync the database and create initial roles
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

// Other routes and middleware will go here

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
