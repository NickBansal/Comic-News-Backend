const app = require('./app')
const port = 8000;
// 'mongodb://Bansal321:75J0tryG!@ds131753.mlab.com:31753/ncnews'

app.listen(process.env.PORT, process.env.MONGO_URI, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
})