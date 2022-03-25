const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const logger = (req, res, next) =>{
    console.log(
        `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        // 'ini pemisah'
        `${req.method} : ${req.url}`
    );
    next();
}

app.use(logger);
app.set('view engine', 'ejs');


app.get('/', (req, res) => res.render('index'));
app.get('/greet', (req, res) => {
    const name = req.query.name || 'Void'
    res.render('greet', {
        name
    })

});
const user = [];
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) =>{
    const {name, email, password} = req.body;

    user.push({
        name, 
        email,
        password,
    });
    res.status(201).redirect('/');
});



app.get('/products', (req, res)=>{
    res.json([
        "Apple",
        "Redmi",
        "One Plus One"
    ])
})

app.get('/orders', (req, res)=>{
    res.json([
        {
            id:1,
            paid: false,
            user_id: 1
        },
        {
            id:2,
            paid: false,
            user_id: 1
        },
    ])
})

const p = 5552;
app.listen(p, () => console.log(`Example app listening on port ${p}!`));

