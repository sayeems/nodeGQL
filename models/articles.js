const db = require('../util/connect');

module.exports = class Articles {
    constructor(id, content, author) {
        this.id = id;
        this.author = author;
        this.content = content;
    }

    static getAll() {
        //db query
        return db.execute('SELECT * FROM articles');
    }

    static getAllByAuthorId(author) {
        //db query
        return db.execute('SELECT * FROM articles WHERE created_by = ?', [author]);
    }

    static create(content) {
        return db.execute('INSERT INTO articles (title,body) VALUES (?,?)', [content.title, content.body]);
    }

    static getById(id) {
        return db.execute('SELECT * FROM articles WHERE id = ?', [id]);
    }

    static update(id, content) {
        return db.execute('UPDATE articles SET title = ?, body = ? WHERE id = ?', [content.title, content.body, id]);
    }

    static delete(id) {
        return db.execute('DELETE FROM articles WHERE id = ?', [id]);
    }
}