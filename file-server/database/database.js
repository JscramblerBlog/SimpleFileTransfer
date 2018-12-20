
  const User = require('../model/user');


  User.sync({force: true}).then((res) => {
    //Table CREATED
  });




 