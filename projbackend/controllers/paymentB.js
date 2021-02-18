var braintree = require("braintree");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: 'jn2ytv2mtynbx2y7',
    publicKey: '2dnv9q25b67n2sbt',
    privateKey: '425eda4aae05a5a6545ae98f4f94d24d'
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
}

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        // deviceData: deviceDataFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
}