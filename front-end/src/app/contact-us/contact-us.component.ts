import { ContactRequest } from '../shared/models/contact-request';
import { MainService } from './../services/main.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';

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
}
