import express from 'express';
import path from 'path';

let app = express();

app.get('/*', (req, res) => {
	//	res.send('hello world')

	/*send file*/
	res.sendFile(path.join(__dirname, './../index.html'));
});

app.listen(3000, () => console.log('Running server localhost3000'))