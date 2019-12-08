import { environment } from './../../../environments/environment';
import { NzNotificationService } from 'ng-zorro-antd';
import { PayURequest } from './../../shared/models/payu-request';
import { PaymentRequest } from './../../shared/models/payment-request';
import { Component, Input, ViewChild } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
	selector: 'app-payment-form',
	templateUrl: './payment-form.component.html',
	styleUrls: [ './payment-form.component.css' ]
})
export class PaymentFormComponent {
	@ViewChild('payUForm', { static: true })
	payUForm: any;
	@Input('selectedPackage') selectedPackage: any;

	payUBizURL: string = environment.payUBizURL;
	paymentRequest: PaymentRequest = new PaymentRequest();
	payURequest: PayURequest = new PayURequest();

	constructor(private _service: MainService, private _notificationsService: NzNotificationService) {}

	initiatePayment() {
		this.paymentRequest.amount = this.selectedPackage.data.price;
		this.paymentRequest.packageId = this.selectedPackage.id;

		this._service.initiatePaymentRequest(this.paymentRequest).subscribe(
			(payURequest: PayURequest) => {
				this.payURequest = payURequest;
				setTimeout(() => this.payUForm.nativeElement.submit(), 1000);
			},
			(response) => {
				this._notificationsService.error('Payment', response.error.message);
			}
		);
	}
}
