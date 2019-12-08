import { MainService } from './../services/main.service';
import { Component, OnInit } from '@angular/core';
import { Package } from '../shared/models/package';
import { Response } from '../shared/models/response';
import { ActivatedRoute } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd';
import { PaymentFormComponent } from '../payment/payment-form/payment-form.component';

@Component({
	selector: 'app-packages',
	templateUrl: './packages.component.html',
	styleUrls: [ './packages.component.css' ]
})
export class PackagesComponent implements OnInit {
	packages: Response<Package>[];
	loading: boolean = true;

	constructor(
		private _service: MainService,
		private _activatesRoute: ActivatedRoute,
		private _drawerService: NzDrawerService
	) {}

	ngOnInit() {
		this._activatesRoute.params.subscribe((params) => {
			const stream: string = params['stream'];
			this.getAllPackages(stream);
		});
	}

	getAllPackages(stream: string) {
		this.loading = true;
		this._service.fetchAllPackages(stream).subscribe((packages: Response<Package>[]) => {
			this.packages = packages;
			this.loading = false;
		});
	}

	showPaymentForm(selectedPackage: Package) {
		this._drawerService.create<PaymentFormComponent, { selectedPackage: Package }, string>({
			nzTitle: 'Payment Form',
			nzContent: PaymentFormComponent,
			nzContentParams: {
				selectedPackage: selectedPackage
			},
			nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
			nzWidth: 720,
			nzMaskClosable: false
		});
	}
}
