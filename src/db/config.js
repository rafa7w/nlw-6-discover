const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

module.exports = () => {
    // Abrindo a conexão com o banco
    open({
        filename: '/src/db/rocket.sqlite',
        driver: sqlite3.Database
    });
};

