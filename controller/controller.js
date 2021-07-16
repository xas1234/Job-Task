const axios = require("axios");
const Transaction = require("../model/Transaction");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// POST TRANSACTION
exports.Transaction = async (req, res) => {
  let { date, amount, currency, client_id } = req.body;

  try {
    const { data } = await axios.get(
      "https://api.exchangerate.host/2021-01-01"
    );

    let amountEuro;
    let allRates = data.rates;

    for (const [key, value] of Object.entries(allRates)) {
      if (key === currency) {
        amountEuro = amount / value; // amount in euros
      }
    }
    currency = "EUR";

    amount = Math.round(amountEuro * 0.005, 2);

    //Rule 1
    if (amount < 0.05) {
      amount = 0.05;
    }
    // Rule 2
    if (client_id === 42) {
      amount = 0.05;
    }
    // Rule 3
    // inicijuojamas gavimas visu records is db pagal objekto id
    /* Transaction.findAll({
      where: {
        client_id: {
          [Op.eq]: client_id,
        },
      },
    }).then((transaction) => console.log(transaction));
*/ // sekantis zingsnis pabaigimui butu sudeti amounts ir jei virsyja 1000 - priskirti 0.03 mokesti.

    const transaction = new Transaction(date, amount, currency, client_id);
    Transaction.create({
      date,
      amount,
      currency,
      client_id,
    });
    let sendObj = {
      amount,
      currency,
    };
    res.send(sendObj);
  } catch (err) {
    console.log(err);
  }
};
