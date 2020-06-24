let express         = require('express');
let mongoose        = require('mongoose');
let bodyParser      = require('body-parser');
let app             = express();
let moment          = require('moment');
let expressSession  = require('express-session');
let cookieParser    = require('cookie-parser');

//ROUTE
const TOPIC_ROUTE = require('./routes/topic');
const POST_ROUTE = require('./routes/post');
const COMMENT_ROUTE = require('./routes/comment');
const USER_ROUTE = require('./routes/user');
//ChildRouting
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
        maxAge: 10 * 60 * 1000 * 10
    }
}))

app.use(express.static('./public'));

app.use('/topics', TOPIC_ROUTE);
app.use('/posts', POST_ROUTE);
app.use('/comments', COMMENT_ROUTE);
app.use('/users', USER_ROUTE);

app.get('/', async (req, res) => {
    renderToView(req, res, 'pages/home', {});
})

app.get('/dashboard', (req, res) => {
    renderToView(req, res, 'pages/dashboard', {});
});
app.get('/add-post', (req, res) => {
    renderToView(req, res, 'pages/add-post', {});
});
app.get('/add-topic', (req, res) => {
    renderToView(req, res, 'pages/add-topic', {});
});
app.get('/add-user', (req, res) => {
    renderToView(req, res, 'pages/add-user', {});
});
app.get('/listpost', (req, res) => {
    renderToView(req, res, 'pages/listpost', {});
});
app.get('/listtopic', (req, res) => {
    renderToView(req, res, 'pages/listtopic', {});
});

let uri     = 'mongodb://localhost:27017/webtintuc';
const PORT  = process.env.PORT || 3000;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
console.log(`mongodb connected`);
app.listen(PORT,() => console.log(`sever connected at port ${PORT}`)
)
})