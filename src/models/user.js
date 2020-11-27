// user.js
// User Class

export default class User {
    constructor(id, username, email, firstName, lastName, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }
}
