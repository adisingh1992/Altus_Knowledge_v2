import * as functions from 'firebase-functions';
import { Transaction } from './models/transactions';
import { PayURequest } from './models/payu.request';
import { PaymentRequest } from './models/payment-request';
import { PayUResponse } from './models/payu-response';
const sha512 = require('js-sha512').sha512;

class Helper {
	private key: string = functions.config().payu.key;
	private salt: string = functions.config().payu.salt;
	private paymentProcessURL: string = `${functions.config().site.rooturl}/api/v1/packages/payment-process`;

	// Test Credentials

	// private key: string = 'gtKFFx';
	// private salt: string = 'eCwWELxi';
	// private paymentProcessURL: string = `https://altusknowledge.firebaseapp.com/api/v1/packages/payment-process`;

	// Test Credentials

	getPayURequestObject(paymentRequest: PaymentRequest, selectedPackage: any): PayURequest {
		const payURequest: PayURequest = {} as PayURequest;

		payURequest.productinfo = selectedPackage.name;
		payURequest.firstname = paymentRequest.firstName;
		payURequest.lastname = paymentRequest.lastName;
		payURequest.email = paymentRequest.email;
		payURequest.phone = paymentRequest.contact;
		payURequest.txnid = Date.now().toString(36);
		payURequest.key = this.key;
		payURequest.surl = this.paymentProcessURL;
		payURequest.furl = this.paymentProcessURL;
		payURequest.curl = this.paymentProcessURL;
		payURequest.status = 'pending';
		payURequest.amount = selectedPackage.stream === 'QUICK_PAY' ? paymentRequest.amount : selectedPackage.price;

		// This needs to be at last so that all the properties can be initialized
		payURequest.hash = this.generateHash(payURequest);

		return payURequest;
	}

	private generateHash(payURequest: PayURequest): string {
		// sha512(key|txnid|amount|productinfo|firstname|email|||||||||||SALT)
		const hash: string = `${payURequest.key}|${payURequest.txnid}|${payURequest.amount}|${payURequest.productinfo}|${payURequest.firstname}|${payURequest.email}|||||||||||${this
			.salt}`;

		return sha512(hash);
	}

	validatePaymentRequest(paymentRequest: PaymentRequest): string {
		return paymentRequest.firstName && paymentRequest.email && paymentRequest.contact && paymentRequest.packageId;
	}

	validatePayUResponseAuthenticity(payUResponse: PayUResponse, transaction: Transaction): boolean {
		// sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
		const reverseHashString: string = `${this
			.salt}|${payUResponse.status}|||||||||||${transaction.email}|${transaction.firstname}|${transaction.productinfo}|${transaction.amount}.00|${transaction.txnid}|${this
			.key}`;

		const reverseHash: string = sha512(reverseHashString);

		return payUResponse.hash === reverseHash;
	}

	updateTransaction(payUResponse: PayUResponse, transaction: Transaction): Transaction {
		transaction.mihpayid = payUResponse.mihpayid;
		transaction.mode = payUResponse.mode;
		transaction.status = payUResponse.status;
		transaction.cardCategory = payUResponse.cardCategory || '';
		transaction.net_amount_debit = payUResponse.net_amount_debit;
		transaction.addedon = payUResponse.addedon;
		transaction.error_Message = payUResponse.error_Message || '';
		transaction.name_on_card = payUResponse.name_on_card || '';
		transaction.cardnum = payUResponse.cardnum || '';
		transaction.issuing_bank = payUResponse.issuing_bank || '';
		transaction.card_type = payUResponse.card_type || '';

		return transaction;
	}

	getRedirectScript(status: string, txnid: string): string {
		return `<script>window.location.replace("${functions.config().site
			.rooturl}/payment?status=${status}&txnid=${txnid}");</script>`;
	}
}

export default new Helper();
