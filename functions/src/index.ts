import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as firebase from 'firebase-admin';

const serviceAccount = require('../altusknowledge-private-key.json');

firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount)
});

const app = express();
const main = express();
const cors = require('cors');

app.use(cors());

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/api/v1', app);

const routes = require('./routes')(express);
app.use('/', routes);

export const webApi = functions.https.onRequest(main);
