import { PaymentRequest } from './../shared/models/payment-request';
import { ContactRequest } from '../shared/models/contact-request';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MainService {
	private rootUrl: string = environment.rootUrl;

	constructor(private _http: HttpClient) {}

	fetchAllContactDetails() {
		const endPoint: string = `${this.rootUrl}/contact-us`;
		return this._http.get(endPoint);
	}

	saveContactRequest(contactRequest: ContactRequest) {
		const endPoint: string = `${this.rootUrl}/contact-us`;
		return this._http.post(endPoint, JSON.stringify(contactRequest));
	}

	deleteContact(id: string) {
		const endPoint: string = `${this.rootUrl}/contact-us/${id}`;
		return this._http.delete(endPoint);
	}

	fetchAllPackages(stream: string) {
		const endPoint: string = `${this.rootUrl}/packages/${stream}`;
		return this._http.get(endPoint);
	}

	initiatePaymentRequest(paymentRequest: PaymentRequest) {
		const endPoint: string = `${this.rootUrl}/packages/initiate-payment/`;
		return this._http.post(endPoint, JSON.stringify(paymentRequest));
	}
}
