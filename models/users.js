const db = require('../util/connect');

module.exports = class Users {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static getAll() {
        //db query
        return db.execute('SELECT * FROM users');
    }

    static getById(id) {
        return db.execute('SELECT id,name,email FROM users WHERE id = ?', [id]);
    }

}