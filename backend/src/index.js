const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const users = require('./routes/users.routes');

const app = express();

//MIDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
app.use('/users', users);

app.use((req, res, next) => { 
    res.status(404).send({ message: "Page not found" });
});

app.listen(3000);
console.log('Server listening...');