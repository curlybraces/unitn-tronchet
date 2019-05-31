const path = require('path');
const compression = require('compression')
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;
const DIST_FOLDER = path.join(__dirname, 'vuejs');

const redirect = require('./utilities/redirect');

app.use(compression());
if (process.env.NODE_ENV === 'production') {
    app.use(redirect);
}

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan('dev'));

app.use(history());
app.use(express.static(DIST_FOLDER));

app.listen(PORT, () => {
    console.log('PORT ', PORT);
    console.log('SERVER LISTENING');
});