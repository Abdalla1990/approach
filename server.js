const express = require('express');
const nodemailer = require('nodemailer');
const { pass } = require('./mailkeys');
var cors = require('cors');
const PORT = process.env.PORT || 3001;
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const transporter = nodemailer.createTransport({
	host: 'smtp.zoho.com',
	port: 465,
	secure: true, //ssl
	auth: {
		user: 'admin@abdallaahmed.co',
		pass: pass,
	},
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/send-email', (req, res) => {
	console.log('send', req.body);
	var MAILBODY =
		'[email]:\n' +
		`${req.body.email}` +
		'\n[suject]:\n' +
		`enquiry from ${req.body.name}` +
		'\n\n[phone]:\n' +
		req.body.phone +
		'\n\n[,essage]:\n' +
		req.body.message;

	var mailOptions = {
		from: 'admin@abdallaahmed.co',
		to: 'abdalla.ahmed.ksa@gmail.com',
		subject: `abdallaahmed enquiry from ${req.body.name}`,
		text: MAILBODY,
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
			return res.status(500).send('faild');
		}
		console.log(info);
		return res.redirect('/contact-received');
	});
});
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
