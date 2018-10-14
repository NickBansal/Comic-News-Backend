let env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        DB_URL: 'mongodb://localhost:27017/nc_news'
    },
    test: {
        DB_URL: 'mongodb://localhost:27017/nc_news_test'
    },
    production: 'mongodb://NickBansal:75J0tryG@ds131753.mlab.com:31753/ncnews'
}

module.exports = config[env];