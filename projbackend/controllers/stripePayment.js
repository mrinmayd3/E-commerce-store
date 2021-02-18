const stripe = require('stripe')(process.env.KEY);
const uuid = require('uuid/v4');

exports.makePayment = (req, res) => {
	const { products, token } = req.body;
	console.log('Products: ', products);

	let total = 0;
	products.map(p => {
		total += p.price;
	})

	const idempotencyKey = uuid();

	return stripe.customers.create({
		email: token.email,
		source: token.id
	}).then(customer => {
		stripe.charges.create({
			amount: total * 100,
			currency: 'usd',
			customer: customer.id,
			receipt_email: token.email,
			description: 'a test account',

			shipping: {
				name: token.card.name,
				address: {
							line1: token.card.address_line1,
							line2: token.card.address_line2,
							city: token.card.address_city,
							postal_code: token.card.address_zip,
							country: token.card.address_country
						}
			}
		}, { idempotencyKey })
			.then(result => res.status(200).json(result))
			.catch(err => console.log(err))
	})
}