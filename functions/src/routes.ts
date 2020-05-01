import MainController from './controller';

export = (express: any) => {
	const router = express.Router();

	router.get('/contact-us', MainController.getAllContactRequests);

	router.post('/contact-us', MainController.saveContactRequest);

	router.delete('/contact-us/:id', MainController.deleteContact);

	router.get('/packages/:stream', MainController.getAllPackages);

	router.post('/packages/initiate-payment/', MainController.processPaymentRequest);

	router.post('/packages/payment-process', MainController.processPaymentResponse);

	return router;
};
