/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const titlesRouter = require('./routes/titles');
const restrictTitlesRouter = require('./routes/restrict-titles');
const actorsRouter = require('./routes/actors');
const adminRouter = require('./routes/admin');
const errorCatch = require('./middlewares/errorMiddlewares');
const swaggerUi = require('swagger-ui-express');
const swaggerStats = require('swagger-stats');   
const swaggerJson = require('./swagger.json');
const swaggerOptions = require('./swaggerOptions.js');
const swaggerConfig = require('./swaggerConfig');
const path = require('path'); 
const rfs = require('rotating-file-stream');
const app = express();


// create a rotating write stream
const accessLogStream = rfs.createStream('access.log',
 {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log'),
  compress: "gzip"
  }
);

// base middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("combined",{ stream: accessLogStream }));
app.use(express.static("public"));

// swagger stats middlewares
app.use(swaggerStats.getMiddleware(swaggerConfig));

//api routes
app.use('/titles', titlesRouter);
// app.use('/restrict-titles/:collection', restrictTitlesRouter); not in use
app.use('/actors', actorsRouter);

//user admin panel routes
// eslint-disable-next-line no-undef
app.set('views', __dirname + '/admin.views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use('/admin', adminRouter);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerJson, swaggerOptions));
// app.get('/', (req, res)=> {res.json('hello Api')} )



app.use('', errorCatch.errorCatch);
app.listen('4000', () => console.log('Connected to port 4000'));