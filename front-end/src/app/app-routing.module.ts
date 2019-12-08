import { PaymentStatusComponent } from './payment/payment-status/payment-status.component';
import { PackagesComponent } from './packages/packages.component';
import { FaqComponent } from './faq/faq.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CoursesComponent } from './courses/courses.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/home'
	},
	{
		path: 'home',
		component: HomeComponent,
		data: { title: 'Altus Knowledge: Give your child the tools to succeed!' }
	},
	{
		path: 'about-us',
		component: AboutUsComponent,
		data: { title: 'About Us: Altus Knowledge' }
	},
	{
		path: 'courses',
		component: CoursesComponent,
		data: { title: 'Programs & Courses: Altus Knowledge' }
	},
	{
		path: 'packages/:stream',
		component: PackagesComponent,
		data: { title: 'Packages: Altus Knowledge' }
	},
	{
		path: 'faq',
		component: FaqComponent,
		data: { title: 'FAQ: Altus Knowledge' }
	},
	{
		path: 'testimonials',
		component: TestimonialsComponent,
		data: { title: 'Testimonials: Altus Knowledge' }
	},
	{
		path: 'contact',
		component: ContactUsComponent,
		data: { title: 'Contact Us: Altus Knowledge' }
	},
	{
		path: 'payment',
		component: PaymentStatusComponent,
		data: { title: 'Payment Status: Altus Knowledge' }
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
