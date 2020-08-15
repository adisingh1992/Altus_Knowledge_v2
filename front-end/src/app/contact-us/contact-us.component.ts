import { environment } from 'src/environments/environment';
import { ContactRequest } from '../shared/models/contact-request';
import { MainService } from './../services/main.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';

declare let Email: any;

@Component({
	selector: 'app-contact-us',
	templateUrl: './contact-us.component.html',
	styleUrls: [ './contact-us.component.css' ]
})
export class ContactUsComponent implements OnInit {
	contactForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private _notificationsService: NzNotificationService,
		private _service: MainService
	) {}

	ngOnInit() {
		this.contactForm = this.fb.group({
			name: new FormControl('', [ Validators.required ]),
			email: new FormControl(
				'',
				Validators.compose([
					Validators.required,
					Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
				])
			),
			contact: new FormControl('', [ Validators.required ]),
			message: new FormControl('', [ Validators.required ])
		});
	}

	submitForm(value: ContactRequest): void {
		for (const key in this.contactForm.controls) {
			this.contactForm.controls[key].markAsDirty();
			this.contactForm.controls[key].updateValueAndValidity();
		}

		this._service.saveContactRequest(value).subscribe(() => {
			this._notificationsService.success('Contact Request', 'Contact form submitted successfully!');
			this.sendEmail(value);
		});
	}

	resetForm(e: MouseEvent): void {
		e.preventDefault();
		this.contactForm.reset();

		for (const key in this.contactForm.controls) {
			this.contactForm.controls[key].markAsPristine();
			this.contactForm.controls[key].updateValueAndValidity();
		}
	}

	sendEmail(contactForm: ContactRequest) {
		Email.send({
			Host: environment.elasticSMTP,
			Username: environment.elasticEmail,
			Password: environment.elasticPassword,
			To: 'altusknowledge@gmail.com',

			From: `altusknowledge@gmail.com`,
			Subject: `Contact Request`,
			Body: `
			<h2>Altus Knowledge: Request/Enquiry</h2>
			<br/><br/>
			<strong>Name: </strong>${contactForm.name || 'N/A'}
			<br/><br/>
			<strong>E-mail: </strong>${contactForm.email || 'N/A'}
			<br/><br/>
			<strong>Contact Number: </strong>${contactForm.contact || 'N/A'}
			<br/><br/>
			<strong>Message: </strong>
			<p>${contactForm.message || 'N/A'}</p>
			`
		});
	}
}
