import { NzNotificationService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
	selector: 'app-contact-details',
	templateUrl: './contact-details.component.html',
	styleUrls: [ './contact-details.component.css' ]
})
export class ContactDetailsComponent implements OnInit {
	details: any[];

	constructor(private _service: MainService, private _notificationsService: NzNotificationService) {}

	ngOnInit() {
		this.getAllContactDetails();
	}

	getAllContactDetails() {
		this._service.fetchAllContactDetails().subscribe((res: any) => {
			this.details = res;
		});
	}

	delete(id: string) {
		this._service.deleteContact(id).subscribe((res: any) => {
			this._notificationsService.success('Contact', res.message);
			this.ngOnInit();
		});
	}
}
