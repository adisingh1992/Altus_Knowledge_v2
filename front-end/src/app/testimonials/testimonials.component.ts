import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-testimonials',
	templateUrl: './testimonials.component.html',
	styleUrls: [ './testimonials.component.css' ]
})
export class TestimonialsComponent implements OnInit {
	iitStudents: Array<number> = new Array(21);
	neetStudents: Array<number> = new Array(24);

	constructor() {}

	ngOnInit() {}
}
