import { AnalyticsService } from './services/analytics.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	constructor(private _titleService: Title, private _router: Router, private _analyticsService: AnalyticsService) {}

	ngOnInit() {
		this._analyticsService.init();

		this._router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const title = this.getTitle(this._router.routerState, this._router.routerState.root).join('-');
				this._titleService.setTitle(title);
			}
		});
	}

	getTitle(state, parent) {
		const data = [];
		if (parent && parent.snapshot.data && parent.snapshot.data.title) {
			data.push(parent.snapshot.data.title);
		}

		if (state && parent) {
			data.push(...this.getTitle(state, state.firstChild(parent)));
		}
		return data;
	}
}
