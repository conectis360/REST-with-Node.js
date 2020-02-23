//imports
const express = require('express');
const morgan = require('morgan');
const borderParser = require('body-parser');
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const moongose = require('mongoose');

moongose.connect(
    'mongodb+srv://conectis:'
     + process.env.MONGO_PW
     + '@node-rest-shop-zctip.mongodb.net/test?retryWrites=true&w=majority',
)

//declaração de extensões
const app = express();
app.use(morgan('dev'));
app.use(borderParser.urlencoded({ extended: false }));
app.use(borderParser.json());

//headers ficam acima das rotas, pois essas já lidam com os requests.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') { //browser sempre envia OPTIONS primeiro durante os POST e PUT requests
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})


//qualquer request tem que passar pelo metodo .use, ele é um
//middleware
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
//qualquer coisa apartir da URL /products será redirecionado
//para a variavel productRoutes -> arquivo products.js.

//caso chegue nesta linha, significa que falhou as outras duas, ou seja, aqui trataremos os erros
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

//exporta
module.exports = app;