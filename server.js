const express = require('express');
const nodemailer = require('nodemailer');
// const { pass } = require('./mailKeys.js');
var cors = require('cors');
const PORT = process.env.PORT || 3001;
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
// const transporter = nodemailer.createTransport({
// 	host: 'smtp.zoho.com',
// 	port: 465,
// 	secure: true, //ssl
// 	auth: {
// 		user: 'admin@abdallaahmed.co',
// 		pass: pass,
// 	},
// });

app.use(cors());
app.use(bodyParser.json());
// app.post('/send', (req, res) => {
// 	console.log('send', req.body);
// 	var MAILBODY =
// 		'[email]:\n' +
// 		`${req.body.data.email}` +
// 		'\n[suject]:\n' +
// 		`abdallaahmed enquiry from ${req.body.data.name}` +
// 		'\n\n[msg]:\n' +
// 		req.body.data.phone;

// 	var mailOptions = {
// 		from: 'admin@abdallaahmed.co',
// 		to: 'abdalla.ahmed.ksa@gmail.com',
// 		subject: `abdallaahmed enquiry from ${req.body.data.name}`,
// 		text: MAILBODY,
// 	};

// 	transporter.sendMail(mailOptions, (err, info) => {
// 		if (err) {
// 			console.log(err);
// 			return res.status(500).send('faild');
// 		}
// 		console.log(info);
// 		return res.send(info.response).status(200);
// 	});
// });
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
	const url = req.url;

	if (url.indexOf('.map') !== -1) {
		console.log({ url });
		return res.sendFile(path.join(__dirname, 'build', `index.html`));
	}
	if (url === '/') {
		console.log({ url });
		return res.sendFile(path.join(__dirname, 'build', `index.html`));
	} else {
		console.log({ url });
		return res.sendFile(path.join(__dirname, 'build', `${url}.html`));
	}
});

app.listen(PORT, () => console.log(`listening on: ${PORT}`));
