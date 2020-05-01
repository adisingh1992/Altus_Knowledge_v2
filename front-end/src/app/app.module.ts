import { NgProgressModule } from '@ngx-progressbar/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NzNotificationModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { CoursesComponent } from './courses/courses.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { CommentComponent } from './testimonials/comment/comment.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FeatureCardComponent } from './home/feature-card/feature-card.component';
import { CarouselCardComponent } from './home/carousel-card/carousel-card.component';
import { LoaderInterceptor } from './interceptors/loader-interceptor';
import { PackagesComponent } from './packages/packages.component';
import { PaymentFormComponent } from './payment/payment-form/payment-form.component';
import { PaymentStatusComponent } from './payment/payment-status/payment-status.component';
import { ContactDetailsComponent } from './contact-us/contact-details/contact-details.component';

registerLocaleData(en);

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AboutUsComponent,
		FaqComponent,
		CoursesComponent,
		TestimonialsComponent,
		CommentComponent,
		ContactUsComponent,
		HeaderComponent,
		FooterComponent,
		FeatureCardComponent,
		CarouselCardComponent,
		PackagesComponent,
		PaymentFormComponent,
		PaymentStatusComponent,
		ContactDetailsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgZorroAntdModule,
		NzNotificationModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		NgProgressModule
	],
	providers: [
		{ provide: NZ_I18N, useValue: en_US },
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
	],
	entryComponents: [ PaymentFormComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
