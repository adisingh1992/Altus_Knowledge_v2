import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-carousel-card',
	templateUrl: './carousel-card.component.html',
	styleUrls: [ './carousel-card.component.css' ]
})
export class CarouselCardComponent implements OnInit {
	@Input('data') data: any;

	constructor() {}

	ngOnInit() {}
}
