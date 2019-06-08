const express = require('express')
const dbConnection = require('./database/config/db') 
const passport = require('./passport');
const user = require('./routes/user')
const testRouter = require('./routes/tests')
const loanRouter = require('./routes/loan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
const port =  process.env.PORT || '3030';
// MIDDLEWARE
app.use(morgan('dev'))

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(allowCrossDomain);
app.use(bodyParser.json())

app.use(
    session({
      secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
      resave: false, //required
      saveUninitialized: false, //required
      store: new MongoStore({ mongooseConnection: dbConnection }),
    })
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser



app.use('/api/user', user)
app.use('/api/test', testRouter)
app.use('/api/loan', loanRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))