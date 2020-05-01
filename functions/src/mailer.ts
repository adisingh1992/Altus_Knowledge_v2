import * as nodemailer from 'nodemailer';

export class Mailer {
	private _transporter: nodemailer.Transporter;

	constructor() {
		this._transporter = nodemailer.createTransport({
			service: 'Yandex',
			auth: {
				user: 'adi.singh1992@yandex.com',
				pass: 'alec177fig600'
			}
		});
	}

	sendMail(to: string, subject: string, content: string) {
		const options = {
			from: '"Aditya Singh" <adi.singh1992@yandex.com>',
			to: to,
			subject: subject,
			text: content
		};

		this._transporter.sendMail(options, (error, info) => {
			if (error) {
				console.log(`error: ${error}`);
				return;
			}
			console.log(`Message Sent ${info.response}`);
		});
	}
}
