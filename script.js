const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout:'main'});
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4000);

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/results', (req, res) => {
    var entries = [];
    for (var entry in req.query) {
        entries.push({'name':entry, 'value':req.query[entry]});
    }
    var displayGetObject = {};
    displayGetObject.dataList = entries;
    res.render('get-results', displayGetObject)
});

app.post('/results', (req, res) => {
    var queryEntries = [];
    for (var queryEntry in req.query) {
        queryEntries.push({'queryName':queryEntry, 'queryValue':req.query[queryEntry]});
    }
    var displayObject = {};
    displayObject.dataList = queryEntries;
    
    var bodyEntries = [];
    for (var bodyEntry in req.body) {
        bodyEntries.push({'bodyName':bodyEntry, 'bodyValue':req.body[bodyEntry]});
    }
    displayObject.items = bodyEntries;
    res.render('post-results', displayObject)
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + '; pres Ctrl-C to terminate.');
});
