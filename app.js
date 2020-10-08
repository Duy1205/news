let express         = require('express');
let mongoose        = require('mongoose');
let bodyParser      = require('body-parser');
let app             = express();
let moment          = require('moment');
let expressSession  = require('express-session');
let cookieParser    = require('cookie-parser');

const TOPIC_ROUTE = require('./routes/topic');
const POST_ROUTE = require('./routes/post');
const COMMENT_ROUTE = require('./routes/comment');
const USER_ROUTE = require('./routes/user');

require('dotenv').config();

const {renderToView} = require('./utils/childRouting');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views', './views/');
app.use(cookieParser());

app.use(expressSession({
    secret: 'webTinTuc',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 10 * 60 * 1000 * 20
    }
}))

app.use('/topics', TOPIC_ROUTE);
app.use('/posts', POST_ROUTE);
app.use('/comments', COMMENT_ROUTE);
app.use('/users', USER_ROUTE);

app.get('/', async (req, res) => {
    renderToView(req, res, 'pages/home', {});
})

// app.get('/demo', async (req, res) => {
//     renderToView(req, res, 'pages/demo', {});
// })

// app.get('/demo2', async (req, res) => {
//     renderToView(req, res, 'pages/demo2', {});
// })

let uri     = process.env.MONGODB_URI;
const PORT  = process.env.PORT;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
console.log(`mongodb connected`);
app.listen(PORT,() => console.log(`sever connected at port ${PORT}`)
)
})