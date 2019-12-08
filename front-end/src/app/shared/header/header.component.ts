import { NzDrawerService } from 'ng-zorro-antd';
import { Component } from '@angular/core';
import { Package } from '../models/package';
import { PaymentFormComponent } from 'src/app/payment/payment-form/payment-form.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent {
	quickPay: Package;

	constructor(private _drawerService: NzDrawerService) {}

	initializeQuickPayPackage() {
		this.quickPay = {} as Package;
		this.quickPay.id = 'daaZTCUw4FBOFT0k29ir';
		this.quickPay.name = 'Quick Pay';
		this.quickPay.stream = 'QUICK_PAY';
	}

	showPaymentForm() {
		this.initializeQuickPayPackage();

		this._drawerService.create<PaymentFormComponent, { selectedPackage: any }, string>({
			nzTitle: 'Quick-Pay Payment Form',
			nzContent: PaymentFormComponent,
			nzContentParams: {
				selectedPackage: { data: this.quickPay, id: this.quickPay.id }
			},
			nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
			nzWidth: 720,
			nzMaskClosable: false
		});
	}
}
