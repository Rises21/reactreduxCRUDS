
require('./config/mongoose'); //use mongoose
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const logger = require('morgan');
const cors = require('cors');
//const productRouterV4 = require('./app/product_v4/routes');
const productRouterV3 = require('./app/product_v3/routes');
const corsOptions = 'http://localhost:3002';

app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/public', express.static(path.join(__dirname, '../public/uploads')));
//app.use('/api/v4', productRouterV4);
app.use('/api/v3', productRouterV3);

app.use((req, res) => {
	res.send({
		status: 'failed',
		message: 'resource ' + req.originalUrl + ' not found'
	});
});

app.listen(port, () => console.log(`Server running at PORT : ${port}`));



