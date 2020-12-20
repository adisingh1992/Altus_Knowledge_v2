import { AdmissionPopupComponent } from './../shared/admission-popup/admission-popup.component';
import { CarouselData } from './carousel-card/carousel.data';
import { Features } from './feature-card/features';
import { AfterViewInit, Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements AfterViewInit {
	carouselData: Array<Object> = CarouselData;
	features: Array<Object> = Features;

	constructor(private _modalService: NzModalService) {}

	ngAfterViewInit(): void {
		this._modalService.create({
			nzWrapClassName: 'vertical-center-modal',
			nzClassName: 'modal-class',
			nzContent: AdmissionPopupComponent,
			// nzClosable: false,
			nzFooter: null
		});
	}
}
