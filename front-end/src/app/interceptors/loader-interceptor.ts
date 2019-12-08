import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	private requests: HttpRequest<any>[] = [];

	constructor(private _ngProgress: NgProgress) {}

	removeRequest(req: HttpRequest<any>) {
		const index = this.requests.indexOf(req);
		if (index >= 0) this.requests.splice(index, 1);

		if (this.requests.length === 0) this._ngProgress.complete();
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (!req.headers.has('Content-Type')) {
			req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
		}

		req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

		this.requests.push(req);

		this._ngProgress.start();

		return Observable.create((observer) => {
			const subscription = next.handle(req).subscribe(
				(event) => {
					if (event instanceof HttpResponse) {
						this.removeRequest(req);
						observer.next(event);
					}
				},
				(err) => {
					this.removeRequest(req);
					observer.error(err);
				},
				() => {
					this.removeRequest(req);
					observer.complete();
				}
			);

			// remove request from queue when cancelled
			return () => {
				this.removeRequest(req);
				subscription.unsubscribe();
			};
		});
	}
}
