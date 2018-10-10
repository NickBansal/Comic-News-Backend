let env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        DB_URL: 'mongodb://localhost:27017/nc_news'
    },
    test: {
        DB_URL: 'mongodb://localhost:27017/nc_news_test'
    }
}

module.exports = config[env];