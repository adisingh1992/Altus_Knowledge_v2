import { CarouselData } from './carousel-card/carousel.data';
import { Features } from './feature-card/features';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	carouselData: Array<Object> = CarouselData;
	features: Array<Object> = Features;

	constructor() {}

	ngOnInit() {}
}
