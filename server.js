let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');

let app = express();

//For the db
let db = [];

//For file rendering:
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// static assets
app.use(express.static('images'));
app.use(express.static('styles.css'));

//Enables us to navigate to the folder where the html files reside
//app.use(express.static(__dirname + '/htmlFiles'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.get('/', function(req, res){
    res.sendFile(__dirname + '/htmlFiles/index.html');
});


//Getting a new task...
//This method sends the html file
app.get('/newTask', function(req, res){
    res.sendFile(__dirname + '/htmlFiles/newTask.html');
});

//This method receives a html input
app.post('/newTask', function(req, res){
   

    db.push({
        taskName: req.body.tTask,
        taskDate: req.body.tDate,
        taskDesc: req.body.tDesc
    })

});

app.get('/ListTask', function(req, res){
    res.render('ListTask.html', {taskDb:db})
});


app.listen(8080);