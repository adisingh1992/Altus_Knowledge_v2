export interface Transaction {
    id: string;
    key: string;
    txnid: string;
    amount: number;
    productinfo: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    surl: string;
    furl: string;
    curl: string;
    hash: string;
    status: string;
    mihpayid: string;
	mode: string;
	cardCategory: string;
	net_amount_debit: string;
	addedon: string;
	error_Message: string;
	name_on_card: string;
	cardnum: string;
	issuing_bank: string;
	card_type: string;
}