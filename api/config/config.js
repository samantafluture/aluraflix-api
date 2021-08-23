require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
    // eslint-disable-next-line no-undef
    use_env_variable: DATABASE_URL
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS,
    // database: process.env.DB_NAME,
    // host: process.env.DB_HOST,
    // dialect: process.env.DB_DIALECT || 'mysql',
    // storage: './tests/database.sqlite'
};
