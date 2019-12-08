export interface PayUResponse {
	mihpayid: string;
	mode: string;
	status: string;
	cardCategory: string;
	net_amount_debit: string;
	addedon: string;
	error_Message: string;
	name_on_card: string;
	cardnum: string;
	issuing_bank: string;
	card_type: string;
	txnid: string;
	hash: string;
}
