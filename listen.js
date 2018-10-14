const app = require('./app')
const port = 8000;


app.listen(process.env.PORT, process.env.DB_URI)