import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-payment-status',
	templateUrl: './payment-status.component.html',
	styleUrls: [ './payment-status.component.css' ]
})
export class PaymentStatusComponent implements OnInit {
	status: string;
	txnid: string;

	constructor(private _route: ActivatedRoute) {}

	ngOnInit() {
		this._route.queryParams.subscribe((params) => {
			this.status = params['status'];
			this.txnid = params['txnid'];
		});
	}
}
