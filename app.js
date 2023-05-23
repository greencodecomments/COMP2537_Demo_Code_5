const express = require('express');

const app = express();

const port = process.env.PORT || 3023;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/', (req, res) => {
    const {schema} = require('./joi-schema');

    var result = schema.validate(req.body, {abortEarly: false})

    if (result.error) {
        res.render("index-post", {errors: result.error.details});
    }
    else {
        res.render("index-post", {success: true});
    }
});



app.use(express.static('./public'));

app.get("*", (req, res) => {
    res.status(404);
    res.render('404');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});