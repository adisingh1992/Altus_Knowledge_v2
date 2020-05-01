import { Mailer } from './mailer';
import { Transaction } from './models/transactions';
import { PayUResponse } from './models/payu-response';
import { PayURequest } from './models/payu.request';
import { PaymentRequest } from './models/payment-request';
import * as firebase from 'firebase-admin';
import Helper from './helper';

const db = firebase.firestore();

class MainController {
	async getAllContactRequests(req: any, res: any) {
		try {
			const contactRequestsSnapshot = await db.collection('contactUs').get();

			const contactRequests: Object[] = [];

			contactRequestsSnapshot.forEach((doc: any) => {
				contactRequests.push({
					id: doc.id,
					data: doc.data()
				});
			});

			res.json(contactRequests);
		} catch (exception) {
			res.status(500).send(exception.message);
		}
	}

	async deleteContact(req: any, res: any) {
		try {
			const id: string = req.params.id;

			await db.collection('contactUs').doc(id).delete();

			res.json({
				id: id,
				message: 'Deleted Successfully!'
			});
		} catch (exception) {
			res.status(500).send(exception.message);
		}
	}

	async saveContactRequest(req: any, res: any) {
		try {
			const { name, email, contact, message } = req.body;
			const contactData = { name, email, contact, message, archived: true, timestamp: new Date().toISOString() };

			const contactRef = await db.collection('contactUs').add(contactData);
			const response = await contactRef.get();

			const mailer = new Mailer();
			mailer.sendMail(email, `${name} (${contact})`, message);

			res.json({
				id: contactRef.id,
				data: response.data()
			});
		} catch (exception) {
			res.status(500).send(exception.message);
		}
	}

	async getAllPackages(req: any, res: any) {
		try {
			let stream: string = req.params.stream;

			if (!stream) stream = 'IIT';

			stream = stream.toUpperCase();

			const packagesRef = db.collection('packages');
			const packagesSnapshot = await packagesRef.where('stream', '==', stream).get();

			const packages: Object[] = [];

			packagesSnapshot.forEach((doc: any) => {
				packages.push({
					id: doc.id,
					data: doc.data()
				});
			});

			res.json(packages);
		} catch (exception) {
			res.status(500).send(exception.message);
		}
	}

	async processPaymentRequest(req: any, res: any) {
		try {
			const paymentRequest: PaymentRequest = req.body;

			if (!Helper.validatePaymentRequest(paymentRequest)) {
				res.status(400).send({ message: 'Invalid Request Parameters' });
				return;
			}

			const selectedPackageRef = await db.collection('packages').doc(paymentRequest.packageId).get();
			const selectedPackage = selectedPackageRef.data();

			if (!selectedPackage) {
				res.status(400).send({ message: 'Invalid Package Chosen' });
				return;
			}

			const payURequest: PayURequest = Helper.getPayURequestObject(paymentRequest, selectedPackage);

			if (payURequest.productinfo === 'Quick Pay' && !payURequest.amount) {
				res.status(400).send({ message: 'Invalid Amount Entered' });
				return;
			}

			await db.collection('transactions').add(payURequest);

			res.json(payURequest);
		} catch (exception) {
			res.status(500).send(exception.message);
		}
	}

	async processPaymentResponse(req: any, res: any) {
		try {
			const payUResponse: PayUResponse = req.body;
			let transaction: Transaction = {} as Transaction;
			let transactionId: string = '';

			const transactionSnapshot = await db
				.collection('transactions')
				.where('txnid', '==', payUResponse.txnid)
				.limit(1)
				.get();

			transactionSnapshot.forEach((transactionDoc: any) => {
				transaction = transactionDoc.data();
				transactionId = transactionDoc.id;
			});

			const isAuthentic: boolean = Helper.validatePayUResponseAuthenticity(payUResponse, transaction);

			transaction = Helper.updateTransaction(payUResponse, transaction);
			await db.collection('transactions').doc(transactionId).update(transaction);

			if (!isAuthentic || payUResponse.status !== 'success') {
				// Redirecting to failed transaction page.
				res.send(Helper.getRedirectScript(payUResponse.status, payUResponse.txnid));
				return;
			}

			// Redirecting to successful transaction page.
			res.send(Helper.getRedirectScript(payUResponse.status, payUResponse.txnid));
		} catch (exception) {
			res.status(500).send(exception.message);
		}
	}
}

export default new MainController();
