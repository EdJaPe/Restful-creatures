const express = require('express');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const path = require('path');
//App Set up
const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(path.join(__dirname, '/static')));
app.use(express.urlencoded({ extended: false })); //body parsing middleware
app.use(methodOverride('_method'));
//Global routes
app.get('/', (req, res) => {
    // res.send(‘HOME’)
    res.render('home')
});
app.use('/dinos', require('./routes/dinos'));

app.use ('/prehistoric_creatures', require('./routes/prehistoric_creatures'));

app.listen(8000, () => console.log('hey listen'));