model = require('../Models/users.model');
hash = model.hashPassword();

var person = {
    fname: "John",
    lname: "Doe",
    age: 25,
    concatenate: function() {
        return this.fname + " " + this.lname;
    },
    getter: function() {
        for (var key in person) {
            return key + "=" + person[key];
        }
    }
}

pwd = 'mypassword'
hashed = hash(pwd);
console.log(pwd, hashed);