import express from 'express';
import path from 'path';
import bodyParser from 'body-parser'; // you'll get data from request.body

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js';

import users from './routes/users';

let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
	hot: true,
	publicPath: webpackConfig.output.publicPath,
	noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
	//	res.send('hello world')

	/*send file*/
	res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => console.log('Running server localhost3000'))